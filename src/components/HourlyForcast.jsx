import React from 'react'
import {useEffect, useState} from 'react'
import {IoIosPartlySunny} from 'react-icons/io'
import {IoIosRainy} from 'react-icons/io'
import {IoIosSunny} from 'react-icons/io'
import {WiHumidity} from 'react-icons/wi'

function HourlyForcast({location}) {
    const [hourlyReport , setHourlyReport] = useState([])
    useEffect(() => {
        console.log(location)
        getHourlyUpdate()
    }, [location])

    const reformTime = (time) => {
        let hour = time.split(" ")[1].split(":")[0]
        let meridian = hour <= 12 ? 'AM' : 'PM'
        hour = hour > 12 ? hour % 12 : hour
        hour = hour == 0 ? 12 : hour
        return `${hour}:00 ${meridian}`
    }
    
    const getHourlyUpdate = async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=a51aa5437487f505618f9af39bd5dd1f`)
        const data = await response.json()
        setHourlyReport(data.list.slice(0, 9))
    }

    const getWeatherIcons = (weather) => {
        if(weather == 'Rain'){
            return <IoIosRainy size={20} color='white'/>
        }else if(weather == 'Clouds'){
            return <IoIosPartlySunny size={20} color='white'/>
        }else{
            return <IoIosSunny size={20} color='white'/>
        }
    }

    return (
        <div className='bg-[#6daeff] mt-8 p-4 rounded-md flex flex-row overflow-x-scroll scrollbar-hide md:p-6'>
            {
                hourlyReport.map((report, index) => 
                <div key={index} className="min-w-fit px-2 text-center flex flex-col items-center justify-center space-y-2 md:space-y-4 md:px-4">
                    <p className="text-gray-200 text-[12px] flex flex-row border-b-[1px] border-[#60a0ee] md:text-[15px]">{reformTime(report.dt_txt)}</p>
                    {
                        getWeatherIcons(report.weather[0].main)
                    }
                    <p className="text-white text-[12px] md:text-[15px]">{Math.floor(report.main.temp - 273.15)}</p>
                    <div className='flex flex-row items-center'>
                        <p className="text-white text-[12px] md:text-[15px]">{report.main.humidity}</p>
                        <WiHumidity
                            color='white'
                            size={20}
                        />
                    </div>
                </div>
                )
            }
        </div>
    )
}

export default HourlyForcast