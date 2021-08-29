import { useEffect, useRef, useState } from 'react'

// TODO: 直接出现在页面中部或者底部 无限滚动的情况
export const useIsVisible=(doms, handler)=>{
    const [visibleIndex, setVisivleIndex] = useState(0)
    const ob = new IntersectionObserver(entries => {
        if (entries[0].intersectionRatio > 0.0001) {
            setVisivleIndex(index => index + 1);
            setTimeout(() => {
                const prev=doms[Math.max(visibleIndex-1,0)]
                const dom = doms[visibleIndex];
                ob.unobserve(prev)
                ob.observe(dom)
            }, 0);
        }
    }, {
        threshold: 0.0001
    })
    const startObserve = () => {
        const dom = doms[visibleIndex]
        if (dom) {
            ob.observe(dom)
        }
    }
    useEffect(() => {
      startObserve()
      return ()=>{
          ob.unobserve(doms[visibleIndex])
      }
    }, [])
}