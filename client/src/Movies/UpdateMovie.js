import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { updateMovie } from './crud';

const initialState = {
    id: '',
    title: '',
    director:'',
    metascore: '',
    stars: []
}
const UpdateMovie = ({ movieList, setMovieList }) => {
    const { id } = useParams();
    const [movie, setMovie] = useState(initialState);
    const { push } = useHistory();

    useEffect(() => {
        const movieToBeUpdated = movieList.find(item => `${item.id}` === id);
        if(movieToBeUpdated) {
            setMovie(movieToBeUpdated);
        }
    }, [movieList, id]);

    const handleChange = e => {
        e.persist();
        const value = e.target.type === 'number' ? parseInt(e.target.value, 10) : e.target.value;
        setMovie(prev => ({
            ...prev,
            [e.target.name]: value
        }))

    }

    const handleSubmit = async e => {
        e.preventDefault();
        const { data } = await updateMovie(movie);
        setMovieList(movieList.map(cur => cur.id === data.id ? data : cur));
        push('/');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="movie-card save-wrapper" style={{cursor: 'default'}}>
                <label htmlFor="title">Title: </label>
                <input required onChange={handleChange} name='title' id='title' type='text' value={movie.title} />
                <div className="movie-director">
                    <label htmlFor="director">Director: </label>
                    <input required onChange={handleChange} name='director' id='director' type='text' value={movie.director} />
                </div>
                <div className="movie-metascore">
                    <label htmlFor="metascore">Metascore: </label>
                    <input onChange={handleChange} name='metascore' id='metascore' type="number" value={movie.metascore} />
                </div>
                <h3>Actors</h3>
                {movie.stars.map((star, i) => (
                    <div key={star} className="movie-star">
                        {star}
                    </div>
                ))}
                <pre>{JSON.stringify(movie, null, 2)}</pre>
                <button type='submit'>Update</button>
            </div>
        </form>
    );
}

export default UpdateMovie
