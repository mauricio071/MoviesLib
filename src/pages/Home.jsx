import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import './MovieGrid.css'

const Home = () => {

    const moviesURL = import.meta.env.VITE_API;
    const apiKey = import.meta.env.VITE_API_KEY;

    const [topMovies, setTopMovies] = useState([]);

    const getTopRatedMovies = async (url) => {
        const req = await fetch(url);
        const data = await req.json();
        setTopMovies(data.results);
    }

    useEffect(() => {
        const topRatedURL = `${moviesURL}top_rated?${apiKey}`;

        getTopRatedMovies(topRatedURL);
    }, [])

    return (
        <div className="container">
            <h2 className="title">Melhores filmes:</h2>
            <div className="movies-container">
                {topMovies.length === 0 && <p>Carregando...</p>}
                {topMovies.length > 0 && topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    )
}

export default Home