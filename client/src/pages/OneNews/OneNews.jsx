import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneNews } from '../../api/newsApi'
import styles from './OneNews.module.scss'
import Comments from '../../components/Comments/Comments'

const OneNews = () => {
    const { id } = useParams()
    const [oneNews, setOneNews] = useState(null)

    const getNews = async () => {
        const { data } = await getOneNews(id);
        setOneNews(data);
    }

    useEffect(() => {
        getNews();
    }, [])

    return (
        <div className={styles.oneNews}>
            {oneNews && (
                <>
                    <h1>{oneNews.title}</h1>
                    <div className={styles.body}>
                        <img
                            className={styles.newsImage}
                            src={`http://localhost:4000/${oneNews.img}`}
                        />
                        <p className={styles.content}>{oneNews.content}</p>
                    </div>
                    <Comments newsId={id} />
                </>
            )}
            {!oneNews && (
                <h1>Не удалось загрузить данные...</h1>
            )}
        </div>
    )
}

export default OneNews