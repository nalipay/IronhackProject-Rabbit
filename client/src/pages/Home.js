
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Post from '../components/Post'
import Searchbar from '../components/Searchbar'
import { PromiseProvider } from 'mongoose'

export default function Home() {
	
	const [posts, setPosts] = useState([])

	useEffect(() => {
		axios.get(`http://localhost:5005/api/posts`)
			.then(response => {
				 //console.log('hallo',response.data)
				setPosts(response.data)
			})
		.catch(err => console.log(err))
	}, [])

	return (
		<div>
		<Searchbar />
		<h2>Welcome {}</h2>
			<div>
				{posts.sort((a, b) => {
					return b.votes - a.votes }).map((post) => (
						<div key={post._id}>
							<Post post={post} />
						</div>
						
					))
			}
			</div>
		</div>
	)
}