import React, {useState, useContext} from 'react'
import axios from 'axios';
import CreateComment from './CreateComment'
import { AuthContext } from '../context/auth';
import { useNavigate, Link } from 'react-router-dom'
import { AiOutlineMessage } from 'react-icons/ai';
import { BsArrowUpSquareFill, BsArrowDownSquareFill } from 'react-icons/bs'
import { FaTrashAlt } from 'react-icons/fa'

export default function Post(props) {
    const[count,setCount] = useState(props.post.votes);
	const[comments, setComments] = useState(props.post.comments)
	const [isOpenComment, setIsOpenComment] = useState(false)

	const { isLoggedIn, user} = useContext(AuthContext);


	const navigate = useNavigate()


	const popupComment = () => {
			setIsOpenComment(!isOpenComment)
		}

	function saveVote(id, amount) {
		//console.log('save vote')
		axios.post('/api/posts/vote', {id, amount})
			.then(response => {
				setCount(count+amount);	
			})
			.catch(err => console.log(err))
	}
	const inc=()=>{
		saveVote(props.post._id, 1)
	  }
	const dec=()=>{
		saveVote(props.post._id, -1)
	  }

	
	const deletePost = () => {
		axios.delete(`/api/posts/${props.post._id}`)
			.then(() => {
				props.getAllPosts()
			})
			.catch(err => console.log(err))
	}


    return (
		<div className="page-content">

					<div className="post-wrap">
						{(isLoggedIn && user.username === props.post.creator) && (<FaTrashAlt onClick={deletePost} />)}
						<div className='post-top'>
							{/* <h4>Channel: {props.post.channel}</h4>  */}
							<h3 style={{color:'#ff6602'}}>{props.post.title}</h3>
							<p className='post-comment-creator'>Created by: {props.post.creator}</p>
							<Link style={{color:'#b3b3b3'}} to={'/channel/' + props.post.channel}>{props.post.channel}</Link>
						</div>

						<div className='vote-container'>
							<div className='icons'>
								{/* {(isLoggedIn) && (<BsArrowUpSquareFill onClick={inc} />)} */}
								<BsArrowUpSquareFill onClick={inc}/>
								<p>{count}</p>
								<BsArrowDownSquareFill onClick={dec}/>
							</div>
							<div className='post-info'>
								<h4>{props.post.description}</h4>
								<img src={props.post.fileURL} style={{maxWidth:'40vw'}} alt="" />
								
							</div>
						</div>
						
						<div className="comment-icon-container">
                            <div className='icons'>
								{(isLoggedIn) && (<AiOutlineMessage onClick={popupComment}/>)}
                                {/* <AiOutlineMessage onClick={popupComment}/> */}
							    {isOpenComment && <CreateComment handleClose={popupComment} postId ={props.post._id} setComments={setComments}/>}
                            </div>
							<div className='comment-info'>
                                {comments.map((comment) => (
                                    <div className='comment-container' key={comment._id}>
                                        <p className='post-comment-creator'>Comment created by: {comment.creator}</p>
                                        <p>{comment.text}</p>
                                    </div>
                                ))}
                            </div> 
						</div>
					</div>
		</div>
		)
}