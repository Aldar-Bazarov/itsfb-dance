import React from "react";
import styles from "./Group.module.scss";
import { faker } from '@faker-js/faker';

const profiles = [];

for (let i = 0; i < 16; i++) {
  profiles.push({
    name: faker.internet.userName(),
    photo: `https://picsum.photos/200/200?random=${i}`,
  });
}

console.log(profiles);

const group = {
    name: "Группа №2 (7-10 лет)",
    teacher: {
        name: faker.internet.userName(),
        photo: "/images/teacher.jpg"
    },
    students: profiles
}

const Group = () => {
    return (
        <div className={styles.group}>
            <div className={styles.groupInfo}>
                <h1><span>Моя группа:</span><br />{group.name}</h1>
                <div className={styles.teacher}>
                    <div
                        style={{ backgroundImage: `url(${group.teacher.photo})` }}
                        className={styles.teacherPhoto}
                    />
                    <p><span>Преподаватель:</span><br />{group.teacher.name}</p>
                </div>
            </div>
            <div className={styles.students}>
                <h3>Состав группы:</h3>
                <div className={styles.studentGrid}>
                    {group.students.map((student) => (
                        <div className={styles.student} key={student.name}>
                            <div
                                style={{ backgroundImage: `url(${student.photo})` }}
                                className={styles.studentPhoto}
                            />
                            <p>{student.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Group;