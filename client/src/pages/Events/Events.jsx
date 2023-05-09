import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '../../components/Pagination/Pagination'
import { getPageCount, getPagesArray } from '../../utils/pages';
import { getAllEvents, getClosestEvent } from '../../api/eventApi';
import { setEvents } from '../../store/slices/events.slice';
import EventItem from '../../components/EventItem/EventItem'
import EventModal from '../../components/modals/EventModal/EventModal';
import styles from './Events.module.scss';

const Events = () => {
  const events = useSelector(state => state.events.events)
  const dispatch = useDispatch();

  const [closestEvent, setClosestEvent] = useState(null);
  const [limit] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pagesArray = getPagesArray(totalPages);

  const [eventVisible, setEventVisible] = useState(false);
  const [modalEvent, setModalEvent] = useState(null);

  const handleEventModal = (event) => {
    setEventVisible(true);
    setModalEvent(event);
  }

  const getEvents = async () => {
    const { events, totalCount } = await getAllEvents(limit, currentPage);
    const closestEvent = await getClosestEvent();
    setClosestEvent(closestEvent);
    dispatch(setEvents(events));
    setTotalPages(getPageCount(totalCount, limit));
  }

  useEffect(() => {
    getEvents();
  }, [currentPage, limit, closestEvent])

  return (
    <div className={styles.events}>
      <h2>Предстоящее мероприятие:</h2>
      <div className={styles.heroEvent}>
        <div
          style={{ backgroundImage: `url(/images/events-hero.png)` }}
          className={styles.heroImage}
        />
        {
          closestEvent &&
          <EventItem
            event={closestEvent}
            handleEventModal={handleEventModal}
          />
        }
      </div>
      <h2>Остальные мероприятия:</h2>
      <div className={styles.otherEvents}>
        {events.map((oneEvent) => (
          <EventItem
            key={oneEvent.id}
            event={oneEvent}
            handleEventModal={handleEventModal}
          />
        ))}
      </div>
      {
        pagesArray.length > 1 &&
        <Pagination pagesArray={pagesArray} page={currentPage} setPage={setCurrentPage} />
      }
      {
        modalEvent &&
        <EventModal 
          active={eventVisible}
          setActive={setEventVisible}
          event={modalEvent}
          closestEvent={closestEvent}
          setClosestEvent={setClosestEvent}
        />
      }
    </div>
  )
}

export default Events