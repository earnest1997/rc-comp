import {useEffect} from 'react';

export default function(dom, callback) {
    useEffect(() => {
      function handler(event) {
        if (dom && !dom.contains(event.target)) {
          callback();
        }
      }
      window.addEventListener('click', handler);

      return () => window.removeEventListener('click', handler);
    }, [callback, dom]);
  }