import React, { useState ,useEffect } from 'react'
import Pagination from './Pagination';
import axios from "axios";
import {Oval} from "react-loader-spinner";     

function Movies() {

    const[movies , setMovies] = useState([]); 
    const[page , setPage] = useState(1);
    const[hover , setHover] = useState();
    const[fav , setFav] = useState([]);

    const addFav=(movie)=>{
        let newArr = [...fav , movie];
        setFav([...newArr])
        console.log(fav);
    }

    const delFav =(movie)=>{
      fav.filter((obj)=>movie.id != obj.id)
    }

    const moveBackward = ()=>{
        if(page>1)
        setPage(page-1);
    }

    const moveForward = ()=>{
        setPage(page + 1);
    }

    useEffect(()=>{
       setTimeout(() => {
        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=ac5c9d5cdba71971cf995cf07aaf8a9f&page=${page}`).then((res)=>{
          // console.table();
          setMovies(res.data.results);
      })
       }, 1500);
    },[page])
  return (
    <div className='mb-8'> 
      <div className='mt-8 font-bold text-2xl
       text-center'>Trending Movies</div>
       {
           
           movies.length == 0 ? 
           <div className='flex justify-center'>
               <Oval
                 heigth="100"
                 width="100"
                 color='indigo'
                 secondaryColor='indigo'
                 ariaLabel='loading'
            />
            </div>
            :
            <div className='flex flex-wrap justify-center'>
              {
                  movies.map((obj)=>(
                    <div className={`bg-[url(https://image.tmdb.org/t/p/w500/${obj.backdrop_path})]
                    h-[35vh] w-[200px] bg-center bg-cover
                    flex items-end rounded-xl 
                    hover:scale-110
                    ease-out duration-300 m-4 
                    relative`
                    } onMouseEnter={()=>setHover(obj.id)}  onMouseLeave={()=>setHover('')}>
                        {
                            hover === obj.id && 
                            <>
                            {
                              fav.find((m)=>m.id == obj.id)?
                              <div className='absolute top-2 right-2 text-2xl cursor-pointer' onClick={()=>delFav(obj)} >❌</div>
                              :
                              <div className='absolute top-2 right-2 text-2xl cursor-pointer' onClick={()=>addFav(obj)} >❤️‍🔥</div>

                            }
                            </> 
                        }
                      
                        <div className='w-full bg-gray-800 
                        text-white py-2 flex justify-around
                        rounded-b-xl'>    
                          <p className='ˇˀtext center̉̉̉̉̉̉'>{obj.title}</p>
                          <p className='text-orange-300 font-sans font-bold ' >{obj.vote_average}</p>
                        </div>
                    </div>
                  ))
              }
           </div>
       }
         <Pagination page={page} moveForward={moveForward} moveBackward={moveBackward}/>
    </div>
  )
}

export default Movies
