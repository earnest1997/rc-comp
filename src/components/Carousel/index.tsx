import * as React from 'react'
import {
  defaultProps,
  propTypes,
  ICarouselProps,
  displayCountType,
  effectType,
  refType,
  displayViewType,
  itemArrType
} from './type'
import classNames from 'classnames'
import { omitInvaildProps, getCurrentHookValue, omit } from '@/utils'
import './style'

const {
  useState,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo
} = React

const prefixCls = 'component-carousel'
const imgListCls = `${prefixCls}-img-list`
const imgCls = `${imgListCls}-item`
const dotListCls = `${prefixCls}-dot-list`
const dotCls = `${dotListCls}-item`
const activeDotCls = `${dotCls}-active`
const activeImgCls = `${imgCls}-active`
const disableTransitionCls = `${imgListCls}-disabled-transtion`

let timer: number
let itemWidth: number
let isInitPos = true
let initTransformX: number
let transformX: number
let isFirstRender = true
let timeInterval = 1000
function generateItem(
  children: React.ReactNode[],
  displayCount: typeof displayCountType[number],
  effect?: typeof effectType[number]
):itemArrType{
  const indexChild = children.map((_, index) => index + 1)
  if (effect === effectType[1]) {
    return [children,indexChild]
  } else {
    const headItem = children.slice(-displayCount)
    const tailItem = children.slice(0, displayCount)
    let indexHead = headItem.map((_, index) => children.length - index)
    indexHead.reverse()
    const indexTail = tailItem.map((_, index) => index + 1)
    return [[...headItem, ...children, ...tailItem],
       [...indexHead, ...indexChild, ...indexTail]
  ]
  }
}

