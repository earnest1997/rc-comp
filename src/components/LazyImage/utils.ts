import { useEffect, useRef, useState } from 'react'


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