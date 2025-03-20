import React, { useState, useEffect } from 'react';
import './CalendarHeatmap.css';

const CalendarHeatmap = ({ accessDates }) => {
  const [calendarData, setCalendarData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // Array of month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  useEffect(() => {
    // Process access dates into a format for the heatmap
    const datesMap = {};
    
    // Convert dates from ISO strings to counts
    Object.values(accessDates).forEach(dateStr => {
      const date = new Date(dateStr);
      const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      
      if (datesMap[dateKey]) {
        datesMap[dateKey]++;
      } else {
        datesMap[dateKey] = 1;
      }
    });
    
    // Generate calendar data for the current month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ day: null, activity: 0 });
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentYear}-${currentMonth}-${day}`;
      days.push({ 
        day, 
        activity: datesMap[dateKey] || 0,
        isToday: 
          new Date().getDate() === day && 
          new Date().getMonth() === currentMonth && 
          new Date().getFullYear() === currentYear
      });
    }
    
    setCalendarData(days);
  }, [accessDates, currentMonth, currentYear]);
  
  const navigateMonth = (direction) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;
    
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };
  
  const getActivityColor = (activity) => {
    if (activity === 0) return '';
    if (activity === 1) return 'low-activity';
    if (activity <= 3) return 'medium-activity';
    return 'high-activity';
  };

  return (
    <div className="calendar-heatmap">
      <div className="calendar-header">
        <button onClick={() => navigateMonth(-1)} className="month-nav">
          ◀
        </button>
        <h3>{monthNames[currentMonth]} {currentYear}</h3>
        <button onClick={() => navigateMonth(1)} className="month-nav">
          ▶
        </button>
      </div>
      
      <div className="calendar-grid">
        {daysOfWeek.map(day => (
          <div key={day} className="day-name">{day}</div>
        ))}
        
        {calendarData.map((day, index) => (
          <div 
            key={index}
            className={`day-cell ${day.day ? getActivityColor(day.activity) : 'empty'} ${day.isToday ? 'today' : ''}`}
          >
            {day.day && (
              <>
                <span className="day-number">{day.day}</span>
                {day.activity > 0 && (
                  <span className="activity-count">{day.activity}</span>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      
      <div className="activity-legend">
        <div className="legend-item">
          <div className="legend-color"></div>
          <span>No activity</span>
        </div>
        <div className="legend-item">
          <div className="legend-color low-activity"></div>
          <span>Light activity</span>
        </div>
        <div className="legend-item">
          <div className="legend-color medium-activity"></div>
          <span>Medium activity</span>
        </div>
        <div className="legend-item">
          <div className="legend-color high-activity"></div>
          <span>Heavy activity</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeatmap;
