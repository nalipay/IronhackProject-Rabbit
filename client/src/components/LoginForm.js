import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth'

export default function Login(props) {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(undefined);

	const { storeToken, verifyStoredToken } = useContext(AuthContext)

	const navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { username, password }
		axios.post('/api/auth/login', requestBody)
			.then(response => {
				const token = response.data.authToken
				storeToken(token)
				verifyStoredToken()
					.then(() => {
						navigate('/')
					})
				props.handleClose()
			})
			.catch(err => {
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
					<h1>Login</h1>
					<form onSubmit={handleSubmit}>

						<label htmlFor="username">Username: </label>
						<input className="signup-login-input" type="text" value={username} onChange={handleUsername} />
						<br />
						<label htmlFor="password">Password: </label>
						<input className="signup-login-input" type="password" value={password} onChange={handlePassword} />
						<button className="signup-login-btn" type="submit">Login</button>
					</form>

					{errorMessage && <h5>{errorMessage}</h5>}

					<h3>Don't have an account?</h3>
					<Link to={props.popupSignup} onClick={props.popupSignup}>Signup</Link>
				</div>
				
			</div>
			
		</>
	)
}