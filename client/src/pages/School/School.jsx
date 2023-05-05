import React from 'react';
import styles from './School.module.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const school = {
  name: "Pulse",
  description: `Школа хип-хоп танцев "Pulse" - это место, где каждый может научиться танцевать в стиле хип-хоп и развить свой танцевальный талант. Эта школа зародилась несколько лет назад и с тех пор стала популярным местом для всех любителей танцев.

  Одним из главных преимуществ школы "Pulse" является то, что она предоставляет своим ученикам множество возможностей для профессионального развития в мире танцев. Здесь проводятся тренировки для всех возрастных групп, от детей до взрослых, а также для тех, кто только начинает свой путь в мире танцев или уже имеет опыт.
  
  Школа "Pulse" является лидером в области хип-хоп танцев и предлагает своим ученикам обучение в различных стилях этого направления, таких как breaking, locking, popping, hip-hop и многих других. Здесь также проводятся соревнования и мероприятия для тех, кто хочет проявить себя в мире танцев и показать свои навыки.
  
  Школа "Pulse" имеет отличный коллектив педагогов, которые являются настоящими профессионалами своего дела. Они помогают своим ученикам развиваться как танцоры и достигать новых высот в мире танцев. Ученики школы "Pulse" получают индивидуальное внимание и заботу, которые позволяют им достигать своих целей и мечтать о большем.`,
  address: "Тюмень, ул.Комсомольская, д.7, офис 341",
  photo: "/images/school.jpg",
  teacherCount: "12",
  groupCount: "24",
  srudentCount: "288",
  phoneNumber: "8(9503)90-22-82",
  email: "pulse_tmn@gmail.com"
}

const MySchool = () => {
  return (
    <div className={styles.school}>
      <div className={styles.hero}>
        <div className={styles.schoolInfo}>
          <h1>{school.name}</h1>
          <p>{school.description}</p>
        </div>
        <div className={styles.statistics}>
          <div
            style={{ backgroundImage: `url(${school.photo})` }}
            className={styles.schoolPhoto}
          />
          <h3>Наш состав:</h3>
          <p>Количество преподавателей: <span>{school.teacherCount} 🧑‍🏫</span></p>
          <p>Количество групп: <span>{school.groupCount} 🤝</span></p>
          <p>Количество учеников: <span>{school.srudentCount} 🙋‍♂️</span></p>
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
          <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aae567a140221f35614651cb1d3ddd7f923a6a17b36719d46c91ac791ee380b7c&amp;source=constructor" width="600" height="400" frameborder="0" />
        </div>
      </div>
      <div className={styles.galery}>
        <h3>Наша галерея:</h3>
        <div className={styles.carousel}>
          <Carousel transitionTime="1000" infiniteLoop>
            <div>
              <img src="/images/hobbit.webp" />
            </div>
            <div>
              <img src="/images/school.jpg" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default MySchool