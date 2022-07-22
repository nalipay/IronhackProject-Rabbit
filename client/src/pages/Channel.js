
import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import CreatePost from '../components/CreatePost'
import axios from 'axios'

export default function Channel() {
	const params = useParams()
	const name = params.name

 	const [posts, setPosts] = useState([])

	useEffect(() => {
		axios.get(`http://localhost:5005/api/channel/${name}`)
			.then(response => {
				// console.log(response)
				setPosts(response.data.posts)
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
				{isOpenPost && <CreatePost handleClose={popupPost} name={name}/>}
			</div>
			<div>
				<h2>{name}</h2>
	
				{posts.map((post) => (
					<div key={post._id}>
						<div>
							<h3>{post.title}</h3>
							<p>Created by: {post.creator}</p>
							<h4>{post.description}</h4>
							<img src={post.fileURL} style={{width:'100px'}} alt="postImg" />
						</div>
						
					</div>
				))}
			</div>
		</div>
			
		)
	}