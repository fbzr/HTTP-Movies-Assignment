import React, { useState } from 'react';
import { addMovie } from './crud';
import { useHistory } from 'react-router-dom';

const initialState = {
    id: '',
    title: '',
    director:'',
    metascore: '',
    stars: []
}

const AddMovie = ({ setMovieList }) => {
    const [movie, setMovie] = useState(initialState);
    const { push } = useHistory();
    
    const handleChange = e => {
        e.persist();
        const value = e.target.type === 'number' ? parseInt(e.target.value, 10) : e.target.value;
        setMovie(prev => ({
            ...prev,
            [e.target.name]: value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const { data } = await addMovie(movie);
        setMovieList(data);
        push('/movies');
    }

    return (
        <div className="movie-card save-wrapper" style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between'}}>
            <form onSubmit={handleSubmit}>
                <div style={{cursor: 'default'}}>
                    <label htmlFor="title">Title: </label>
                    <input required onChange={handleChange} name='title' id='title' type='text' value={movie.title} />
                    <div className="movie-director">
                        <label htmlFor="director">Director: </label>
                        <input required onChange={handleChange} name='director' id='director' type='text' value={movie.director} />
                    </div>
                    <div className="movie-metascore">
                        <label htmlFor="metascore">Metascore: </label>
                        <input required onChange={handleChange} name='metascore' id='metascore' type="number" value={movie.metascore} />
                    </div>
                    <h3>Actors</h3>
                    {movie.stars.map((star, i) => (
                        <div key={star} className="movie-star">
                            {star}
                        </div>
                    ))}
                    
                    <button type='submit'>Update</button>
                </div>
            </form>
        </div>
    )
}

export default AddMovie
