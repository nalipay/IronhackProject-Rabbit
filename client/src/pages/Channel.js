
import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import CreatePost from '../components/CreatePost'
import axios from 'axios'
import Posts from '../components/Posts'

export default function Channel() {
	
	const params = useParams()
	const name = params.name

 	const [posts, setPosts] = useState([])

	const [isOpenPost, setIsOpenPost] = useState(false)
	const popupPost = () => {
			setIsOpenPost(!isOpenPost)
		}

		useEffect(() => {
			axios.get(`http://localhost:5005/api/channel/${name}`)
				.then(response => {
					// console.log(response)
					setPosts(response.data.posts)
				})
			.catch(err => console.log(err))
		}, [name])

		return (
		<div>
			<div>
				<Link to={popupPost} onClick={popupPost}>Create new post</Link>
				{isOpenPost && <CreatePost handleClose={popupPost} name={name}/>}
			</div>
			<div>
				<h2>{name}</h2>
				
					<Posts posts={posts} />
			
			</div>
		</div>
			
		)
	}