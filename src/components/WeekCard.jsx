import ScheduleCard from './ScheduleCard';
import { provisions } from '../data';
import { formatDateRange } from './YearWeeks';


export default function WeekCard({ week, crtDate, crtTime, showWeekNr = false, showWeekInterval = false }) {
    // let isCurrent = new Date(week.start) <= new Date(crtDate) && new Date(crtDate) <= new Date(week.end)
    // filter: isCurrent ?`drop-shadow(0 0 15px ${week.week%2 ?'#FF5722':'#4CAF50'})`:''
    return <div style={{ display: ' flex', flexDirection: 'row', flexWrap: 'wrap', textAlign: 'center', justifyContent: 'center' }}>
        {showWeekNr ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', writingMode: 'vertical-rl', textOrientation: 'mixed', marginRight: '5px' }}
        >{week.week !== 'vacation'? `WEEK ${week.week}` : week.week.toUpperCase()}
        </div> : ''}
        {showWeekInterval ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', writingMode: 'vertical-rl', textOrientation: 'mixed', marginRight: '5px' }}
        >{formatDateRange(week.start, week.end)}
        </div> : ''}
        {provisions.weekNamesRo.map((el, idx) => {
            if (el in provisions.schedule)
                return <ScheduleCard key={el} dayIdx={idx} day={el} crtDate={crtDate} schedule={provisions.schedule[el]} weekNumber={week.week} weekStart={week.start} crtTime={crtTime} />
            else return ''
        })}</div>
}