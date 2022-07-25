
import React, { useContext } from 'react'
import { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'


export default function Comment(props) {
    
    const [comment, setComment] = useState("")
    const { user } = useContext(AuthContext)
    //const [comments, setComments] = useState([])
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    const handleSubmit = event => {
		event.preventDefault()
		const requestBody = { comment, creator:user.username }
        console.log(requestBody)
		axios.post(`http://localhost:5005/api/posts/${props.postId}`, requestBody)
			.then(response => {
                const comments = response.data
				//setComments(comments)
                props.handleClose()
            
			})
			.catch(err => {
                console.log(err)
				const errorDescription = err.response.data.message
				setErrorMessage(errorDescription)
			})
    }

    const handleComment = event => setComment(event.target.value)


	return (
        <>
            <div className="popup-box">
                <div className="box-channel">
                    <span className="close-icon" onClick={props.handleClose}>x</span>
                    <h2>Make a comment</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="comment"></label>
                        <input type="text" value={comment} onChange={handleComment} />
                        <br />
                        <button type="submit">Add new comment</button>
                        {/* <p className='post-comment-creator'>Created by: {comment.creator}</p>
                        <p>{post.comment}</p> */}
                    </form>
                    {errorMessage && <h5>{errorMessage}</h5>}
                </div>
            </div>
        </>
	)
}