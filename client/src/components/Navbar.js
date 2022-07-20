import React from 'react'
import { Link } from 'react-router-dom'
import ImgLogo from '../assets/logo.svg'

function Navbar(/*{handleLoginClick}*/) {
	// const handleClick = () => {
	// 	handleLoginClick()
	// }
	return (
		// <div className='Navbar'>
		// 	<div>
		// 		<span onClick={handleClick} className='login-icon'>Login</span>
		// 	</div>
		// </div>
		<nav>
            <div>
			<ul className='navBar'>
                <img src={ImgLogo} height='80' alt='homepic' />
				<li>
                    <Link to='/signup'>Signup</Link>
					<br />
					<Link to='/login'>Login</Link>
				</li>
			</ul>
		</div>
        </nav>
	)
}

export default Navbar