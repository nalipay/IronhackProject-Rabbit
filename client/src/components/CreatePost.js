import React, { useEffect } from 'react'
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function CreatePost(props) {
    const [title, setTitle] = useState("")
    const [file, setFile] = useState()
    const [description, setDescription] = useState()
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    const handleSubmit = event => {
		event.preventDefault()
		const requestBody = { title, file, description }
		axios.post('http://localhost:5005/api/posts', requestBody)
			.then(response => {
                props.handleClose()
				console.log(response.data)
			})
			.catch(err => {
                console.log(err)
				const errorDescription = err.response.data.message
				setErrorMessage(errorDescription)
			})
    }

    const handleTitle = event => setTitle(event.target.value)
	return (
        <>
            <div className="popup-box">
                <div className="box-channel">
                    <span className="close-icon" onClick={props.handleClose}>x</span>
                    <h2>Create a post</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title">Title: </label>
                        <input type="text" value={title} onChange={handleTitle} />
                        <br />
                        <label htmlFor="file">File Upload: </label>
                        <input filename={file} onChange={e => setFile(e.target.files[0])} type="file" accept="image/*" />
                        <br />
                        <label htmlFor="file">Description: </label>
                        <input onChange={e => setDescription(e.target.value)} type="text" />
                        <br />
                        <button type="submit">Add new post</button>
                    </form>
                    {errorMessage && <h5>{errorMessage}</h5>}
                </div>
            </div>
        </>
	)
}