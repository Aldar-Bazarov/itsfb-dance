import React from "react";
import styles from './Pagination.module.scss';

export const Pagination = ({ pagesArray, page, setPage }) => {
  return (
    <div className={styles.pagination}>
      {pagesArray.map(pageNumber => (
        <div
          key={pageNumber}
          className={pageNumber === page ? styles.currentPage : styles.page}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </div>
      ))}
    </div>
  );
};