import React from 'react';
import styles from './Modal.module.scss';

const Modal = ({ active, setActive, children }) => {
    return (
        <div
            className={active ? `${styles.container} ${styles.active}` : `${styles.container}`}
            onClick={() => setActive(false)
        }>
            <div 
                className={active ? `${styles.modal} ${styles.active}` : `${styles.modal}`}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;