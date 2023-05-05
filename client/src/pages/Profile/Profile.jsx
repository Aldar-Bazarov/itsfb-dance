import React from "react";
import styles from './Profile.module.scss';
// import Chart from "../../components/Chart";

const Profile = () => {
  return (
    <div className={styles.profilePage}>
      <div className={styles.profileInfo}>
        <div className={styles.greeting}>
          <h2>Привет, Дима! 👋</h2>
          <h3>Рады видеть тебя снова</h3>
        </div>
        <div className={styles.profileCard}>
          <div className={styles.profileBackImage}>
            <div className={styles.profileImage}></div>
          </div>
          <p className={styles.name}>Дима Чеботько</p>
          <p className={styles.location}>📍 Тюмень</p>
          <div className={styles.trainsAndHonors}>
            <div className={styles.trains}><span>24</span>Тренировки</div>
            <div className={styles.honors}><span>4</span>Награды</div>
          </div>
        </div>
      </div>
      <div className={styles.profileStatistics}>
        <div className={styles.features}>
          <div className={styles.profileExperience}>
            <div></div>
            <p>2400 XP</p>
          </div>          
          <div className={styles.motto}>
            <span>🙌</span>
            <h3>Девиз</h3>
            <p>Мир, дружба, жвачка!</p>
          </div>
          <div className={styles.target}>
            <span>🎯</span>
            <h3>Цель</h3>
            <p>Выиграть все батлы в России!</p>
          </div>
        </div>
        <div className={styles.activity}>
          {/* <Chart></Chart> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;