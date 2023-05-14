import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Group.module.scss";
import { faker } from '@faker-js/faker';
import { getGroup } from "../../api/groupApi";
import { getInfo } from "../../api/userApi";

const Group = () => {
    const user = useSelector((state) => state.user)
    const [group, setGroup] = useState(null)
    const [teacher, setTeacher] = useState(null)
    const [students, setStudents] = useState([])
    const [isHaveGroup, setIsHaveGroup] = useState(false)

    const getGroupInfo = async () => {
        const profile = await getInfo(user.email)
        const groupInfo = await getGroup(profile.groupId);
        setIsHaveGroup(profile.groupId ? true : false)
        setGroup(groupInfo.group)
        setTeacher(groupInfo.teacher)
        setStudents(groupInfo.students.sort((a, b) => a.firstname.localeCompare(b.firstname)))
    }

    useEffect(() => {
        getGroupInfo()
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
                group &&
                teacher &&
                students &&
                <div className={styles.group}>
                    <div className={styles.groupInfo}>
                        <h1><span>Моя группа:</span><br />{group.name}</h1>
                        <div className={styles.teacher}>
                            <div
                                style={{ backgroundImage: `url(http://localhost:4000/${teacher.img})` }}
                                className={styles.teacherPhoto}
                            />
                            <p>
                                <span>Преподаватель:</span><br />
                                {teacher.firstname} <br /> {teacher.secondname}
                            </p>
                        </div>
                    </div>
                    <div className={styles.students}>
                        <h3>Состав группы:</h3>
                        <div className={styles.studentGrid}>
                            {students.map((student) => (
                                <div
                                    className={styles.student}
                                    key={student.id}
                                >
                                    <div
                                        style={{ backgroundImage: `url(http://localhost:4000/${student.img})` }}
                                        className={student.id == user.id ?`${styles.studentPhoto} ${styles.active}` : styles.studentPhoto}
                                    />
                                    <p>{student.firstname} {student.secondname}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Group;