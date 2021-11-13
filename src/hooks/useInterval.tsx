import { useEffect, useRef } from 'react';

type UseIntervalType = (callback: () => void, delay: number) => void;

const useInterval: UseIntervalType = (callback, delay) => {
  const savedCallback = useRef<() => void >();

  // Remember the latest callback.
  useEffect(() => {
    if (callback)
      savedCallback.current = callback;
  }, [callback]);
  
  // Set up the interval.
  useEffect(() => {
    function tick() {
      if(savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;