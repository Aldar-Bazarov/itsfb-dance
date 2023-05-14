import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInfo, update, updateImage } from "../../api/userApi";
import styles from './Profile.module.scss';
import { setUser } from "../../store/slices/user.slice";
// import Chart from "../../components/Chart";

const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [inputEdit, setInputEdit] = useState('')

  const imageRef = useRef(null)
  const firstnameRef = useRef(null)
  const secondnameRef = useRef(null)
  const mottoRef = useRef(null)
  const targetRef = useRef(null)

  const refs = [firstnameRef, secondnameRef, mottoRef, targetRef]

  const getProfileInfo = async () => {
  const profile = await getInfo(user.email)
    dispatch(setUser(profile))
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
    try {
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
    } catch (error) {
      alert(error.message)
    }
  }

  const handleImageChange = async (event) => {
    try {
      const file = event.target.files[0]
      const formData = new FormData()
      formData.append('img', file)
      await updateImage(user.id, formData)
      getProfileInfo();
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getProfileInfo()
  }, [])

  return (
    <> {
      user &&
      <div className={styles.profilePage}>
        <div className={styles.profileInfo}>
          <div className={styles.greeting}>
            <h2>Привет, {user.firstname}! 👋</h2>
            <h3>Рады видеть тебя снова</h3>
          </div>
          <div className={styles.profileCard}>
            <div className={styles.profileBackImage}>
              <div
                style={{backgroundImage: `url(http://localhost:4000/${user.img})`}}
                className={styles.profileImage}
                onClick={() => imageRef.current.click()}
              />
              <input type="file" className={styles.imageInput} ref={imageRef} onChange={handleImageChange} />
            </div>
            <div className={styles.name} ref={firstnameRef} id="firstname">
              <p>{user.firstname}</p>
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
              <p>{user.secondname}</p>
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
              <div className={styles.trains}><span>{user.trains}</span>Тренировки</div>
              <div className={styles.honors}><span>{user.awards}</span>Награды</div>
            </div>
          </div>
        </div>
        <div className={styles.profileStatistics}>
          <div className={styles.features}>
            <div className={styles.profileExperience}>
              <div></div>
              <p>{user.experience} XP</p>
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
              <p>{user.motto}</p>
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
              <p>{user.target}</p>
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