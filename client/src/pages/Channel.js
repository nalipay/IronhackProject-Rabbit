
import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import CreatePost from '../components/CreatePost'
import axios from 'axios'


export default function Channel() {
	const params = useParams()
	const name = params.name
	const [post, setPost] = useState([])

	useEffect(() => {
		axios.get(`http://localhost:5005/api/channel/${name}`)
			.then(response => {
				console.log(response)
				setPost(response.data)
			})
		.catch(err => console.log(err))
	}, [])

		const [isOpenPost, setIsOpenPost] = useState(false)
		const popupPost = () => {
			setIsOpenPost(!isOpenPost)
		}

		return (
		<div>
			<div>
				<Link to={popupPost} onClick={popupPost}>Create new post</Link>
				{isOpenPost && <CreatePost handleClose={popupPost} />}
			</div>
			<div className='visiblePost'>
				<h3> { post.title } </h3>
				<p> { post.description } </p>
			</div>
		</div>
			
		)
	}