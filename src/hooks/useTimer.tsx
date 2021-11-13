import { useCallback, useState } from 'react';
import useInterval from './useInterval';

interface UseTimerProps { 
  callback: () => void,
  interval: number,
};

interface UseTimerDataReturned {
  time: number, 
  resetTimer: () => void, 
  setStateTimer: (v: boolean) => void, 
  stateTimer: boolean
};

type UseTimerType = ({ callback, interval }: UseTimerProps) => UseTimerDataReturned;

// hook Timer
const useTimer: UseTimerType = ({ callback, interval }) => {
  const [time, setTime] = useState<number>(0)
  const [stateTimer, setStateTimer] = useState<boolean>(false)

  useInterval(() => {
    if(stateTimer) {
      setTime(time + 1);
      callback();
    }
  }, interval);

  const resetTimer = useCallback(() => {
    setStateTimer(false)
    setTime(0);
  }, [])

 return { time, resetTimer, setStateTimer, stateTimer }
}

export default useTimer;
