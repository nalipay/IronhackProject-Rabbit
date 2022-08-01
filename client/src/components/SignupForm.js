import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signup(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined)

    const navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { username, password, }
		axios.post('/api/auth/signup', requestBody)
			.then(response => {
				props.handleClose()
				props.setIsOpenLogin(true)
			})
			.catch(err => {
                console.log(err)
				const errorDescription = err.response.data.message
				setErrorMessage(errorDescription)
			})
	}

	const handleUsername = e => setUsername(e.target.value)
	const handlePassword = e => setPassword(e.target.value)

	return (
		
        <>
			<div className='popup-box'>
				<div className='popup-container'>
					<span className="close-icon" onClick={props.handleClose}>x</span>
					<h1>Signup</h1>
					<form onSubmit={handleSubmit}>

						<label htmlFor="username">Username: </label>
						<input className="signup-login-input" type="text" value={username} onChange={handleUsername} />
						<br />
						<label htmlFor="password">Password: </label>
						<input className="signup-login-input" type="password" value={password} onChange={handlePassword} />
						<button className="signup-login-btn" type="submit">Sign Up </button>
					</form>

					{errorMessage && <h5>{errorMessage}</h5>}

					<h3>Already have an account?</h3>
					<Link to={props.popupLogin} onClick={props.popupLogin}>Login</Link>
				</div>
			</div>
		</>
	)
}

