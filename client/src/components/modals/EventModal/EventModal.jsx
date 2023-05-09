import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { removeEvent } from '../../../store/slices/events.slice';
import { deleteEvent } from '../../../api/eventApi';
import Modal from '../Modal/Modal';
import styles from './EventModal.module.scss';

const EventModal = ({ active, setActive, event, closestEvent, setClosestEvent }) => {
    const user = useSelector((state) => state.user)
    const isAdmin = user.role === "ADMIN" ? true : false

    const dispatch = useDispatch();

    const removeEventHandler = () => {
        if (closestEvent.id === event.id) {
            setClosestEvent(null)
        }
        deleteEvent(event.id)
        dispatch(removeEvent(event.id))
        setActive(false)
    }

    return (
        <Modal active={active} setActive={setActive}>
            {
                isAdmin &&
                <button onClick={removeEventHandler} className={styles.removeButton}>
                    Удалить мероприятие
                </button>
            }
            <div className={styles.eventTitle}>{event.title}</div>
            <div
                style={{ backgroundImage: `url(http://localhost:4000/${event.img})` }}
                className={styles.eventImage}
            />
            <div>
                <p className={styles.eventDate}>🗓️ {event.date}</p>
                <p className={styles.eventTime}>⏱️ {event.time.slice(0, 5)}</p>
            </div>
            <p className={styles.eventPlace}>📍 {event.place}</p>
            <p className={styles.eventDesctiption}>{event.description}</p>
        </Modal>
    );
};

export default EventModal;