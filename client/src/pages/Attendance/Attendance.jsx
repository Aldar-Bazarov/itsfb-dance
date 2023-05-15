import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { getInfo } from "../../api/userApi"
import { Pagination } from '../../components/Pagination/Pagination'
import { getPageCount, getPagesArray } from '../../utils/pages';
import { getOldSchedule } from '../../api/scheduleApi'
import styles from './Attendance.module.scss'
import StudentsModal from '../../components/modals/StudentsModal/StudentsModal';
import { getGroup } from '../../api/groupApi';

const Attendance = () => {
    const [schedule, setSchedule] = useState()
    const user = useSelector((state) => state.user)
    const [isHaveGroup, setIsHaveGroup] = useState(false)
    const [limit] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pagesArray = getPagesArray(totalPages);
    const [students, setStudents] = useState();

    const [studentsVisible, setStudentsVisible] = useState(false);
    const [modalEvent, setModalEvent] = useState(null);

    const getSchedule = async () => {
        try {
            const profile = await getInfo(user.email)
            if (!profile.groupId) {
                setIsHaveGroup(false)
                return
            }
            setIsHaveGroup(true)
            const {students} = await getGroup(profile.groupId)
            setStudents(students.sort((a, b) => a.firstname.localeCompare(b.firstname)))
            const { rows, count } = await getOldSchedule(profile.groupId, limit, currentPage)
            setTotalPages(getPageCount(count, limit));
            setSchedule(rows)
        } catch (error) {
            alert(error.message)
        }
    }

    const handleStudentsModal = () => {
        setStudentsVisible(true);
    }

    useEffect(() => {
        getSchedule()
    }, [currentPage, limit])

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
                schedule &&
                <div className={styles.attendance}>
                    <h1>Список занятий:</h1>
                    <div className={styles.days}>
                        {schedule.map(el => (
                            <div key={el.day} className={styles.day} onClick={handleStudentsModal}>
                                ▪️ {el.day}
                            </div>
                        ))}
                    </div>
                    {
                        studentsVisible &&
                        <StudentsModal
                            active={studentsVisible}
                            setActive={setStudentsVisible}
                            students={students}
                        />
                    }
                    {
                        pagesArray.length > 1 &&
                        <Pagination pagesArray={pagesArray} page={currentPage} setPage={setCurrentPage} />
                    }
                </div>
            }
        </>
    )
}

export default Attendance