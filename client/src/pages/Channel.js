
import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import CreatePost from '../components/CreatePost'
import axios from 'axios'
import Post from '../components/Post'
import Searchbar from '../components/Searchbar'
import { HiOutlineTrash } from 'react-icons/hi'



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
					 //console.log('hallo',response.data)
					setPosts(response.data.posts)
				})
			.catch(err => console.log(err))
		}, [name])

		return (
		<div className='page-content'>
			<Searchbar />
			<div className='channel-heading'>
				<h2>{name} <HiOutlineTrash onClick={popupPost} /></h2>
				<Link className="create-post-link" to={popupPost} onClick={popupPost}>CREATE NEW POST</Link>
				{isOpenPost && <CreatePost posts={posts} setPosts={setPosts} handleClose={popupPost} name={name}/>}
			</div>
			<div>
				{posts.map((post) => (
					<Post post={post} key={post._id}/>
				))}
			</div>
		</div>
			
		)
	}