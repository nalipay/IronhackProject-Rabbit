import React, {useState, useEffect} from 'react'

// import { AiOutlineMessage } from 'react-icons/ai';
// import { BsArrowUpSquareFill, BsArrowDownSquareFill } from 'react-icons/bs'
// import CreateComment from './CreateComment'




export default function Post({props}) {

	// const [isOpenComment, setIsOpenComment] = useState(false)
	// const popupComment = () => {
	// 		setIsOpenComment(!isOpenComment)
	// 	}



    // const[count,setCount]=useState(0);
	// const inc=()=>{
	// 	setCount(count+1);
	//   }
	//   const dec=()=>{
	// 	if(count>0)
	// 	setCount(count-1);
	//   }
    

    return (
		<div className="page-content">
			<div>
					<div className="post-wrap" key={props.post._id}>
			
						<div className='post-top'>
                        
						<h3>hallo</h3>
							{/* <h3>{props.posts.title}</h3> */}
                            
							{/* <p className='post-comment-creator'>Created by: {props.post.creator}</p> */}
						</div>

						{/* <div className='vote-container'>
							<div className='icons'>
								<BsArrowUpSquareFill onClick={inc}/>
								<p>{count}</p>
								<BsArrowDownSquareFill onClick={dec}/>
							</div>
							<div className='post-info'>
								<h4>{props.post.description}</h4>
								<img className='post-img' src={props.post.fileURL} style={{width:'100px'}} alt="postImg" />
							</div>
						</div> */}
						
						{/* <div className="comment-icon-container">
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
						</div> */}
					</div>
			</div>
		</div>
		)
}