
import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import CreatePost from '../components/CreatePost'
import axios from 'axios'

export default function Channel() {
	const {name} = useParams()
	const [prost, setPosts] = useState([])
	// const getPosts = (./api/posts/name) => {
	// 	axios.get()
	// }

	const [isOpenPost, setIsOpenPost] = useState(false)
	const popupPost = () => {
		setIsOpenPost(!isOpenPost)
	}

	useEffect(() => {

	}, [])

    return (
        <div>
			<Link to={popupPost} onClick={popupPost}>Create new post</Link>
			{isOpenPost && <CreatePost
			handleClose={popupPost}
			/>}
		</div>
	)
}