import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { createComment, getCommentsByNewsId } from '../../api/commentApi'
import styles from './Comments.module.scss'
import { getInfo } from '../../api/userApi';

const Comments = ({ newsId }) => {
    const user = useSelector((state) => state.user)

    const [userInfo, setUserInfo] = useState(null)
    const [comments, setComments] = useState(null)
    const [commentInput, setCommentInput] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)


    const handleSubmit = async () => {
        if (commentInput) {
            await createComment({
                newsId,
                userId: user.id,
                text: commentInput,
                firstname: userInfo.firstname,
                secondname: userInfo.secondname,
                userImg: userInfo.img
            })
            setCommentInput("")
            setIsSubmit(!isSubmit)
        } else {
            alert("Напишите текст комментария!")
        }
    }

    const getComments = async () => {
        try {
            const { comments } = await getCommentsByNewsId(newsId);
            const data = await getInfo(user.email)
            setUserInfo(data)
            setComments(comments)
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        getComments();
    }, [isSubmit])

    return (
        <div className={styles.comments}>
            <h1 className={styles.title}>Комментарии:</h1>
            <div className={styles.form}>
                <textarea 
                    wrap="soft"
                    type="textarea"
                    name="commentInput"
                    required
                    placeholder='Напишите тут свой комментарий...'
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                    className={styles.commentInput}
                    maxLength={1000}
                />
                <button className={styles.commentButton} onClick={handleSubmit}>
                    Оставить комментарий
                </button>
            </div>
            {comments?.map(comment => (
                <div key={comment.id} className={styles.comment}>
                    <div
                        className={styles.userImage}
                        style={{ backgroundImage: `url(http://localhost:4000/${comment.userImg})` }}
                    />
                    <div className={styles.info}>
                        <p className={styles.username}>{comment.firstname} {comment.secondname}</p>
                        <p className={styles.text}>{comment.text}</p>
                        <div className={styles.date}>
                            <p>🕐 {comment.createdAt.slice(11, 16)}</p>
                            <p>📅 {comment.createdAt.slice(0, 10).replace(/-/g, ".")}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Comments