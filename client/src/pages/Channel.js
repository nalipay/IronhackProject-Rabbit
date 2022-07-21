import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import CreatePost from '../components/CreatePost'

export default function Channel() {
    const [isOpen, setIsOpen] = useState(false)

    const popupPost = () => {
		setIsOpen(!isOpen)
	}
    return (
        <div>
			<div>
				<Link to={popupPost} onClick={popupPost}>Create new post</Link>
				{isOpen && <CreatePost
				handleClose={popupPost}
				/>}
			</div>
		</div>

	)
}