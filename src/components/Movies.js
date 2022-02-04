import React from 'react'
import BannerImg from '../images/banner.jpg'

function Movies() {
  return (
    <div className='mb-8'> 
      <div className='mt-8 font-bold text-2xl
       text-center'>Trending Movies</div>

        <div className='flex flex-wrap justify-center'>
            <div className={`bg-[url(${BannerImg})]
            h-[35vh] w-[200px] bg-center bg-cover
            flex items-end rounded-xl 
            hover:scale-110
            ease-out duration-300 m-4`
            }>
                <div className='w-full bg-gray-800 text-white py-2 text-center rounded-b-xl'>Title</div>
            </div>

            <div className={`bg-[url(${BannerImg})]
            h-[35vh] w-[200px] bg-center bg-cover
            flex items-end rounded-xl
            `
            }>
                <div className='w-full bg-gray-800 text-white py-2 text-center rounded-b-xl'>Title</div>
            </div>

            <div className={`bg-[url(${BannerImg})]
            h-[35vh] w-[200px] bg-center bg-cover
            flex items-end rounded-xl`
            }>
                <div className='w-full bg-gray-800 text-white py-2 text-center rounded-b-xl'>Title</div>
            </div>

            <div className={`bg-[url(${BannerImg})]
            h-[35vh] w-[200px] bg-center bg-cover
            flex items-end rounded-xl`
            }>
                <div className='w-full bg-gray-800 text-white py-2 text-center rounded-b-xl'>Title</div>
            </div>
        </div>

    </div>
  )
}

export default Movies
