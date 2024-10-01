import React from 'react';
import { provisions } from '../data'; // Adjust the import path as needed
import './WeeksCard.css'; // Import a CSS file for additional styling

export default function WeeksCard({weekNumber}) {
    const academicYear = "Anul universitar 2024-2025";

    const formatDateRange = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
    
        const monthNames = ["ian", "feb", "mart", "apr", "mai", "iun", "iul", "aug", "sep", "oct", "noi", "dec"];
        const formattedStart = `${startDate.getDate()} ${monthNames[startDate.getMonth()]}`;
        const formattedEnd = `${endDate.getDate()} ${monthNames[endDate.getMonth()]}`;
    
        return `${formattedStart} - ${formattedEnd}`;
    };

    return (
        <div className="weeks-card">
            <h2 className="academic-year">{academicYear}</h2>
            <table className="weeks-table" style={{borderRadius: '8px 0px', overflow:'hidden'}}>
                <thead>
                    <tr style={{backgroundColor:  weekNumber % 2 ?'#FF5722':'#4CAF50'}}>
                        <th className="header-cell">Saptamana</th>
                        <th className="header-cell">Interval</th>
                    </tr>
                </thead>
                <tbody>
                    {provisions.weeks.map((week, index) => (
                        <tr
                            key={index}
                            className={week.week == 'vacation' ? 'vacation-row' : (week.week % 2 === 0 ? 'even-row' : 'odd-row')}
                        >
                            {week.week == 'vacation' ? (
                                <td colSpan="2" className="vacation-cell">
                                    Vacanță {formatDateRange(week.start, week.end)}
                                </td>
                            ) : (
                                <>
                                    <td className="week-cell">{week.week}</td>
                                    <td className="interval-cell">{formatDateRange(week.start, week.end)}</td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
