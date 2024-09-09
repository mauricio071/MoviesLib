import { useSearchParams } from 'react-router-dom';
import './MovieGrid.css'
import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';

const Search = () => {

    const searchURL = import.meta.env.VITE_SEARCH;
    const apiKey = import.meta.env.VITE_API_KEY;

    const [searchParams] = useSearchParams();

    const query = searchParams.get("q")

    const [movies, setMovies] = useState([]);

    const [loading, setLoading] = useState(true);

    const getSearchedMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        setMovies(data.results);
        setLoading(false)
    }

    useEffect(() => {
        const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;
        getSearchedMovies(searchWithQueryURL);
    }, [query])

    return (
        <div className="container">
            <h2 className="title">Resultados para: {query}</h2>
            <div className="movies-container">
                {loading && <p>Carregando...</p>}
                {!loading && movies.length === 0 && <p>Nenhum resultado encontrado.</p>}
                {movies.length > 0 && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    )
}

export default Search