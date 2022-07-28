
import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import CreatePost from '../components/CreatePost'
import axios from 'axios'
import Post from '../components/Post'
import Searchbar from '../components/Searchbar'




export default function Channel() {
	
	const params = useParams()
	const name = params.name

 	const [posts, setPosts] = useState([])

	const [isOpenPost, setIsOpenPost] = useState(false)
	const popupPost = () => {
			setIsOpenPost(!isOpenPost)
		}
	
	function getAllPosts() {
		axios.get(`/api/channel/${name}`)
				.then(response => {
					 //console.log('hallo',response.data)
					setPosts(response.data.posts)
				})
			.catch(err => console.log(err))
	}
		useEffect(() => {
			getAllPosts()
		}, [])

		return (
		<div className='page-content'>
			<Searchbar />
			<div className='channel-heading'>
				<h2>{name}</h2>
				<Link className="create-post-link" to={popupPost} onClick={popupPost}>CREATE NEW POST</Link>
				{isOpenPost && <CreatePost posts={posts} setPosts={setPosts} handleClose={popupPost} name={name}/>}
			</div>
			<div>
				{posts.reverse().map((post) => (
					<Post post={post} key={post._id} getAllPosts={getAllPosts} />
				))}
			</div>
		</div>
			
		)
	}