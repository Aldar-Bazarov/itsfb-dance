import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { getInfo, update } from "../../api/userApi";
import styles from './Profile.module.scss';
// import Chart from "../../components/Chart";

const Profile = () => {
  const user = useSelector((state) => state.user)

  const [profile, setProfile] = useState(null)
  const [inputEdit, setInputEdit] = useState('')

  const firstnameRef = useRef(null)
  const secondnameRef = useRef(null)
  const mottoRef = useRef(null)
  const targetRef = useRef(null)

  const refs = [firstnameRef, secondnameRef, mottoRef, targetRef]

  const getProfileInfo = async () => {
    const profile = await getInfo(user.email)
    setProfile(profile)
  }

  const handleEdit = (targetRef) => {
    if (targetRef.current) {
      if (targetRef.current.classList.contains(styles.activeEdit)) {
        targetRef.current.classList.remove(styles.activeEdit)
        setInputEdit('')
      } else {
        targetRef.current.classList.add(styles.activeEdit)
        refs.map(ref => {
          if (ref !== targetRef) {
            ref.current.classList.remove(styles.activeEdit)
          }
        })
      }
    }
  }

  const handleSubmitEdit = async (ref) => {
    if (ref.current) {
      if (inputEdit.trim() === '') {
        return;
      }
      ref.current.classList.remove(styles.activeEdit);
      
      await update(user.id, {
        property: ref.current.id,
        value: inputEdit
      })
      setInputEdit('')
      getProfileInfo()
    }
  }

  useEffect(() => {
    getProfileInfo()
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
            <div className={styles.name} ref={firstnameRef} id="firstname">
              <p>{profile.firstname}</p>
              <span onClick={() => handleEdit(firstnameRef)} />
              <input
                maxLength={15}
                value={inputEdit}
                onChange={e => setInputEdit(e.target.value)}
              />
              <button onClick={() => handleSubmitEdit(firstnameRef)}>
                Ок
              </button>
            </div>
            <div className={styles.name} ref={secondnameRef} id="secondname">
              <p>{profile.secondname}</p>
              <span onClick={() => handleEdit(secondnameRef)} />
              <input
                maxLength={15}
                value={inputEdit}
                onChange={e => setInputEdit(e.target.value)}
              />
              <button onClick={() => handleSubmitEdit(secondnameRef)}>
                Ок
              </button>
            </div>
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
            <div className={styles.motto} ref={mottoRef} id="motto">
              <span>🙌</span>
              <h3>Девиз<span className={styles.edit} onClick={() => handleEdit(mottoRef)} /></h3>
              <input
                maxLength={30}
                value={inputEdit}
                onChange={e => setInputEdit(e.target.value)}
              />
              <button onClick={() => handleSubmitEdit(mottoRef)}>
                Ок
              </button>
              <p>{profile.motto}</p>
            </div>
            <div className={styles.target} ref={targetRef} id="target">
              <span>🎯</span>
              <h3>Цель<span className={styles.edit} onClick={() => handleEdit(targetRef)} /></h3>
              <input
                maxLength={30}
                value={inputEdit}
                onChange={e => setInputEdit(e.target.value)}
              />
              <button onClick={() => handleSubmitEdit(targetRef)}>
                Ок
              </button>
              <p>{profile.target}</p>
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