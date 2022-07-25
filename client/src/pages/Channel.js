
import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import CreatePost from '../components/CreatePost'
import axios from 'axios'
//import commentImg from '../assets/comment-icon.jpeg'
import CreateComment from '../components/CreateComment'
import { AiOutlineMessage } from 'react-icons/ai';

export default function Channel() {
	const params = useParams()
	const name = params.name

 	const [posts, setPosts] = useState([])

	const [isOpenPost, setIsOpenPost] = useState(false)
	const popupPost = () => {
			setIsOpenPost(!isOpenPost)
		}
	const [isOpenComment, setIsOpenComment] = useState(false)
	const popupComment = () => {
			setIsOpenComment(!isOpenComment)
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
							<p className='post-comment-creator'>Created by: {post.creator}</p>
						</div>
						<div className='post-info'>
							<h4>{post.description}</h4>
							<img className='post-img' src={post.fileURL} style={{width:'100px'}} alt="postImg" />
						</div>
						<div className="comment-area">
							<AiOutlineMessage onClick={popupComment} />
							{isOpenComment && <CreateComment handleClose={popupComment} postId ={post._id} />}
							{/* {<img src={commentImg} alt="comment" onClick={popupComment} />} */}
							
							<div>

							</div>
						</div>
					</div>
				))}
			</div>
		</div>
			
		)
	}