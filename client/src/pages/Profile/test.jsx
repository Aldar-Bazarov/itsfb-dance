import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { getInfo } from "../../api/userApi";
import styles from './Profile.module.scss';
// import Chart from "../../components/Chart";

const Profile = () => {
  const user = useSelector((state) => state.user)
  const [profile, setProfile] = useState(null)

  const [inputMotto, setInputMotto] = useState('')
  const [motto, setMotto] = useState('Мой девиз всего три слова улыбаться, это клёво!');
  const [editMotto, setEditMotto] = useState(false)

  const [inputTarget, setInputTarget] = useState('')
  const [target, setTarget] = useState('Выиграть все батлы в России!');
  const [editTarget, setEditTarget] = useState(false)

  const mottoInputRef = useRef(null);


  const getProfileInfo = async () => {
    const profile = await getInfo(user.email)
    setProfile(profile)
  }

  const handleEdit = (ref) => {
    if (ref.current) {
      setEditMotto(true)
    }
  }

  const handleTarget = () => {
    setEditTarget(true)
  }

  useEffect(() => {
    getProfileInfo();
  }, [])

  return (
    <> {
      profile &&
      <div className={styles.profilePage}>
        <div className={styles.profileInfo}>
          <div className={styles.greeting}>
            <h2>Привет, {profile.firstname}! 👋</h2>
            <h3>Рады видеть тебя снова</h3>
          </div>
          <div className={styles.profileCard}>
            <div className={styles.profileBackImage}>
              <div className={styles.profileImage}></div>
            </div>
            <p className={styles.name}>{profile.firstname}<span className={styles.edit} /></p>
            {
                editTarget &&
                <>
                  <input
                    maxLength={30}
                    onChange={e => setInputTarget(e.target.value)}
                  />
                  <button onClick={() => {
                    setTarget(inputTarget)
                    setEditTarget(false)
                  }}>
                    Ок
                  </button>
                </>
            }
            <p className={styles.name}>{profile.secondname}<span className={styles.edit} /></p>
            <div className={styles.trainsAndHonors}>
              <div className={styles.trains}><span>{profile.trains}</span>Тренировки</div>
              <div className={styles.honors}><span>{profile.awards}</span>Награды</div>
            </div>
          </div>
        </div>
        <div className={styles.profileStatistics}>
          <div className={styles.features}>
            <div className={styles.profileExperience}>
              <div></div>
              <p>{profile.experience} XP</p>
            </div>
            <div className={styles.motto}>
              <span>🙌</span>
              <h3>Девиз<span className={styles.edit} onClick={() => handleMotto()} /></h3>
              {
                editMotto &&
                <>
                  <input
                    maxLength={30}
                    onChange={e => setInputMotto(e.target.value)}
                  />
                  <button onClick={() => {
                    setMotto(inputMotto)
                    setEditMotto(false)
                  }}>
                    Ок
                  </button>
                </>
              }
              {!editMotto && <p>{motto}</p>}
            </div>
            <div className={styles.target}>
              <span>🎯</span>
              <h3>Цель<span className={styles.edit} onClick={handleTarget} /></h3>
              {
                editTarget &&
                <>
                  <input
                    maxLength={30}
                    onChange={e => setInputTarget(e.target.value)}
                  />
                  <button onClick={() => {
                    setTarget(inputTarget)
                    setEditTarget(false)
                  }}>
                    Ок
                  </button>
                </>
              }
              {!editTarget && <p>{target}</p>}
            </div>
          </div>
          <div className={styles.activity}>
            {/* <Chart></Chart> */}
          </div>
        </div>
      </div>
    } </>
  );
};

export default Profile;