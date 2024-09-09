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

    const [error, setError] = useState(false);

    const getSearchedMovies = async (url) => {
        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error('Falha ao buscar os dados');
            }
            const data = await res.json();
            setMovies(data.results);
        } catch (err) {
            console.error("Erro ao buscar filmes:", err);
            setError(true);
        } finally {
            setLoading(false)
        }
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
                {!loading && error && <p>Ocorreu um problema ao carregar os filmes. Tente novamente mais tarde.</p>}
                {!loading && !error && movies.length === 0 && <p>Nenhum resultado encontrado.</p>}
                {!loading && !error && movies.length > 0 && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    )
}

export default Search