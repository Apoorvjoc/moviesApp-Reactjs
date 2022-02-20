import React ,{useState , useEffect} from 'react'
import BannerImg from '../images/banner.jpg'
import axios from 'axios'
function Banner() {
  const[movies , setMovies] = useState([]); 
  useEffect(()=>{
    axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=ac5c9d5cdba71971cf995cf07aaf8a9f").then((res)=>{
        // console.table();
        setMovies(res.data.results[0]);
    })
},[])
  return (
    <div className={`bg-[url(https://image.tmdb.org/t/p/original/${movies.backdrop_path})] h-[60vh] bg-center bg-cover
    flex items-end`
    }
    >
      <div className='text-3xl text-white p-4 bg-gray-800 w-full 
      flex justify-center bg-opacity-50'>{movies.title}</div>
    </div>
  )
}

export default Banner
