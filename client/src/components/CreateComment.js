
import React, { useContext } from 'react'
import { useState } from "react";
import axios from 'axios'
import { AuthContext } from '../context/auth'

export default function Comment(props) {
    
    const [comment, setComment] = useState("")
    const { user } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = event => {
		event.preventDefault()
		const requestBody = { comment, creator:user.username }
		axios.post(`/api/posts/${props.postId}`, requestBody)
           
			.then(response => {
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
                    </form>
                    {errorMessage && <h5>{errorMessage}</h5>}
                </div>
            </div>
        </>
	)
}