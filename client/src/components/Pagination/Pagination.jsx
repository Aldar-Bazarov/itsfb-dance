import React from "react";
import styles from './Pagination.module.scss';

export const Pagination = ({pagesArray, page, setPage}) => {
    return (
        <div className={styles.pagination}>
          {pagesArray.map(p => (
            <div 
                key={p} 
                className={p === page ? styles.currentPage : styles.page}
                onClick={() => setPage(p)}>
              {p}
            </div>
          ))}
        </div>
    );
};