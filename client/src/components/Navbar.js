import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
// import ImgLogo from '../assets/_rabbit.png'
import CreateChannel from './CreateChannel'
import { AuthContext } from '../context/auth';


function Navbar() {
	const [search, setSearch] = useState('')

	const [isOpenChannel, setIsOpenChannel] = useState(false)

	const handleSearchChange = event => {
		setSearch(event.target.value)
	  }
	const popupChannel = () => {
		setIsOpenChannel(!isOpenChannel);
	  }
	const { isLoggedIn, logoutUser } = useContext(AuthContext);

	return (
	
		<div>
			<nav>
				<div className='topNav'>
					<form>
							<input className='search-field' type="text" value={search}
								placeholder="Search for channel" name="input" 
								onChange={handleSearchChange} />	
					</form>
				</div>
				<div className='sideNav'>
					<div className='logo-header'>
						{/* <img src={ImgLogo} height='80' alt='homepic' /> */}
						<h1>rabbit</h1>
					</div>
					<ul>
						<li className='navLinks'>
							<Link to='/home' style={{ textDecoration: 'none' }}>HOME</Link>
							<br />
							<Link to='/signup' style={{ textDecoration: 'none' }}>SIGNUP</Link>
							<br />
							<Link to='/login' style={{ textDecoration: 'none' }}>LOGIN</Link>
							<br />
							<Link to={popupChannel} onClick={popupChannel} style={{ textDecoration: 'none' }}>CREATE NEW CHANNEL</Link>
							{isOpenChannel && <CreateChannel handleClose={popupChannel}/>}
							<br />
							{isLoggedIn && (
								<Link onClick={logoutUser} to='/home' style={{ textDecoration: 'none' }}>LOGOUT</Link>
							)}
						</li>
					</ul>
				</div>
        	</nav>
		</div>
		
	)
}

export default Navbar