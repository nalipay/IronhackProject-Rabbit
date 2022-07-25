
import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import CreatePost from '../components/CreatePost'
import axios from 'axios'
//import commentImg from '../assets/comment-icon.jpeg'
import CreateComment from '../components/CreateComment'
import { AiOutlineMessage } from 'react-icons/ai';
import { BsArrowUpSquareFill, BsArrowDownSquareFill } from 'react-icons/bs'

export default function Channel() {
	const params = useParams()
	const name = params.name

 	const [posts, setPosts] = useState([])
	//const {comments, setComments} = useState([])

	const [isOpenPost, setIsOpenPost] = useState(false)
	const popupPost = () => {
			setIsOpenPost(!isOpenPost)
		}
	const [isOpenComment, setIsOpenComment] = useState(false)
	const popupComment = () => {
			setIsOpenComment(!isOpenComment)
		}

	
	function GetAllPosts() {
		const name = params.name

		useEffect(() => {
			axios.get(`http://localhost:5005/api/channel/${name}`)
				.then(response => {
					// console.log(response)
					setPosts(response.data.posts)
				})
			.catch(err => console.log(err))
		}, [name])
	}
	GetAllPosts()

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

						<div className='vote-container'>
							<div className='vote-arrows'>
								<BsArrowUpSquareFill onClick={popupComment}/>
								<BsArrowDownSquareFill onClick={popupComment}/>
							</div>
							<div className='post-info'>
								<h4>{post.description}</h4>
								<img className='post-img' src={post.fileURL} style={{width:'100px'}} alt="postImg" />
							</div>
						</div>
						
						<div className="comment-icon">
							<AiOutlineMessage onClick={popupComment}/>
							{isOpenComment && <CreateComment handleClose={popupComment} postId ={post._id} />}
						</div>
						<div>
							{post.comments.map((comment) => (
								<div className='comment-container' key={comment._id}>
									<p className='post-comment-creator'>Comment created by: {comment.creator}</p>
									<p>{comment.text}</p>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
			
		)
	}