import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { truncateString } from '../../utils/string';
import { removeNews } from '../../store/slices/news.slice';
import { deleteNews } from '../../api/newsApi';
import styles from './NewsItem.module.scss';

const NewsItem = ({oneNews}) => {
    const user = useSelector((state) => state.user)
    const isAdmin = user.role === "ADMIN" ? true : false

    const dispatch = useDispatch();

    const removeNewsHandler = () => {
        deleteNews(oneNews.id)
        dispatch(removeNews(oneNews.id))
    }

    return (
        <div className={styles.newsEl}>
            <div
                className={styles.newsImage}
                style={{ backgroundImage: `url(http://localhost:4000/${oneNews.img})` }}
            />
            <div className={styles.newsInfo}>
                <NavLink
                    to={`news/${oneNews.id}`}
                    className={styles.newsTitle}
                >
                    {truncateString(oneNews.title, 50)}
                </NavLink>
                <p>{truncateString(oneNews.content, 250)}</p>
                <p className={styles.newsDate}>{oneNews.createdAt.slice(0, 10).replace(/-/g, ".")}</p>
            </div>
            { isAdmin && <div className={styles.trashImage} onClick={removeNewsHandler}/> }
        </div>
    )
}

export default NewsItem;