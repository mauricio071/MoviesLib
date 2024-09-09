import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
    BsWallet2,
    BsGraphUp,
    BsHourglassSplit,
    BsFillFileEarmarkTextFill
} from 'react-icons/bs'

import './Movie.css'
import MovieCard from '../components/MovieCard';

const Movie = ({ showLink = true }) => {
    const apiMovies = import.meta.env.VITE_API;
    const apiKey = import.meta.env.VITE_API_KEY;

    const { id } = useParams();

    const [movie, setMovie] = useState(null)

    const getMovie = async (movie) => {
        const res = await fetch(movie);
        const data = await res.json();
        setMovie(data);
    }

    useEffect(() => {
        const movieURL = `${apiMovies}${id}?${apiKey}`
        getMovie(movieURL);
    }, [])

    const converteMoeda = (valor) => {
        return valor.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    return (
        <div>
            {!movie && <p>Carregando...</p>}
            {movie && (
                <div className="movie-page">
                    <MovieCard movie={movie} showLink={false} />
                    <div className="info-container">
                        <p className='tagline'>{movie.tagline}</p>
                        <div className="info">
                            <h3><BsWallet2 /> Orçamento:</h3>
                            <p>{converteMoeda(movie.budget)}</p>
                        </div>
                        <div className="info">
                            <h3><BsGraphUp /> Receita:</h3>
                            <p>{converteMoeda(movie.revenue)}</p>
                        </div>
                        <div className="info">
                            <h3><BsHourglassSplit /> Duração:</h3>
                            <p>{movie.runtime} minutos</p>
                        </div>
                        <div className="info description">
                            <h3><BsFillFileEarmarkTextFill /> Descrição:</h3>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Movie