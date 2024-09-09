import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import './MovieGrid.css';

const Home = () => {

    const moviesURL = import.meta.env.VITE_API;
    const apiKey = import.meta.env.VITE_API_KEY;

    const [topMovies, setTopMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getTopRatedMovies = async (url) => {
        try {
            const req = await fetch(url);

            if (!req.ok) {
                throw new Error('Falha ao buscar os dados');
            }

            const data = await req.json();
            setTopMovies(data.results);
        } catch (err) {
            console.error("Erro ao buscar filmes:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const topRatedURL = `${moviesURL}top_rated?${apiKey}`;
        getTopRatedMovies(topRatedURL);
    }, []);

    return (
        <div className="container">
            <h2 className="title">Melhores filmes:</h2>
            <div className="movies-container">
                {loading && <p>Carregando...</p>}
                {!loading && error && <p>Ocorreu um problema ao carregar os filmes. Tente novamente mais tarde.</p>}
                {!loading && !error && topMovies.length === 0 && <p>Filmes não encontrados.</p>}
                {!loading && !error && topMovies.length > 0 && topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    );
};

export default Home;