export const Carousel = forwardRef(
  (
    {
      autoPlay,
      afterChange,
      beforeChange,
      effect,
      height,
      className,
      style,
      children,
      width,
      displayCount,
      displayView,
      isSlideMutipleTogether,
      isShowDot
    }: ICarouselProps,
    ref: React.Ref<refType>
  ) => {
    const fadeCls = effect === 'fade' && `${prefixCls}-fade`
    const fadeImgListCls = fadeCls && `${imgListCls}-fade`
    const fadeImgCls = fadeCls && `${imgCls}-fade`
    const initActive = effect === effectType[0] ? 1 : 0
    const [active, setActive] = useState(initActive)
    const itemRef = useRef<HTMLLIElement>(null)
    const ulRef = useRef<HTMLUListElement>(null)
    let isGoNext = true
    const [_, forceUpdate] = useState<any>()
    const imgCount = React.Children.count(children)
    const itemCount = isSlideMutipleTogether
      ? imgCount / displayCount!
      : React.Children.count(children)
      let [childrenArr,indexMap] = generateItem(
        React.Children.toArray(children),
        displayCount!,
        effect
      )
    const handleChange = useCallback((index) => {
      if (typeof beforeChange === 'function') {
        beforeChange(active, index)
      }
      setActive(index)
      if (typeof afterChange === 'function') {
        afterChange(index)
      }
    }, [])
    const  handleAutoPlay = useCallback(()=> {
      const playWithArg = play.bind(null, effect)
      console.log(interval,89444)
      let a = 9999
      timer = window.setInterval(playWithArg, interval)
    },[interval])
    async function getSlideStatus() {
      // const currentTransformX= (await getCurrentHookValue(settransformX)) as number
      let maxLeft =
        displayView === displayViewType[0]
          ? (imgCount + displayCount!) * itemWidth
          : (itemCount + displayCount! + 0.5) * itemWidth
      const isEnd = !!(transformX === maxLeft + itemWidth)

      const isGoingToBeEnd = transformX >= maxLeft
      const isStart = transformX <= initTransformX
      return { isGoingToBeEnd, isStart, isEnd }
    }

    async function handleGoNext() {
      const { isGoingToBeEnd } = await getSlideStatus()
      if (!isGoingToBeEnd) {
        setActive((prev) => prev + 1)
      } else {
        setActive(initActive)
      }
    }
    async function handleGoPrev() {
      const { isStart } = await getSlideStatus()
      if (!isStart) {
        setActive((prev) => prev - 1)
      } else {
        setActive(itemCount - 1)
      }
    }
    async function play(indx?:any) {
      console.log('start')
      // alert(timeInterval)
      const currentActive = (await getCurrentHookValue(setActive)) as number
      isInitPos = false
      const isGoingToBeEnd =
        effect === effectType[1]
          ? itemCount === currentActive
          : (await getSlideStatus()).isGoingToBeEnd
      const isEnd =
        effect === effectType[1]
          ? itemCount === currentActive
          : (await getSlideStatus()).isEnd
      const isStart = !currentActive
      if (effect === effectType[1]) {
        if (isGoNext && !isGoingToBeEnd) {
          setActive((prev) => prev + 1)
        } else if (isGoingToBeEnd && isGoNext) {
          isGoNext = false
          setActive((prev) => prev - 1)
        } else if (!isStart && !isGoNext) {
          setActive((prev) => prev - 1)
        } else {
          setActive((prev) => prev + 1)
          isGoNext = true
        }
      }
      if (effect === effectType[0]) {
        if (!isGoingToBeEnd) {
          setActive((prev) => prev + 1)
          // 
        } else if (isGoingToBeEnd && !isEnd) {
          setActive((prev) => {
            
            return prev + 1
          })
            console.log(new Date().getSeconds(),333)
            timeInterval = 0
        } else if (isEnd) {
          // alert(99)
          console.log(new Date().getSeconds(),444)
          timeInterval = 1000
          setActive(() => {
            isInitPos = true
            return 1
          })
        } else {
          setActive((prev) => prev + 1)
        }
      }
    }
    useImperativeHandle(ref, () => ({
      goNext: handleGoNext,
      goPrev: handleGoPrev
    }))
    useEffect(() => {
      if (autoPlay) {
        // handleAutoPlay()
      }
      if (itemRef.current) {
        itemWidth = itemRef.current.offsetWidth
      }
      return () => {
        if (timer) {
          clearInterval(timer)
        }
      }
    }, [])
    // function
    const currentTimeInterval = useMemo(() => timeInterval, [active])
    useEffect(() => {
      if (autoPlay) {
        if(timeInterval === 0) console.log(new Date().getSeconds(), 444666,currentTimeInterval)
        timer = window.setTimeout(() => {
          if(timeInterval === 0) console.log(new Date().getSeconds(), 88877777777)
            play()
        }, timeInterval)
      }

      if (itemWidth && effect === effectType[0]) {
        if (isInitPos) {
          const mutiple =
            displayView === displayViewType[0]
              ? displayCount
              : displayCount! - 0.5
          transformX = itemWidth * mutiple!
          initTransformX = transformX
          setTimeout(() => {
            isInitPos = false
          }, 1000)
        } else {
          const currentActive = !active ? active : active - 1
          const baseLeft = !currentActive ? 0 : initTransformX
          let mutiple: number
          mutiple = (displayView === displayViewType[1] && 1) || 0
          mutiple =
            (displayView === displayViewType[0] &&
              isSlideMutipleTogether &&
              displayCount!) ||
            mutiple
          mutiple =
            (displayView === displayViewType[0] &&
              !isSlideMutipleTogether &&
              1) ||
            mutiple
          transformX = baseLeft + mutiple * itemWidth * currentActive
        }
      }
      if (isFirstRender) {
        forceUpdate(0)
        isFirstRender = false
      }
      return () => {
        clearTimeout(timer)
      }
    }, [active])
    let finalStyle = { height, width, ...style }
    finalStyle = omitInvaildProps(finalStyle)
    const activeIndex = useMemo(() => {
      if (effect === effectType[1]) {
        return active
      } else {
        return indexMap[active]
      }
    }, [active])
    // if(ulRef.current)
    // 
    // console.log(activeIndex, active, 888, indexMap[activeIndex],indexMap)
    return (
      <div
        className={classNames(prefixCls, fadeCls, className)}
        style={finalStyle}
      >
        <ul
          className={classNames(imgListCls, fadeImgListCls, {
            [disableTransitionCls]: transformX === initTransformX
          })}
          style={{ transform: `translateX(-${transformX}px)` }}
          ref={ulRef}
        >
          {childrenArr.map((child, index) => {
            return (
              <li
                className={classNames(imgCls, fadeImgCls, {
                  [activeImgCls]: active === index
                })}
                key={index}
                ref={itemRef!}
              >
                {child}
              </li>
            )
          })}
        </ul>
        {isShowDot && (
          <ul className={dotListCls}>
            {Array.from({ length: itemCount }).map((_, index) => {
              return (
                <li
                  className={classNames(dotCls, {
                    [activeDotCls]: activeIndex === index
                  })}
                  key={index}
                  onClick={handleChange}
                />
              )
            })}
          </ul>
        )}
      </div>
    )
  }
)

Carousel.defaultProps = defaultProps

Carousel.propTypes = propTypes
