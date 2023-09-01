import React from 'react'
import {useState} from 'react'
import { HiLocationMarker } from "react-icons/hi";
import {BiSearch} from 'react-icons/bi'

function SearchBar({getWeatherDetail}) {
    const [location, setLocation] = useState('Bangaluru')
    return (
        <div className="w-full mx-auto flex flex-row items-center justify-center h-9">
            <div className="bg-[#6daeff] flex flex-row items-center justify-between w-[50%] pl-4 rounded-full h-full">
                <input className="outline-none w-4/5 bg-transparent text-white placeholder-white"
                    placeholder='Location'
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                />
                <button className='outline-none w-1/5 border-l-[1px] border-[] flex flex-row justify-center items-center'
                    onClick={(e) => getWeatherDetail(location)}
                >
                    <BiSearch color='white' size={25}/>
                </button>
            </div>
            {/* <button className='outline-none mr-2'>
                <HiLocationMarker color='white' size={25}/>
            </button> */}
        </div>
    )
}

export default SearchBar