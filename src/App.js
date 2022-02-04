import './App.css';
import Banner from './components/Banner';
import Movies from './components/Movies';
import Navbar from './components/Navbar';
import Favourites from './components/Favourites';
import Pagination from './components/Pagination';
import {BrowserRouter ,Routes , Route} from 'react-router-dom';

function App() {
  return (
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={
        <>
          <Banner/>
          <Movies/>
          <Pagination/>
       </>
       }/>
       <Route path="/fav" element={
         <>
         <Favourites/>
        </>
       }></Route>
    </Routes>
    
    {/* <Banner/> */}
   
   
  </BrowserRouter>
  );
}

export default App;
