
import React from 'react'
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function Channel(props) {
    const [name, setName] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    const handleSubmit = event => {
		event.preventDefault()
		const requestBody = { name }
		axios.post('http://localhost:5005/api/posts', requestBody)
			.then(response => {
                props.handleClose()
				navigate('/channel/' + name)
			})
			.catch(err => {
                console.log(err)
				const errorDescription = err.response.data.message
				setErrorMessage(errorDescription)
			})
    }
    const handleComment = event => setName(event.target.value)
	return (
        <>
            <div className="popup-box">
                <div className="box-channel">
                    <span className="close-icon" onClick={props.handleClose}>x</span>
                    <h2>Make a comment</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="comment"></label>
                        <input type="text" value={name} onChange={handleComment} />
                        <br />
                        <button type="submit">Add new comment</button>
                    </form>
                    {errorMessage && <h5>{errorMessage}</h5>}
                </div>
            </div>
        </>
	)
}