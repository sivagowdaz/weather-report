import React from 'react'

function ErrorPage() {
  return (
    <div className="w-full h-[100vh] flex flex-row items-center justify-center">
        <div className="space-y-3 flex flex-col justify-center items-center">
            <p className="text-[15px] text-red">Something Went Wrong.</p>
            <button onClick={() => window.location.reload()} className='px-3 py-2 outline-none bg-blue-500 text-white rounded-md'>Refresh</button>
        </div>
    </div>
  )
}

export default ErrorPage