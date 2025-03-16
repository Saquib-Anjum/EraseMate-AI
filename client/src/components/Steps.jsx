import React from 'react'
import {assets} from '../assets/assets'
const Steps = () => {
  return (
    <div className='mx-4 lg:mx-30 py-20 xl:py-40'>
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">Steps to remove background image <br className="max-md-hidden"/> with  <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">AI </span></h1>
      <div className="flex items-start flex-wrap gap-4 mt-16 xl:mt-24 justify-center">
            <div className="flex items-start gap-4 bg-white shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] p-6 pb-9 rounded hover:scale-105 transition-all duration-500"> 
                <img src={assets.upload_icon} alt="" className='max-w-9'/>
                <div>
                    <p className="text-xl font-medium">Upload Images</p>
                    <p className="text-sm text-netural-500 mt-1">This is a demo text ,will replace it latter.<br/>this is a demo..</p>
                </div>
            </div>

            <div className="flex items-start gap-4 bg-white shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] p-6 pb-9 rounded hover:scale-105 transition-all duration-500"> 
                <img src={assets.remove_bg_icon} alt="" className='max-w-9'/>
                <div>
                    <p className="text-xl font-medium">Remove background</p>
                    <p className="text-sm text-netural-500 mt-1">This is a demo text, will replace it later<br/>this is a demo..</p>
                </div>
            </div>

            <div className="flex items-start gap-4 bg-white shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] p-6 pb-9 rounded hover:scale-105 transition-all duration-500"> 
                <img src={assets.download_icon} alt="" className='max-w-9'/>
                <div>
                    <p className="text-xl font-medium">Download image</p>
                    <p className="text-sm text-netural-500 mt-1">This is a demo text ,will replace it latter.<br/>this is a demo..</p>
                </div>
            </div>
         
      </div>
    </div>
  )
}

export default Steps
