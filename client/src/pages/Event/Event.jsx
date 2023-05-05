import React from 'react'
import styles from './Event.module.scss'
import { NavLink } from 'react-router-dom';
import { truncateString } from '../../utils/string';


const Event = ({event}) => {
    return (
        <NavLink
            to={`/events/${event.id}`}
            className={styles.event}
        >
            <p className={styles.eventTitle}>{event.title}</p>
            <div
                style={{ backgroundImage: `url(${event.image})` }}
                className={styles.eventImage}
            />
            <p className={styles.eventDesctiption}>{truncateString(event.description, 200)}</p>
            <div>
                <p className={styles.eventDate}>🗓️ {event.date}</p>
                <p className={styles.eventTime}>⏱️ {event.time}</p>
            </div>
        </NavLink>
    )
}

export default Event