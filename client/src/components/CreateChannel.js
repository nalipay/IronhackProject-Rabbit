
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
		axios.post('http://localhost:5005/api/channels', requestBody)
			.then(response => {
                props.handleClose()
				navigate('/channel/'+ name)
			})
			.catch(err => {
                console.log(err)
				const errorDescription = err.response.data.message
				setErrorMessage(errorDescription)
			})
    }
    const handleName = event => setName(event.target.value)
	return (
        <>
            <div className="popup-box">
                <div className="popup-container">
                    <span className="close-icon" onClick={props.handleClose}>x</span>
                    <h2>Name your channel</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name: </label>
                        <input type="text" value={name} onChange={handleName} />
                        <button className="signup-login-btn" type="submit">Add new channel</button>
                    </form>
                    {errorMessage && <h5>{errorMessage}</h5>}
                </div>
            </div>
        </>
	)
}