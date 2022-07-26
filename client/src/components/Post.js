import React, {useState, useEffect} from 'react'
import { AiOutlineMessage } from 'react-icons/ai';
import { BsArrowUpSquareFill, BsArrowDownSquareFill } from 'react-icons/bs'
import CreateComment from './CreateComment'

import axios from 'axios';

export default function Post(props) {
    const[count,setCount]=useState(props.post.votes);
	const [isOpenComment, setIsOpenComment] = useState(false)

	const popupComment = () => {
			setIsOpenComment(!isOpenComment)
		}

	function saveVote(id, amount) {
		console.log('save vote')
		axios.post('http://localhost:5005/api/posts/vote', {id, amount})
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

    return (
		<div className="page-content">

					<div className="post-wrap">
						<div className='post-top'>
							<h3>{props.post.title}</h3>
							<p className='post-comment-creator'>Created by: {props.post.creator}</p>
						</div>

						<div className='vote-container'>
							<div className='icons'>
								<BsArrowUpSquareFill onClick={inc}/>
								<p>{count}</p>
								<BsArrowDownSquareFill onClick={dec}/>
							</div>
							<div className='post-info'>
								<h4>{props.post.description}</h4>
								<img className='post-img' src={props.post.fileURL} style={{width:'100px'}} alt="postImg" />
							</div>
						</div>
						
						<div className="comment-icon-container">
                            <div className='icons'>
                                <AiOutlineMessage onClick={popupComment}/>
							    {isOpenComment && <CreateComment handleClose={popupComment} postId ={props.post._id} />}
                            </div>
							<div className='comment-info'>
                                {props.post.comments.map((comment) => (
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