import React, { useEffect, useState } from 'react'
import SearchField from './components/Search';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';

function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebaunceSearchTerm] = useState('');

  useDebounce(() => setDebaunceSearchTerm(searchTerm), 500, [searchTerm]);

  const API_BASE_URL = 'https://api.themoviedb.org/3';

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }

  const fetchMovies = async (query = '') => {

    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok){
        throw new Error('Failed to fetch movies')
      }

      const data = await response.json();
      if (data.response === 'False'){
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);


      
    } catch (error) {
      console.log(`Error fetching movies: ${error}`)
      setErrorMessage('Error fetching movies.');
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm])

  return (
    <main>

      <header style={{
          backgroundImage: "url('/bg-hero.jpg')",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}>
        <div className="container mx-auto flex flex-col justify-center items-center min-h-screen gap-5">
          <div className='grid grid-cols-3 gap-3'>
            <img src="poster1.jpg" alt="poster-1" className="w-60 h-100 object-cover rounded -rotate-3" />
            <img src="poster2.jpg" alt="poster-2" className="w-60 h-100 object-cover rounded" />
            <img src="poster3.jpg" alt="poster-3" className="w-60 h-100 object-cover rounded rotate-3"/>
          </div>
            <h1 className="text-5xl text-center font-bold capitalize max-w-[720px]">Find <span className='text-gradient'>Movies</span> you'll enjoy without the hassle</h1>
            
            <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        </div>
      </header>
      <section>
        <h2 className='text-center text-6xl m-5 font-bold'>All Movies</h2>

        <div className="container mx-auto my-10">
          {isLoading ? ( <p className='text-white'><span className="loading loading-spinner text-primary"></span></p> ): errorMessage ? ( <p className='text-red-500'>{errorMessage}</p> ) : (
            <ul className='grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 gap-3'>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </div>

      </section>

    </main>
  )
}

export default App

