import React from 'react';
import './ScheduleCard.css'

const ScheduleCard = ({dayIdx, day, crtDate, schedule, weekNumber, weekStart, crtTime}) => {
    const calculateElapsedPercentage = (pickedDate, pickedTime, startDate, startTime, duration) => {
        // Combine picked date and time into one Date object
        const pickedDateTime = new Date(`${pickedDate}T${pickedTime}`);
        // Combine start date and start time into one Date object
        const startDateTime = new Date(`${startDate}T${startTime}`);
        // Create the end time by adding the duration (in hours) to the start time
        const endDateTime = new Date(startDateTime);
        endDateTime.setHours(endDateTime.getHours() + duration);
        // Calculate the total duration in milliseconds
        const totalDurationMillis = duration * 60 * 60 * 1000;
        // Calculate elapsed time in milliseconds
        const elapsedTime = pickedDateTime - startDateTime;
        // Calculate the percentage of elapsed time
        const percentageElapsed = (elapsedTime / totalDurationMillis) * 100;
        // Return the percentage clamped between 0 and 100
        return Math.max(0, Math.min(percentageElapsed, 100));
    };
    
    
    
    const even = weekNumber % 2
    // Filter the schedule for the day based on the week number
    const filteredSchedule = schedule.filter(subject => 
        subject.program.some(prog => prog.sapt === weekNumber)
    );

 

    return (
        <div className="schedule-card">
            {/* Header with Day Name */}
            <div className="card-header" style={{'backgroundColor': even ?'#FF5722':'#4CAF50' }}>
                <h3>{day}</h3>
                {/* <p>Săptămâna: {weekNumber}</p> */}
            </div>

            {/* Display each filtered subject */}
            {filteredSchedule.length > 0 ? (
                <div className="card-body">
                    {filteredSchedule.map((subject, index) => {
                        const currentProgram = subject.program.find(prog => prog.sapt === weekNumber);
                        // console.log(weekStart)
                        let scheduleDay = new Date(new Date(weekStart).setDate(new Date(weekStart).getDate() + dayIdx)).toISOString().split('T')[0];
                        // let scheduleDay = weekStart
                        // console.log(weekStart)
                        let greenPercentage = calculateElapsedPercentage(crtDate, crtTime, scheduleDay, currentProgram.start, currentProgram.durata) 
                        // console.log(greenPercentage)
                        return (
                            // <div key={index} className="subject-item">
                            //     <div style={{display:'flex', justifyContent:'center'}}><strong>{subject.nume}</strong><div><div>{subject.tip}</div>{subject.cab}</div></div>
                            //         {currentProgram.start}, {currentProgram.durata}h
                            // </div>

                            <div key={index} className="subject-item" style={{background: `linear-gradient(to right, rgba(0, 128, 0, 0.25) ${greenPercentage}%, rgba(255, 255, 255, 1) ${greenPercentage}%)`}}>
                                <div className="subject-header">
                                    <strong className="subject-name">{subject.nume}</strong>
                                    <div className="subject-details">
                                        <div className="subject-type">{subject.tip}</div>
                                        <div className="subject-cab">{subject.cab}</div>
                                    </div>
                                </div>
                                <div className="subject-program">
                                    {currentProgram.start}, {currentProgram.durata}h
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="card-body">
                    <p>No classes for this week.</p>
                </div>
            )}
        </div>
    );
};

export default ScheduleCard;
