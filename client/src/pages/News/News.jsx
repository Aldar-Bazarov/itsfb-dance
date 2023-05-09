import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllNews } from '../../api/newsApi'
import { setNews } from '../../store/slices/news.slice'
import { Pagination } from '../../components/Pagination/Pagination'
import { getPageCount, getPagesArray } from '../../utils/pages'
import NewsItem from '../../components/NewsItem/NewsItem'
import styles from './News.module.scss'

const News = () => {
  const news = useSelector(state => state.news.news)
  const dispatch = useDispatch();

  const [limit] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pagesArray = getPagesArray(totalPages);

  const getNews = async () => {
    const { news, totalCount } = await getAllNews(limit, currentPage);
    dispatch(setNews(news));
    setTotalPages(getPageCount(totalCount, limit));
  }

  useEffect(() => {
    getNews();
  }, [currentPage, limit])

  return (
    <div className={styles.news}>
      <h1 className={styles.title}>
        Привет, друг!<br />Добро пожаловать на нашей хип-хоп тусе,<br />чувствуй себя как дома!
      </h1>
      <div className={styles.heroImage} />
      <h2 className={styles.newsTitle}>Последние новости</h2>
      <div className={styles.newsList}>
        {news?.map(oneNews => <NewsItem oneNews={oneNews} key={oneNews.id} />)}
        {
          pagesArray.length > 1 &&
          <Pagination pagesArray={pagesArray} page={currentPage} setPage={setCurrentPage} />
        }
      </div>
    </div>
  )
}

export default News