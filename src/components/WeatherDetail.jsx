import React from 'react'
import {useState, useEffect} from 'react'
import {IoIosPartlySunny} from 'react-icons/io'
import {HiLocationMarker} from 'react-icons/hi'
import {BsFillLightningFill} from 'react-icons/bs'
import {FiWind} from 'react-icons/fi'
import {BiSolidDroplet} from 'react-icons/bi'
import {MdCompress} from 'react-icons/md'
import {BsFillSunriseFill, BsFillSunsetFill} from 'react-icons/bs'
import {IoIosRainy} from 'react-icons/io'
import {IoIosSunny} from 'react-icons/io'

import SearchBar from './SearchBar'
import HourlyForcast from './HourlyForcast'
import Globe from './Glob'
import ErrorPage from './ErrorPage'
import Toast from './Toast'


function WeatherDetail() {
    const [currentWeather, setCurrentWeather] = useState(null)
    const [city, setCity] = useState('Bangalore')
    const [error, setError] = useState(false)
    const [toast, setToast] = useState(null)

    useEffect(() => {
        getWeatherDetail(city)
    }, [])

    const getCordinates = async(location) => {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=a51aa5437487f505618f9af39bd5dd1f`)
        const data = await response.json()
        console.log(data)
        if (data.length == 0){
            return false
        }
        return {lat:data[0].lat, lon:data[0].lon}
    }

    const getWeatherDetail = async(location) => {
        const data = await getCordinates(location)
        if (data){
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=a51aa5437487f505618f9af39bd5dd1f`)
            if(!response.ok){
                setError(true)
                return
            }
            const jsonRes = await response.json()
            setCurrentWeather(jsonRes)
            getCityFromLat(data.lat, data.lon)
        }else{
           setToast({
            toastMessage: "City not found"
           })
           setTimeout(()=>setToast(null), 2000)
        }
    }

    const getCityFromLat = async(lat, lon) => {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=a51aa5437487f505618f9af39bd5dd1f`)
        const data = await response.json()
        data.length == 1 && setCity(data[0].name)
    }

    function kelvinToCelsius(kelvin) {
        const celsius = (kelvin - 273.15)
        return Math.floor(celsius);
    }

    const getLocalTime = (time) => {
        const date = new Date(time)
        let hour = date.getHours()
        let meridian = hour > 12 ? "PM" : "AM"
        let minutes = date.getMinutes()
        hour = hour > 12 ? hour % 12 : hour
        hour = hour == 0 ? 12 : hour
        return `${hour}:${minutes} ${meridian}`
    }

    const getWeatherIcons = (weather) => {
        if(weather == 'Rain'){
            return <IoIosRainy size={100} color='white'/>
        }else if(weather == 'Clouds'){
            return <IoIosPartlySunny size={100} color='white'/>
        }else{
            return <IoIosSunny size={100} color='white'/>
        }
    }
    
    if(error){
        return <ErrorPage/>
    }
    return (
        <div className='max-w-[800px] mx-auto px-4 py-10 relative bg-gradient-to-br from-[#7cb6ff] from-70% to-[#fbd5f7]'>
            <SearchBar getWeatherDetail={getWeatherDetail}/>
            <div className='w-full p-8'>
                <div className='flex flex-row justify-between items-center mb-4 md:justify-evenly'>
                    <div>
                        <p className='text-[70px] text-white font-bold md:text-[90px]'>{kelvinToCelsius(currentWeather?.main.temp)}°</p>
                        <p className='text-xl text-white mt-[-15px]'>{currentWeather?.weather[0]?.description}</p>
                    </div>
                    <div>
                        {
                            currentWeather && getWeatherIcons(currentWeather?.weather[0].main)
                        }
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between md:justify-center">
                    <div>
                        <div className='flex flex-row items-center justify-start gap-1 text-[20px]'>
                            <p className="text-white">{city}</p>
                            <HiLocationMarker color='white' size={25}/>     
                        </div>
                        <p className='text-white text-[15px]'>{kelvinToCelsius(currentWeather?.main.temp_max)}° / {kelvinToCelsius(currentWeather?.main.temp_min)}° Feels like {kelvinToCelsius(currentWeather?.main.feels_like)}°</p>
                    </div>
                    <Globe/>
                </div>
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-3">
                <div className='w-[150px] h-[150px] bg-[#6daeff] rounded-[30px] flex flex-col items-center justify-center'>
                    <MdCompress color='white' size={50}/>     
                    <p className='text-white'>Pressure</p>
                    <p className="text-gray-100 text-[14px]">{currentWeather?.main.pressure} p/s</p>
                </div>
                <div className='w-[150px] h-[150px] bg-[#6daeff] rounded-[30px] flex flex-col items-center justify-center'>
                    <BiSolidDroplet color='white' size={50}/>     
                    <p className='text-white'>Humidity</p>
                    <p className="text-gray-100 text-[14px]">{currentWeather?.main.humidity}%</p>
                </div>
                <div className='w-[150px] h-[150px] bg-[#6daeff] rounded-[30px] flex flex-col items-center justify-center'>
                    <FiWind color='white' size={50}/>     
                    <p className='text-white'>Wind</p>
                    <p className="text-gray-100 text-[14px]">{currentWeather?.wind.speed} km/h</p>
                </div>
                <div className='w-[150px] h-[150px] bg-[#6daeff] rounded-[30px] flex flex-row items-center justify-center gap-x-2'>
                    <div className="flex flex-col items-center justify-center">
                        <BsFillSunriseFill color='white' size={25}/>     
                        <p className='text-white'>Sunraise</p>
                        <p className="text-gray-100 text-[14px]">{getLocalTime(currentWeather?.sys.sunrise)}</p>
                    </div>
                    <div>
                        <BsFillSunsetFill color='white' size={25}/>     
                        <p className='text-white'>Sunset</p>
                        <p className="text-gray-100 text-[14px]">{getLocalTime(currentWeather?.sys.sunset)}</p>
                    </div>
                </div>
                
            </div>
            {   
                currentWeather && 
                <HourlyForcast location={{city:city, lat:currentWeather.coord.lat, lon:currentWeather.coord.lon}}/>
            }
            {
                toast && <Toast message={toast.toastMessage}/>
            }
        </div>
    )
}

export default WeatherDetail