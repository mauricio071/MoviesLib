import { FaStar } from "react-icons/fa"
import { Link } from "react-router-dom"

const MovieCard = ({ movie, showLink = true }) => {

    const apiURL = import.meta.env.VITE_IMG;

    return (
        <div className="movie-card">
            <img src={apiURL + movie.poster_path} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>
                <FaStar /> {movie.vote_average.toFixed(2)}
            </p>
            {showLink &&
                <Link to={`/movie/${movie.id}`}>Detalhes</Link>
            }
        </div>
    )
}

export default MovieCard