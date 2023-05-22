import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as XLSX from 'xlsx/xlsx.mjs';
import { getInfo, update, updateImage } from "../../api/userApi"
import { setUser } from "../../store/slices/user.slice"
import AreaChart from "../../components/Charts/AreaChart/AreaChart"
import BarChart from "../../components/Charts/BarChart/BarChart"
import styles from './Profile.module.scss'
import { faker } from '@faker-js/faker'

const labels = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль']

const trainingData = labels.map(() => faker.datatype.number({ min: 8, max: 14 }))

const honorsData = labels.map(() => faker.datatype.number({ min: 0, max: 5 }))

const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [chartType, setChartType] = useState('Line')

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

  const handleChartChange = () => {
    if (chartType === 'Line') {
      setChartType('Bar')
    } else {
      setChartType('Line')
    }
  }

  const handleExportToExcel = () => {
    const testData = []

    for (let i = 0; i < labels.length; i++) {
      const row = {
        Месяц: labels[i],
        Тренировки: trainingData[i],
        Награды: honorsData[i],
      }

      testData.push(row)
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(testData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Таблица №1")
    XLSX.writeFile(workbook, "Данные.xlsx")
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
                style={{ backgroundImage: `url(http://localhost:4000/${user.img})` }}
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
            {
              chartType === "Line"
              ? <AreaChart labels={labels} trainingData={trainingData} honorsData={honorsData} />
              : <BarChart labels={labels} trainingData={trainingData} honorsData={honorsData} />
            }
            <div>
              <button className={styles.activityButton} onClick={handleChartChange}>
                Поменять вид графика
              </button>
              <button className={styles.activityButton} onClick={handleExportToExcel}>
                Ecxel Экспорт
              </button>
            </div>
          </div>
        </div>
      </div>
    } </>
  );
};

export default Profile;