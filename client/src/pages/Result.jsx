import React from "react";
import { assets } from "../assets/assets";

const Result = () => {
  return (
    <div className="mx-4 my-3 lg:mx-44 min-h-[75vh]">
      <div className="bg-white rounded-lg px-8 py-6 drop-shadow-sm">
        {/* image container */}
        <div className=" flex flex-col sm:grid grid-cols-2 gap-8 ">
          {/* Left side */}
          <div>
            <p className="font-semibold text-gray-5=600 mt-2">Original </p>
          
           <img src={assets.image_w_bg} alt="" className="rounded-md border" />
         
          </div>
          {/* right side */}
          <div className="flex flex-col">
            <p className="font-semibold text-gray-5=600 mt-2">Background Removed</p>
            <div className="rounded-md border border-gray-300 h-full relative bg-layers overflow-hidden ">
              {/* <img src={assets.image_wo_bg} alt="" className=" rounded-md border" /> */}
              <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                <div className="border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin">

                </div>
              </div>
             
            </div>

          </div>

        </div>
        {/* buttons */}
        <div className="flex justify-center ">
          <button>Try another image</button>
          <a href="">Download image</a>
        </div>
      </div>

    </div>
  );
};

export default Result;
