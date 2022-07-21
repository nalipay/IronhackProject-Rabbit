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

		<nav>
            <div>
			<ul className='navBar'>
                <img src={ImgLogo} height='80' alt='homepic' />
				<h2>Rabbit</h2>
				<li>
                    <Link to='/signup'>Signup</Link>
					<br />
					<Link to='/login'>Login</Link>
				</li>
			</ul>
			<div>
				<Link to={popupChannel} onClick={popupChannel}>Create new channel</Link>
				{isOpenChannel && <CreateChannel 
				handleClose={popupChannel}
				/>}
			</div>
			
		</div>
        </nav>
	)
}

export default Navbar