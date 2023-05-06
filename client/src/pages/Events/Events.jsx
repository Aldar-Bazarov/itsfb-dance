import React, { useState, useEffect } from 'react';
import styles from './Events.module.scss';
import { Pagination } from '../../components/Pagination/Pagination'
import Event from '../Event/Event'
import { getPageCount, getPagesArray } from '../../utils/pages';

const lastEvent = {
  id: "1",
  title: "Dance Buttle Party",
  date: "14.05.2023",
  time: "20:00",
  image: "/images/battle.jpg",
  description: "Взрыв уличных танцев спиной к спине с участием таких стилей, как хип-хоп, хаус, локинг и многое другое! В шоу принимают участие учащиеся труппы уличных танцев, от хип-хоп-попа в возрасте от 6 до взрослых всех уровней, которые выходят на сцену. Приходите и поддержите местные таланты, а также насладитесь разнообразной музыкой! Примечание: более молодые исполнители выступают в 2-х из 4-х спектаклей, если вы придете поддержать конкретного юного студента, обязательно проверьте время их выступлений."
}

const data = [
  {
    id: "2",
    title: "Hobbit dance party",
    date: "12.11.2023",
    time: "09:00",
    image: "/images/hobbit.webp",
    description: "Взрыв уличных танцев спиной к спине с участием таких стилей, как хип-хоп, хаус, локинг и многое другое! В шоу принимают участие учащиеся труппы уличных танцев, от хип-хоп-попа в возрасте от 6 до взрослых всех уровней, которые выходят на сцену. Приходите и поддержите местные таланты, а также насладитесь разнообразной музыкой! Примечание: более молодые исполнители выступают в 2-х из 4-х спектаклей, если вы придете поддержать конкретного юного студента, обязательно проверьте время их выступлений."
  },
  {
    id: "3",
    title: "Hobbit dance party",
    date: "12.11.2023",
    time: "09:00",
    image: "/images/hobbit.webp",
    description: "Взрыв уличных танцев спиной к спине с участием таких стилей, как хип-хоп, хаус, локинг и многое другое! В шоу принимают участие учащиеся труппы уличных танцев, от хип-хоп-попа в возрасте от 6 до взрослых всех уровней, которые выходят на сцену. Приходите и поддержите местные таланты, а также насладитесь разнообразной музыкой! Примечание: более молодые исполнители выступают в 2-х из 4-х спектаклей, если вы придете поддержать конкретного юного студента, обязательно проверьте время их выступлений."
  },
  {
    id: "4",
    title: "Hobbit dance party",
    date: "12.11.2023",
    time: "09:00",
    image: "/images/hobbit.webp",
    description: "Взрыв уличных танцев спиной к спине с участием таких стилей, как хип-хоп, хаус, локинг и многое другое! В шоу принимают участие учащиеся труппы уличных танцев, от хип-хоп-попа в возрасте от 6 до взрослых всех уровней, которые выходят на сцену. Приходите и поддержите местные таланты, а также насладитесь разнообразной музыкой! Примечание: более молодые исполнители выступают в 2-х из 4-х спектаклей, если вы придете поддержать конкретного юного студента, обязательно проверьте время их выступлений."
  },
  {
    id: "5",
    title: "Hobbit dance party",
    date: "12.11.2023",
    time: "09:00",
    image: "/images/hobbit.webp",
    description: "Взрыв уличных танцев спиной к спине с участием таких стилей, как хип-хоп, хаус, локинг и многое другое! В шоу принимают участие учащиеся труппы уличных танцев, от хип-хоп-попа в возрасте от 6 до взрослых всех уровней, которые выходят на сцену. Приходите и поддержите местные таланты, а также насладитесь разнообразной музыкой! Примечание: более молодые исполнители выступают в 2-х из 4-х спектаклей, если вы придете поддержать конкретного юного студента, обязательно проверьте время их выступлений."
  },
]

const Events = () => {
  const [events, setEvents] = useState([]);
  const [limit] = useState(4);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  let pagesArray = getPagesArray(totalPages);

  useEffect(() => {
    setEvents(data);
    setTotalPages(getPageCount(7, 4));
  }, [page, limit]);

  return (
    <div className={styles.events}>
      <h2>Предстоящее мероприятие:</h2>
      <div className={styles.heroEvent}>
        <div
          style={{ backgroundImage: `url(/images/events-hero.png)` }}
          className={styles.heroImage}
        />
        <Event event={lastEvent} />
      </div>
      <h2>Остальные мероприятия:</h2>
      <div className={styles.otherEvents}>
        {events.map((oneEvent) => (
          <Event event={oneEvent} key={oneEvent.id} />
        ))}
      </div>
      {
        pagesArray.length > 1 &&
        <Pagination pagesArray={pagesArray} page={page} setPage={setPage} />
      }
    </div>
  )
}

export default Events