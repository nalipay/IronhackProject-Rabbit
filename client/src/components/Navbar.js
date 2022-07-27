import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
// import ImgLogo from '../assets/_rabbit.png'
import CreateChannel from './CreateChannel'
import { AuthContext } from '../context/auth';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm'


function Navbar() {
	
	const [isOpenChannel, setIsOpenChannel] = useState(false)
	const [isOpenLogin, setIsOpenLogin] = useState(false)
	const [isOpenSignup, setIsOpenSignup] = useState(false)

	const popupChannel = () => {
		setIsOpenChannel(!isOpenChannel);
	  }
	const popupLogin = () => {
		setIsOpenLogin(!isOpenLogin)
		setIsOpenSignup(false)
	}
	const popupSignup = () => {
		setIsOpenSignup(!isOpenSignup)
		setIsOpenLogin(false)
	}
	const { isLoggedIn, logoutUser } = useContext(AuthContext);

	return (
	
		<div>
			<nav>
				<div className='sideNav'>
					<div className='logo-header'>
						{/* <img src={ImgLogo} height='80' alt='homepic' /> */}
						<h1>rabbit</h1>
					</div>
					<ul>
						<li className='navLinks'>
							{isLoggedIn ?
							(
								<>
								<Link to='/' style={{ textDecoration: 'none' }}>HOME</Link>
								<br />
								<Link to={popupChannel} onClick={popupChannel} style={{ textDecoration: 'none' }}>CREATE NEW CHANNEL</Link>
									{isOpenChannel && <CreateChannel handleClose={popupChannel}/>}
								<br />
								{isLoggedIn && (
									<Link onClick={logoutUser} to='/' style={{ textDecoration: 'none' }}>LOGOUT</Link>
							)}
								</>
								) : (
								<>
								<br />
								<Link to={popupSignup} onClick={popupSignup} style={{ textDecoration: 'none' }}>SIGNUP</Link>
									{isOpenSignup && <SignupForm popupLogin={popupLogin} handleClose={popupSignup} setIsOpenLogin={setIsOpenLogin}/>}
								<br />
								<Link to={popupLogin} onClick={popupLogin} style={{ textDecoration: 'none' }}>LOGIN</Link>
									{isOpenLogin && <LoginForm popupSignup={popupSignup} handleClose={popupLogin}/>}
									<br />
									
								

								</>
							)
							}							
						</li>
					</ul>
				</div>
        	</nav>
		</div>
		
	)
}

export default Navbar