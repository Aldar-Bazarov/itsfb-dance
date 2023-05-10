import React, {useState, useEffect} from 'react'
import styles from './School.module.scss'
import { getSchool } from '../../api/schoolApi'

const MySchool = () => {
  const [school, setSchool] = useState(null)

  const initSchool = async () => {
    const school = await getSchool()
    setSchool(school)
  }

  useEffect(() => {
    initSchool();
  }, [])

  return (
    <> {
      school &&
      <div className={styles.school}>
      <div className={styles.hero}>
        <div className={styles.schoolInfo}>
          <h1>{school.name}</h1>
          <p>{school.description}</p>
        </div>
        <div className={styles.statistics}>
          <div
            style={{ backgroundImage: `url(http://localhost:4000/${school.photo})` }}
            className={styles.schoolPhoto}
          />
          <h3>Наш состав:</h3>
          <p>Количество преподавателей: <span>{school.teacherCount} 🧑‍🏫</span></p>
          <p>Количество групп: <span>{school.groupCount} 🤝</span></p>
          <p>Количество учеников: <span>{school.studentCount} 🙋‍♂️</span></p>
        </div>
      </div>
      <div className={styles.contacts}>
        <h3>Наши контакты:</h3>
        <div className={styles.contactsContainer}>
          <div>
            <p>Адрес:<br /><span>📍 {school.address}</span></p>
            <p>Телефон:<br /><span>📱 {school.phoneNumber}</span></p>
            <p>Почта:<br /><span>📬 {school.email}</span></p>
          </div>
          <iframe src={school.map} width="600" height="400"/>
        </div>
      </div>
    </div>
    } </>
  )
}

export default MySchool