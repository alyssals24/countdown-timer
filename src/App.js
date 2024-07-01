import './App.css';
import React, {useState, useRef} from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp }) {
  const [currentTime, setCurrentTime] = useState([300]);
  const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart, } = useTimer({ expiryTimestamp, onExpire: () => console.log('timer completed') });
  const [inputVal, setInputVal] = useState('');
  const input = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    setCurrentTime([parseInt(input.current.value)]);
  }

  return (
    <div className="Timer-display">
      <h1>Countdown Timer </h1>
      <div className="Number-display">
        <span>{days}</span>:
        <span>{hours}</span>:
        <span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button onClick={() => {
          const time = new Date();
          time.setSeconds(time.getSeconds() + currentTime[0]);
          restart(time)
      }}>Restart</button>
      <form onSubmit={handleSubmit}>
        <label>
          <input name="name" value={inputVal} onChange={e => setInputVal(e.target.value)} ref={input} placeholder="Enter a new time in seconds" />
        </label>
        <button type="submit" disabled={!inputVal}>Change set time</button>
      </form>
      {currentTime.map((cTime) => (
        <p>Current set time: {cTime} seconds</p>
      ))}
      <p className="Paused-text">{isRunning ? '' : 'Paused'}</p>
    </div>
  );
}

export default function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 300);
  return (
    <div>
      <MyTimer expiryTimestamp={time} />
    </div>
  )
}
