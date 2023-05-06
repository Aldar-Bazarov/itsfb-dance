import React from 'react';
import styles from './CreateEvent.module.scss';
import Modal from '../Modal/Modal';

const CreateEvent = ({ active, setActive}) => {
    return (
        <Modal active={active} setActive={setActive}>
            <div>
                Create Event
            </div>
        </Modal>
    );
};

export default CreateEvent;