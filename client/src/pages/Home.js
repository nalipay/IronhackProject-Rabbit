
import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import Post from '../components/Post'
import { AuthContext } from '../context/auth';

import Searchbar from '../components/Searchbar'

export default function Home() {
	
const [posts, setPosts] = useState([])
const { isLoggedIn, user} = useContext(AuthContext);

function getAllPosts() {
	axios.get(`/api/posts`)
			.then(response => {
				setPosts(response.data)
			})
		.catch(err => console.log(err))
}

	useEffect(() => {
		getAllPosts()
	}, [])

return (
		<div>
			<div>
			<Searchbar />
			{(isLoggedIn) && (<h2 className='channel-heading'>Welcome {user.username}</h2>)}
			{posts.sort((a, b) => {
				return b.votes - a.votes }).map((post) => (
					<div key={post._id}>
						<Post post={post} getAllPosts={getAllPosts}/>
					</div>			
				))
			}
			</div>
		</div>
	)
}