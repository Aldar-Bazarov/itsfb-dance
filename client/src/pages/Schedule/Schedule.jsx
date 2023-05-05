import React, {useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './Schedule.scss'

const dates = [
  new Date(2023, 4, 2),
  new Date(2023, 4, 5),
  new Date(2023, 4, 8),
  new Date(2023, 4, 11),
  new Date(2023, 4, 16),
  new Date(2023, 4, 19),
  new Date(2023, 4, 22),
  new Date(2023, 4, 25),
  new Date(2023, 4, 30),
  new Date(2023, 5, 2),
];

function isDateInArray(date, array) {
  return array.some((d) => {
    return d.getTime() === date.getTime();
  });
}

const tileClassName = ({ date }) => {
  if (isDateInArray(date, dates)) {
    return 'selected';
  }
};

const Schedule = () => {
  const [value, setDate] = useState();

  // const onChange = (e) => {
  //   // alert(e)
  // }

  return (
    <div className='schedule'>
      <h1>Моё расписание:</h1>
      <Calendar 
        value={value}
        onChange={setDate}
        tileClassName={tileClassName}
      />
    </div>
  )
}

export default Schedule