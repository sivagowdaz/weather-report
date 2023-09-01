import React from 'react'
import {useState, useEffect} from 'react'
function Toast({message}) {
    return (
        <div className="absolute top-10 right-2 w-[150px] py-2 bg-[#6daeff] rounded-md">
            <p className=" text-center text-white">{message}</p>
        </div>
    )
}

export default Toast