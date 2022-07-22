import React, { useContext } from 'react'
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'


export default function CreatePost(props) {
    const [title, setTitle] = useState("")
    const [fileURL, setFileURL] = useState("")
    const [description, setDescription] = useState()
    const [errorMessage, setErrorMessage] = useState("")

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleFileUpload = e => {
     
        const uploadData = new FormData();
     
        uploadData.append("fileURL", e.target.files[0]);
     
        axios
          .post('/api/upload', uploadData)
          .then(response => {
           //console.log(response)
            setFileURL(response.data.secure_url);
        
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };

    const handleSubmit = event => {
		event.preventDefault()
		const requestBody = { title, fileURL, description, creator: user._id }
        //console.log(requestBody)
		axios.post('http://localhost:5005/api/posts', requestBody)
			.then(response => {
                props.handleClose()
				//console.log(response.data)
			})
			.catch(err => {
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
                        <input onChange={(e) => handleFileUpload(e)} type="file" />
                        <br />
                        <label htmlFor="description">Description: </label>
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