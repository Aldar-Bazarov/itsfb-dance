import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './News.module.scss'
import { ReactComponent as NewsHeroImage } from '../../assets/images/heroImageNews.svg'
import { Pagination } from '../../components/Pagination/Pagination'
import NewsService from '../../api/NewsService'
import { getPageCount, getPagesArray } from '../../utils/pages'
import { truncateString } from '../../utils/string'

const News = () => {
  const [news, setNews] = useState([]);
  const [limit] = useState(4);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  let pagesArray = getPagesArray(totalPages);

  useEffect(() => {
    const getNews = async () => {
      const response = await NewsService.getAll(limit, page);
      setNews(response.data.rows);
      const totalCount = response.data.count;
      setTotalPages(getPageCount(totalCount, limit));
    }
    getNews();
  }, [page, limit])

  return (
    <>
      <h1 className={styles.title}>Привет, друг!<br />Добро пожаловать на нашей хип-хоп тусе,<br />чувствуй себя как дома!</h1>
      <NewsHeroImage className={styles.heroImage} />
      <h2 className={styles.newsTitle}>Последние новости</h2>
      <div className={styles.newsList}>
        {news.map((oneNews) => (
          <Link to={`news/${oneNews.id}`} className={styles.newsEl} key={oneNews.id}>
            <div
              className={styles.newsImage}
              style={{ backgroundImage: `url(http://localhost:4000/${oneNews.img})` }}
            />
            <div className={styles.newsInfo}>
              <h3>{truncateString(oneNews.title, 50)}</h3>
              <p>{truncateString(oneNews.content, 300)}</p>
              <p className={styles.newsDate}>{oneNews.createdAt.slice(0, 10).replace(/-/g, ".")}</p>
            </div>
          </Link>
        ))}
        {
          pagesArray.length > 1 &&
          <Pagination pagesArray={pagesArray} page={page} setPage={setPage} />
        }
      </div>
    </>
  )
}

export default News