import { useEffect, useState } from 'react';
import './App.css';
import YearWeeks from './components/YearWeeks';
import { provisions } from './data';
import WeekCard from './components/WeekCard';
import { getLocalISO } from './components/ScheduleCard';
function App() {
  const DEBUG = false
  const debugDate = '2024-12-16T11:00'
  const debugStartTime = new Date()
  const [now, setNow] = useState(DEBUG ? new Date(debugDate) : debugStartTime)
  const [crtDate, setCrtDate] = useState(getLocalISO(now).split('T')[0])
  const [crtTime, setCrtTime] = useState(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`)

  let crtWeek = provisions.weeks.find(w => {
    const date = new Date(crtDate)
    return new Date(w.start) <= date && date <= new Date(w.end)
  })

  // console.log(crtDate)

  if (!crtWeek) {
    let crtWeekIdx = 1
    crtWeek = provisions.weeks.find(w => w.week === crtWeekIdx)
    provisions.weeks.forEach(w => {
      if (new Date(w.end) <= new Date(crtDate)) { crtWeekIdx = w.week; crtWeek = w; }
    })
  }

  let weekNumber = crtWeek.week


  const update = () => {
    const time = DEBUG ? new Date(new Date(debugDate).getTime() + Math.trunc(((new Date().getTime() - new Date(debugStartTime).getTime()) / 1000)) * 24 * 60 * 60 * 1000) : new Date();

    setNow(time);
    setCrtDate(getLocalISO(time).split('T')[0]);
    setCrtTime(
      `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}:${String(time.getSeconds()).padStart(2, '0')}`
    );
    // console.log('updating');
  };

  useEffect(() => {
    const intervalId = setInterval(update, 1000); // Use setInterval instead of recursive setTimeout

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="App">
      <div style={{fontWeight: 'bold', fontSize: '2em', marginBlockStart: '1.5em'}}>{crtWeek.week !== 'vacation' ? `SĂPTĂMÂNA ${weekNumber}` : 'VACANȚĂ'}</div>
      <div className="time-display">{`${crtDate} ${crtTime}`}</div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', justifyContent: 'center' }}>
        {
          <WeekCard week={crtWeek} crtDate={crtDate} crtTime={crtTime} />
        }
      </div >
      <YearWeeks weekNumber={weekNumber} />
      {
        1 || (window.innerWidth > window.innerHeight) ? provisions.weeks.map((week, idx) => <WeekCard key={`${week.week}${idx + 1}`} week={week} crtDate={crtDate} crtTime={crtTime} showWeekNr={true} showWeekInterval={true} />) : ''
      }
    </div>
  );
}

export default App;
