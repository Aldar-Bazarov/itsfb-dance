import React, { useState } from 'react'
import SecretKey from '../../components/modals/SecretKey/SecretKey'
import CreateNews from '../../components/modals/CreateNews/CreateNews'
import CreateEvent from '../../components/modals/CreateEvent/CreateEvent'
import CreateGroup from '../../components/modals/CreateGroup/CreateGroup'
import styles from './Admin.module.scss'
import AddInGroup from '../../components/modals/AddInGroup/AddInGroup'
import DeleteGroup from '../../components/modals/DeleteGroup/DeleteGroup'
import CreateSchedule from '../../components/modals/CreateSchedule/CreateSchedule'

const Admin = () => {
  const [newsVisible, setNewsVisible] = useState(false)
  const [eventVisible, setEventVisible] = useState(false)
  const [secretKeyVisible, setSecretKeyVisible] = useState(false)
  const [createGroupVisible, setCreateGroupVisible] = useState(false)
  const [addInGroupVisible, setAddInGroupVisible] = useState(false)
  const [deleteGroupVisible, setDeleteGroupVisible] = useState(false)
  const [scheduleVisible, setScheduleVisible] = useState(false)

  return (
    <div className={styles.admin}>
      <h1>Админ панель</h1>
      <div className={styles.commands}>
        <button className={styles.adminButton} onClick={() => setSecretKeyVisible(true)}>
          Ключи для регистрации
        </button>
        <button className={styles.adminButton} onClick={() => setCreateGroupVisible(true)}>
          Создать группу
        </button>
        <button className={styles.adminButton} onClick={() => setNewsVisible(true)}>
          Добавить новость
        </button>
        <button className={styles.adminButton} onClick={() => setAddInGroupVisible(true)}>
          Добавить ученика в группу
        </button>
        <button className={styles.adminButton} onClick={() => setEventVisible(true)}>
          Добавить событие
        </button>
        <button className={styles.adminButton} onClick={() => setDeleteGroupVisible(true)}>
          Удалить группу
        </button>
        <button className={styles.adminButton} onClick={() => setScheduleVisible(true)}>
          Создать расписание
        </button>
      </div>
      {secretKeyVisible && <SecretKey active={secretKeyVisible} setActive={setSecretKeyVisible} />}
      {newsVisible && <CreateNews active={newsVisible} setActive={setNewsVisible} />}
      {eventVisible && <CreateEvent active={eventVisible} setActive={setEventVisible} />}
      {createGroupVisible && <CreateGroup active={createGroupVisible} setActive={setCreateGroupVisible} />}
      {addInGroupVisible && <AddInGroup active={addInGroupVisible} setActive={setAddInGroupVisible} />}
      {deleteGroupVisible && <DeleteGroup active={deleteGroupVisible} setActive={setDeleteGroupVisible} />}
      {scheduleVisible && <CreateSchedule active={scheduleVisible} setActive={setScheduleVisible} />}
    </div>
  )
}

export default Admin