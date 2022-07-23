
import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import CreatePost from '../components/CreatePost'
import axios from 'axios'
import commentImg from '../assets/comment-icon.jpeg'
import Arrow, { DIRECTION } from 'react-arrows'

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
		<div className="page-content">
			<div>
				<Link to={popupPost} onClick={popupPost}>Create new post</Link>
				{isOpenPost && <CreatePost handleClose={popupPost} name={name}/>}
			</div>
			<div>
				<h2>{name}</h2>
	
				{posts.map((post) => (
					<div className="post-wrap" key={post._id}>
			
						<div className='post-top'>
							<h3>{post.title}</h3>
							<p className='post-creator'>Created by: {post.creator}</p>
						</div>
						<div className='post-info'>
							<h4>{post.description}</h4>
							<img className='post-img' src={post.fileURL} style={{width:'100px'}} alt="postImg" />
						</div>
						<div className="comment-area">
							<img src={commentImg} height='80' alt='commentImg' />
						</div>
					</div>
				))}
			</div>
		</div>
			
		)
	}