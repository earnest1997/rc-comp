import React, {
    forwardRef,
    createRef,
    cloneElement,
    useMemo
  } from 'react';
  import ReactDOM from 'react-dom';
  import useClickOutside from './hooks';
  import { getPos } from './util'
  
  const observer = new (class activeModalObserver {
    public actives:Record<string,Function>
    constructor() {
      this.actives = {};
    }
    closePrevModal() {
      if (Object.keys(this.actives).length) {
        Object.values(this.actives).forEach((item) => {
          item();
        });
      }
    }
    remove(id:string) {
      Reflect.deleteProperty(this.actives, id);
      return this
    }
    add(id:string, cb:Function) {
      this.actives[id] = cb;
    }
  })();
  
  const WrappedComp = forwardRef(
    ({ children,root,hide,...restProps }, ref) => {
      const pos = useMemo(() => {
        if (!root) {
          return '';
        }
        return getPos(root);
      }, [root]);
  
      useClickOutside(root, hide);
      return cloneElement(children, {
        ...restProps,
        ref,
        pos
      });
    }
  );
  // 已经存在dom中的父元素
  const getRootNode = (cls:string) => {
    let a =33
    return document.body.getElementsByClassName(cls)[0];
  };
  
//   需要额外建一个容器元素，直接ReactDOM.render(root,comp)会直接把root中原有的其他元素覆盖掉了
  const getContainerNode = (root:React.HTMLElement, cls = 'modal-wrapper') => {
    let container = root.getElementsByClassName(cls)[0];
    if (!container) {
      container = document.createElement('div');
      container.className = 'modal-wrapper';
      container.style.setProperty('position', 'relative');
      root.appendChild(container)
    }
    return container;
  };
  
  function renderCompWithinFunction(Comp, props) {
    const { cls } = props;
    const ref = createRef();
    const root = getRootNode(cls);
    const container=getContainerNode(root)
    // 只维护一个函数控制显示隐藏不然乱套了
    const render = (visible:boolean) => {
      ReactDOM.render(
        visible ? (
          <WrappedComp ref={ref} {...props} visible={visible} root={root} id={cls} hide={hide}>
            <Comp/>
          </WrappedComp>
        ) : null,
        container
      );
    };
    const hide = () => {
      render(false);
    //   已经被关闭了，移除掉hide函数
      observer.remove(cls);
    };
    const show = () => {
    //   关闭之前的
      observer.closePrevModal();
    //   渲染新的
      render(true);
      observer.add(cls, hide);
    };
    // 两种条件：1.点击控制按钮切换显示隐藏 2.点击其他的切换显示隐藏 都=同时只能存在一个
    const visible=cls in observer.actives
    if (visible) {
      hide();
    } else {
      show();
    }
    // 暴露visible给外界组件，会用得上的
    return {hide,visible};
  }
  
  export default renderCompWithinFunction;
//   相比之前的好处是？统一控制弹窗位置（根据按钮在视口中的位置），逻辑不再分散,其次是点击外面关闭的这里，不应该是判断是否在弹窗外面而应该是弹窗的容器（包括btn）外面
// 不参考antd的方案计算容器在适口中的位置是因为会有滚动流这种情况，而且计算相当复杂