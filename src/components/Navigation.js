import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'react-feather';
import { addDays, subDays, format } from 'date-fns';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';

const Navigation = () => {
  const { selectedDate, setSelectedDate, language } = useApp();
  const t = useTranslation(language);

  const handlePreviousDay = () => {
    // Manual parsing to avoid timezone issues
    const [year, month, day] = selectedDate.split('-').map(Number);
    const currentDate = new Date(year, month - 1, day); // month - 1 because Date uses 0-based months
    const previousDate = subDays(currentDate, 1);
    const newDate = format(previousDate, 'yyyy-MM-dd');
    console.log('handlePreviousDay:', selectedDate, '->', newDate);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    // Manual parsing to avoid timezone issues
    const [year, month, day] = selectedDate.split('-').map(Number);
    const currentDate = new Date(year, month - 1, day); // month - 1 because Date uses 0-based months
    const nextDate = addDays(currentDate, 1);
    const newDate = format(nextDate, 'yyyy-MM-dd');
    console.log('handleNextDay:', selectedDate, '->', newDate);
    setSelectedDate(newDate);
  };

  const handleDateChange = (e) => {
    console.log('handleDateChange:', e.target.value);
    setSelectedDate(e.target.value);
  };

  const handleToday = () => {
    const newDate = format(new Date(), 'yyyy-MM-dd');
    console.log('handleToday:', newDate);
    setSelectedDate(newDate);
  };

  return (
    <nav className="navigation">
      <div className="nav-buttons">
        <button className="nav-button" onClick={handlePreviousDay}>
          <ChevronLeft size={20} />
          {t.previous}
        </button>
        <button className="nav-button" onClick={handleToday}>
          <Calendar size={20} />
          {t.today}
        </button>
        <button className="nav-button" onClick={handleNextDay}>
          {t.next}
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="date-selector">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="date-input"
        />
      </div>
    </nav>
  );
};

export default Navigation;
