import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = React.createContext()

function AuthProviderWrapper(props) {

	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const storeToken = token => {
		// store this token in local storage
		localStorage.setItem('authToken', token)
	}

	const verifyStoredToken = () => {
		// check if we have a token in local storage
		const storedToken = localStorage.getItem('authToken')
		if (storedToken) {
			// if yes -> send it to the server to verify
			return axios.get(
				'http://localhost:5005/api/auth/verify',
				{ headers: { Authorization: `Bearer ${storedToken}` } }
			)
				.then(response => {
					// after verification set the user and set isLoggedIn
					const user = response.data
					setUser(user)
					setIsLoggedIn(true)
					setIsLoading(false)
				})
				.catch(err => {
					// the token is invalid
					setUser(null)
					setIsLoggedIn(false)
					setIsLoading(false)
				})
		} else {
			// there is no token in local storage
			setIsLoading(false)
		}
	}

	const logoutUser = () => {
		// remove the token from local storage
		localStorage.removeItem('authToken')
		// update the state
		setUser(null)
		setIsLoggedIn(false)
	}

	useEffect(() => {
		verifyStoredToken()
	}, [])

	return (
		<AuthContext.Provider value={{ isLoggedIn, user, isLoading, storeToken, verifyStoredToken, logoutUser }}>
			{props.children}
		</AuthContext.Provider>
	)
}

export { AuthProviderWrapper, AuthContext }