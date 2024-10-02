import { useEffect, useState } from 'react';
import './App.css';
import ScheduleCard from './components/ScheduleCard';
import WeeksCard from './components/WeeksCard';
import { provisions } from './data';
function App() {

  const [now, setNow] = useState(new Date()) 
  const [crtDate, setCrtDate] = useState(now.toISOString().split('T')[0])
  const [crtTime, setCrtTime] = useState(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`)

  let weekNumber = provisions.weeks.find(w => {
    const weekEndDate = new Date(w.end);
    // weekEndDate.setHours(23, 59, 59, 999);
    const date = new Date(crtDate) 
    console.log(date, weekEndDate)
    return new Date(w.start) <= date && date <= weekEndDate; })?.week
  let weekStart = provisions.weeks.find(w => w?.week == weekNumber)?.start

  // let crtDate =  //'2024-10-10'
  // let crtTime = //'19:45'

  const update = () => setTimeout(()=>{
    setNow(new Date())
    setCrtDate(now.toISOString().split('T')[0])
    setCrtTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`)
    console.log('updating')
    update()
  }, 1000)

  useEffect(()=>{
    update()
  }, [])

  return (
    <div className="App">
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <h1>{`Săptămâna ${weekNumber}`}</h1>
            <p>{`${crtDate} ${crtTime}`}</p>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', textAlign:'center', justifyContent: 'center'}}>
      {
        provisions.weekNamesRo.map((el, idx) => {
          // console.log(el, provisions.schedule[el])
          if (el in provisions.schedule)
          return <ScheduleCard key={el} dayIdx={idx} day={el} crtDate={crtDate} schedule={provisions.schedule[el]} weekNumber={weekNumber} weekStart={weekStart} crtTime={crtTime}/>
          else return ''
        })
      }
      </div >
    
      <WeeksCard weekNumber={weekNumber}/>
    
      {
        window.innerWidth > window.innerHeight ? provisions.weeks.map(week => {return week.week != 'vacation' ? <div style={{display:' flex', flexDirection:'row'}}><div style={{display: 'flex', alignItems: 'center'}}>{week.week}</div>{provisions.weekNamesRo.map((el, idx) => {
          if (el in provisions.schedule)
            return <ScheduleCard key={el} dayIdx={idx} day={el} crtDate={crtDate} schedule={provisions.schedule[el]} weekNumber={week.week} weekStart={week.start} crtTime={crtTime}/>
            else return ''
        })}</div> : ''}) : ''
      }
    </div>
  );
}

export default App;
