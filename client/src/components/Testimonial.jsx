import React from 'react'
import {assets,testimonialsData} from '../assets/assets'
const Testimonial = () => {
  return (
    <div>
      {/*title */}
      <h1 className="py-5 text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">Customer Testimonials</h1>
      <div className="grid grid-col md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4 py-8">
       {
        testimonialsData.map((item,idx)=>(
         <div key={idx} className="bg-white rounded-xl p-6 drop-shadow-md max-w-lg m-auto hover:scale-105 transition-all duration-700">
           <p className='text-4xl text-gray-500'>”</p>
           <p className='text-smtext-gray-500'>{item.text}</p>
           <div className='flex item-center gap-3 mt-5'>
            <img src={item.image} alt="" className="w-9 rounded-full "/>
            <div>
              <p >{item.author}</p>
              <p className=' text-gray-600'>{item.jobTitle}</p>
            </div>
           </div>
         </div>

        ))
       }
      </div>
    </div>
  )
}

export default Testimonial
