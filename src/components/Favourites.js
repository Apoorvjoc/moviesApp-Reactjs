import React ,{useEffect, useState} from 'react'
import Pagination from './Pagination'

function Favourites() {

  let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
  27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

  const[curGen , setCurGen] = useState("All Genres");
  const[fav , setFav] = useState([]);
  const[gen , setGen] = useState([]);
  const[rating , setRating] = useState(0);
  const[popularity , setPopularity] = useState(0);
  const[search , setSearch] = useState('');
  const[rows , setRows] = useState(4);
  const[currPage , setCurrPage] = useState(1);

  useEffect(()=>{
    let oldFav = localStorage.getItem("imdb");
    oldFav = JSON.parse(oldFav) || []; 
    setFav([...oldFav]);
  },[])

  useEffect(()=>{
    let newGenreArr =  fav.map((obj)=>genreids[obj.genre_ids[0]]);
    // console.log("fav",fav);
    // console.log("gen",newGenreArr);
    newGenreArr = new Set(newGenreArr);
    setGen(["All Genres",...newGenreArr]);
  } , [fav])

  let delMov = (obj)=>{
    let newArr = [];
    newArr = fav.filter((m)=>{
      return m.id != obj.id 
    })
    setFav([...newArr]);
    localStorage.setItem("imdb" , JSON.stringify(newArr));
  }


  let filteredMovies = curGen == "All Genres" ? fav : 
    fav.filter((obj)=>{
        return genreids[obj.genre_ids[0]] == curGen
    })

    //searching
    filteredMovies = filteredMovies.filter((movie)=>{
      let nTitle = movie.title.toLowerCase();
      return nTitle.includes(search.toLowerCase());
    })

    //sorting
    if(rating === 1){
      filteredMovies = filteredMovies.sort(function(objA , objB){
        return objA.vote_average - objB.vote_average
      })
    }else if(rating === -1){
      filteredMovies = filteredMovies.sort(function(objA , objB){
        return objB.vote_average - objA.vote_average
      })
    }

    if(popularity === 1){
      filteredMovies = filteredMovies.sort(function(objA , objB){
        return objA.popularity - objB.popularity
      })
    }else if(popularity === -1){
      filteredMovies = filteredMovies.sort(function(objA , objB){
        return objB.popularity - objA.popularity
      })
    }

    //pagination
    let maxPage = Math.ceil(filteredMovies.length/rows);
    let si = Number((currPage-1)*rows)
    let ei = Number(si)+Number(rows);

    filteredMovies = filteredMovies.slice(si , ei);
  
    let goBack = ()=>{
      if(currPage>1){
        setCurrPage(currPage-1)
      }
      if(currPage<0){
        setCurrPage(Math.abs(currPage))
      }
    }

    let goAhead = ()=>{
      if(currPage<maxPage){
        setCurrPage(currPage+1)
      }
    }

  return (
    <>
    <div className='mt-4 px-2 flex justify-center flex-wrap space-x-2'>
      {
        gen.map((obj)=>(
          <button className={
            curGen == obj ? 
            'm-2 text-lg p-1 px-2 bg-blue-400 text-white rounded-xl font-bold' 
            :
            'm-2 text-lg p-1 px-2 bg-gray-400 text-white rounded-xl font-bold'
          }
          onClick={()=>{setCurGen(obj) ; setCurrPage(1)}}
          >
           {obj}
          </button>
        ))
      }
      
   
    </div>
       <div className='text-center'>
       <input placeholder='search' type = "text" 
       className='border border-2 p-1 m-2 text-center'
       value={search} onChange={(e)=>{setSearch(e.target.value); setCurrPage(1)}}/>

       <input placeholder='row' type = "number" 
       className='border border-2 p-1 m-2 text-center'
       value={rows} onChange={
         (e)=>{
           if(e.target.value < 0){
              setRows(0);
           }else{
              setRows(e.target.value);
           }
         }}/>
     </div>

   <div className='m-4'>
   <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                   <div className='flex'>
                   <img src="https://img.icons8.com/ios/24/000000/circled-up.png" className='mr-2 cursor-pointer' onClick={()=>{setPopularity(0); setRating(1)}}/>
                    Rating
                    <img src="https://img.icons8.com/ios/24/000000/circled-down.png" className='mr-2 cursor-pointer'onClick={()=>{setPopularity(0); setRating(-1)}}/>
                   </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className='flex'>
                    <img src="https://img.icons8.com/ios/24/000000/circled-up.png" className='mr-2 cursor-pointer' onClick={()=>{setRating(0); setPopularity(1)}}/>
                   Popularity
                    <img src="https://img.icons8.com/ios/24/000000/circled-down.png" className='mr-2 cursor-pointer'onClick={()=>{setRating(0); setPopularity(-1)}}/>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Genre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Remove
                  </th>
                 
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMovies.map((person) => (
                  <tr key={person.title}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-50 w-100">
                          <img className="h-20 w-100 " src={`https://image.tmdb.org/t/p/original${person.backdrop_path}`} alt="" />
                          <div className="text-md text-center mt-3 text-gray-900">{person.title}</div>
                        </div>
                       
                        <td className="px-6 py-4 whitespace-nowrap">
                      {/* <div className="text-sm text-gray-900">{person.title}</div> */}
                      {/* <div className="text-sm text-gray-500">{person.popularity}</div> */}
                    </td>
                        
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{person.vote_average}</div>
                      {/* <div className="text-sm text-gray-500">{person.popularity}</div> */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{person.popularity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{genreids[person.genre_ids[0]]}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="#" className="text-red-600 hover:text-red-900" onClick={()=>delMov(person)}>
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
   </div>

   <div className='mt-4 '>
     <Pagination page={currPage} moveForward={goAhead} moveBackward={goBack}/>
   </div>
     </>
  )
}

export default Favourites
