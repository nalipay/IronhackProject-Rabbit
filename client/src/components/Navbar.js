import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import ImgLogo from '../assets/_rabbit.png'
import CreateChannel from './CreateChannel'


function Navbar() {
	const [isOpenChannel, setIsOpenChannel] = useState(false)

	const popupChannel = () => {
		setIsOpenChannel(!isOpenChannel);
	  }

	return (
	
		<div>
			<div className='logo-header'>
				<img src={ImgLogo} height='80' alt='homepic' />
				<h1>rabbit</h1>
			</div>
			<nav>
				<div className='sideNav'>
					<ul>
						<li className='navLinks'>
							<Link to='/signup' style={{ textDecoration: 'none' }}>SIGNUP</Link>
							<br />
							<Link to='/login' style={{ textDecoration: 'none' }}>LOGIN</Link>
							<br />
							<Link to={popupChannel} onClick={popupChannel} style={{ textDecoration: 'none' }}>CREATE NEW CHANNEL</Link>
								{isOpenChannel && <CreateChannel 
								handleClose={popupChannel}
							/>}
						</li>
					</ul>
			
			
				</div>
        	</nav>
		</div>
		
	)
}

export default Navbar