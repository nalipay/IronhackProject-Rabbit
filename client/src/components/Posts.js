import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'

import { AiOutlineMessage } from 'react-icons/ai';
import { BsArrowUpSquareFill, BsArrowDownSquareFill } from 'react-icons/bs'
import CreateComment from '../components/CreateComment'




export default function Channel({posts}) {


	const [isOpenPost, setIsOpenPost] = useState(false)
	const popupPost = () => {
			setIsOpenPost(!isOpenPost)
		}
	const [isOpenComment, setIsOpenComment] = useState(false)
	const popupComment = () => {
			setIsOpenComment(!isOpenComment)
		}
    
    const params = useParams()
    const name = params.name

    const[count,setCount]=useState(0);
	const inc=()=>{
		setCount(count+1);
	  }
	  const dec=()=>{
		if(count>0)
		setCount(count-1);
	  }
    

    return (
		<div className="page-content">
			<div>
				{posts.map((post) => (
					<div className="post-wrap" key={post._id}>
			
						<div className='post-top'>
							<h3>{post.title}</h3>
							<p className='post-comment-creator'>Created by: {post.creator}</p>
						</div>

						<div className='vote-container'>
							<div className='icons'>
								<BsArrowUpSquareFill onClick={inc}/>
								<p>{count}</p>
								<BsArrowDownSquareFill onClick={dec}/>
							</div>
							<div className='post-info'>
								<h4>{post.description}</h4>
								<img className='post-img' src={post.fileURL} style={{width:'100px'}} alt="postImg" />
							</div>
						</div>
						
						<div className="comment-icon-container">
                            <div className='icons'>
                                <AiOutlineMessage onClick={popupComment}/>
							    {isOpenComment && <CreateComment handleClose={popupComment} postId ={post._id} />}
                            </div>
							<div className='comment-info'>
                                {post.comments.map((comment) => (
                                    <div className='comment-container' key={comment._id}>
                                        <p className='post-comment-creator'>Comment created by: {comment.creator}</p>
                                        <p>{comment.text}</p>
                                    </div>
                                ))}
                            </div> 
						</div>
					</div>
				))}
			</div>
		</div>
			
		)
}