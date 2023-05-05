import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const OneNews = () => {
    const { id } = useParams()

    const [oneNews, setOneNews] = useState({})

    const url = `https://jsonplaceholder.typicode.com/posts/${id}`

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setOneNews(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }, [url, id])

    return (
        <div className='bg-slate-400'>
            {oneNews && (
                <>
                    <p>Новость опубликовал пользователь с id: {oneNews.userId}</p>
                    <h3 className='text-xl'>{oneNews.title}</h3>
                    <p>{oneNews.body}</p>
                </>
            )}
        </div>
    )
}

export default OneNews