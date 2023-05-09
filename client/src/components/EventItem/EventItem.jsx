import React from 'react'
import { truncateString } from '../../utils/string';
import styles from './EventItem.module.scss'

const EventItem = ({ event, handleEventModal }) => {
    return (
        <div
            className={styles.event}
            onClick={() => { handleEventModal(event) }}
        >
            <p className={styles.eventTitle}>{truncateString(event.title, 40)}</p>
            <div
                style={{ backgroundImage: `url(http://localhost:4000/${event.img})` }}
                className={styles.eventImage}
            />
            <p className={styles.eventDesctiption}>{truncateString(event.description, 200)}</p>
            <div>
                <p className={styles.eventDate}>🗓️ {event.date}</p>
                <p className={styles.eventTime}>⏱️ {event.time.slice(0, 5)}</p>
            </div>
            <p className={styles.eventTime}>📍 {event.place}</p>
        </div>
    )
}

export default EventItem