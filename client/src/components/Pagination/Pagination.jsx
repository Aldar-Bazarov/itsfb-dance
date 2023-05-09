import React, { useEffect } from "react"
import styles from './Pagination.module.scss';

export const Pagination = ({ pagesArray, page, setPage }) => {
  const handlePagination = (pageNumber) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    setPage(pageNumber)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <div className={styles.pagination}>
      {pagesArray.map(pageNumber => (
        <div
          key={pageNumber}
          className={pageNumber === page ? styles.currentPage : styles.page}
          onClick={() => handlePagination(pageNumber)}
        >
          {pageNumber}
        </div>
      ))}
    </div>
  );
};