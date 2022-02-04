import React from 'react'
import BannerImg from '../images/banner.jpg'

function Banner() {
  return (
    <div className={`bg-[url(${BannerImg})] h-[60vh] bg-center bg-cover
    flex items-end`
    }
    >
      <div className='text-3xl text-white p-4 bg-gray-800 w-full 
      flex justify-center bg-opacity-50'>Spider-Man: No way home</div>
    </div>
  )
}

export default Banner
