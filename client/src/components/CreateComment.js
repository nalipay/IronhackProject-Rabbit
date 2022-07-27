
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
        //console.log(requestBody)
		axios.post(`http://localhost:5005/api/posts/${props.postId}`, requestBody)
           
			.then(response => {
                //console.log(props.postId)
           
                props.handleClose()
                props.setComments(response.data.comments)
            
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
                <div className="popup-container">
                    <span className="close-icon" onClick={props.handleClose}>x</span>
                    <h2>Make a comment</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="comment"></label>
                        <input className="comment-input" type="text" value={comment} onChange={handleComment} />
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