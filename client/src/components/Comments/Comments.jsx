import React, { useEffect, useState } from 'react'
import { getCommentsByNewsId } from '../../api/commentApi'
import styles from './Comments.module.scss'
import { truncateString } from '../../utils/string'


const Comments = ({ newsId }) => {
    // const [comments, setComments] = useState(null);
    const [commentInput, setCommentInput] = useState('');

    // const getComments = async () => {
    //     const { comments, totalCount } = await getCommentsByNewsId(newsId);
    //     setComments(comments);
    // }

    // useEffect(() => {
    //     getComments();
    //     console.log();
    // }, [])

    const comments = [
        {
            id: 1,
            text: '👍',
            username: 'John Doe',
            date: '2022-05-08T10:30:00Z',
            userImage: 'http://localhost:4000/051cb8b3-54f0-4d8a-8456-e21e67401eb8.jpg',
        },
        {
            id: 2,
            text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
            username: 'Jane Smith',
            date: '2022-05-07T15:45:00Z',
            userImage: 'http://localhost:4000/051cb8b3-54f0-4d8a-8456-e21e67401eb8.jpg',
        },
        {
            id: 3,
            text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
            username: 'Bob Johnson',
            date: '2022-05-06T08:20:00Z',
            userImage: 'http://localhost:4000/051cb8b3-54f0-4d8a-8456-e21e67401eb8.jpg',
        },
        {
            id: 4,
            text: 'Et harum quidem rerum facilis est et expedita distinctio.',
            username: 'Alice Lee',
            date: '2022-05-05T19:00:00Z',
            userImage: 'http://localhost:4000/051cb8b3-54f0-4d8a-8456-e21e67401eb8.jpg',
        },
        {
            id: 5,
            text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.',
            username: 'Mike Brown',
            date: '2022-05-04T12:15:00Z',
            userImage: 'http://localhost:4000/051cb8b3-54f0-4d8a-8456-e21e67401eb8.jpg',
        },
        {
            id: 6,
            text: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',
            username: 'Susan Davis',
            date: '2022-05-03T16:30:00Z',
            userImage: 'http://localhost:4000/051cb8b3-54f0-4d8a-8456-e21e67401eb8.jpg',
        },
        {
            id: 7,
            text: 'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
            username: 'David Wilson',
            date: '2022-05-02T09:45:00Z',
            userImage: 'http://localhost:4000/051cb8b3-54f0-4d8a-8456-e21e67401eb8.jpg',
        },
        {
            id: 8,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            username: 'Karen Jones',
            date: '2022-05-01T14:20:00Z',
            userImage: 'http://localhost:4000/051cb8b3-54f0-4d8a-8456-e21e67401eb8.jpg',
        },
        {
            id: 9,
            text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            username: 'Tom Wilson',
            date: '2022-04-30T18:00:00Z',
            userImage: "http://localhost:4000/051cb8b3-54f0-4d8a-8456-e21e67401eb8.jpg",
        }
    ]

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
                />
                <button className={styles.commentButton}>Оставить комментарий</button>
            </div>
            {comments?.map(comment => (
                <div key={comment.id} className={styles.comment}>
                    <div
                        className={styles.userImage}
                        style={{ backgroundImage: `url(${comment.userImage})` }}
                    />
                    <div className={styles.info}>
                        <p className={styles.username}>{comment.username}</p>
                        <p className={styles.text}>{comment.text}</p>
                        <p className={styles.date}>{comment.date.slice(0, 10).replace(/-/g, ".")}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Comments