import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [isRunning, setIsRunning] = useState(true);
  const [timer, setTimer] = useState(60);
  const [runningTime, setRunningTime] = useState(0);
  const [timerId, setTimerId] = useState(0);
  const [walkingTime, setWalkingTime] = useState(0);

  useEffect(() => {
    if(timer === 0){
      setIsRunning((prevRun) => !prevRun);
      clearInterval(timerId);
      isRunning ? setRunningTime((prevTime) => prevTime + 60) : setWalkingTime((prevTime) => prevTime + 60);
      setTimer(60);
      const intervalID = startTimer();
      setTimerId(intervalID);
    }
  }, [timer])

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTime) => prevTime - 1);
    }, 1000);
    return interval;
  }

  const handleStartWorkout = () => {
    const intervalId = startTimer();
    setTimerId(intervalId);
  }

  const pauseWorkout = () => {
    clearInterval(timerId);
  }

  const endWorkout = () => {
    const remainingIntervalTime = 60 - timer;
    if(isRunning){
      setRunningTime((prevTime) => prevTime += remainingIntervalTime);
    }
    else if(!isRunning){
      setRunningTime((prevTime) => prevTime += remainingIntervalTime);
    }
    clearInterval(timerId);
    setIsRunning(true);
    setTimer(60);
    setTimerId(0);
  }

  const handleResetTotalTimers = () => {
    setRunningTime(0);
    setWalkingTime(0);
  }

  return (
    <>
      <div className='text-white'>
        <h1>Running Intervals</h1>
        <h2 className='text-indigo-500 font-semibold drop-shadow-sm'>
          {isRunning ? "Running" : "Walking"}
        </h2>
        <div className="text-slate-100 text-8xl">
          {timer}
        </div> 
        <h3>seconds</h3>
        <span className="isolate inline-flex shadow-sm">
            <button
              type="button"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5  m-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={() => handleStartWorkout()}
            >
              Start
            </button>
            <button
              type="button"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5  m-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={() => pauseWorkout()}  
            >
              Pause
            </button>
          <button
              type="button"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5  m-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={() =>endWorkout()}
            >
              End
          </button>
        </span>
        <div className='text-2xl mt-6'>Total Running Time: </div>
        <div className='text-xl text-indigo-500 font-semibold drop-shadow-sm'>{runningTime}s</div>
        <div className='text-2xl'>Total Walking Time: </div>
        <div className='text-xl text-indigo-500 font-semibold drop-shadow-sm mb-6'>{walkingTime}s</div>
        <button
          type="button"
          className="rounded-md bg-indigo-500 px-3.5 py-2.5  m-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={() => handleResetTotalTimers()}
        >
          Reset Total Timers
        </button>
      </div>
    </>
  )
}

export default App
