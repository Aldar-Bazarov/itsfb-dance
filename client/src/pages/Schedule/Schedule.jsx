import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import { useSelector } from "react-redux"
import { getInfo } from "../../api/userApi"
import { getSchedule } from '../../api/scheduleApi'
import styles from './Schedule.module.scss'
import 'react-calendar/dist/Calendar.css'
import './Calendar.scss'

const Schedule = () => {
  const user = useSelector((state) => state.user)
  const [isHaveGroup, setIsHaveGroup] = useState(false)
  const [dates, setDates] = useState([])

  const isDateInArray = (date, array) => {
    return array.some((d) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      return dateString === d.day;
    });
  }

  const tileClassName = ({ date }) => {
    if (isDateInArray(date, dates)) {
      return 'selected';
    }
  }

  const getData = async () => {
    try {
      const profile = await getInfo(user.email)

      if (!profile.groupId) {
        setIsHaveGroup(false)
        return
      }
      setIsHaveGroup(true)

      const { rows } = await getSchedule(profile.groupId)
      setDates(rows)
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      {
        !isHaveGroup &&
        <div className={styles.notInGroup}>
          Вас не добавили в группу
        </div>
      }
      {
        isHaveGroup &&
        <div className='calendar'>
          <h1>Моё расписание:</h1>
          <Calendar
            tileClassName={tileClassName}
          />
        </div>
      }
    </>
  )
}

export default Schedule