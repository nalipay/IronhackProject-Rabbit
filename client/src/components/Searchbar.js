
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default function Searchbar(props) {
    const [search, setSearch] = useState('')
    const [filteredList, setFilteredList] = useState([])
    
    const handleSearchChange = event => {
		setSearch(event.target.value)
	  }
    useEffect(() => {
        if(search.length > 0) {
            axios.get(`/api/channels?q=${search}`)
            .then(response => {
                //console.log(response.data)
                setFilteredList(response.data)
            })
        .catch(err => console.log(err))
        }
    }, [search])
    
    //   const filteredChannels = filteredList.filter(channel => {
    //     if(channel.name.toLowerCase().includes(search.toLowerCase())){
    //       return true
    //     } else {
    //       return false
    //     }
    //   })

	return (
		<div>
		    <div className='search-field'>
				<form>
					<input className='search-input' type="text" value={search}
							placeholder="search for channel" name="input" 
							onChange={handleSearchChange} />	
            
                    <div>
                        {search && filteredList.map(channel => (
                            <div key={channel.name}>
                                <Link className="search-channel" to={'/channel/' + channel.name}>{channel.name}</Link>
                            </div>
                            ))}
                    </div>
				</form>
			</div>
		</div>
	)
}