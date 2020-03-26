import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { updateMovie, deleteMovie } from './crud';

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
        
        let value = e.target.type === 'number' ? parseInt(e.target.value, 10) : e.target.value;
        if(e.target.name === 'stars') {
            value = e.target.value.split(',');
        }
        
        setMovie(prev => ({
            ...prev,
            [e.target.name]: value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const { data } = await updateMovie(movie);
        setMovieList(movieList.map(cur => cur.id === data.id ? data : cur));
        push('/movies');
    }

    const handleDeleteMovie = async e => {
        e.preventDefault();
        const { data } = await deleteMovie(movie.id);
        console.log(data);
        setMovieList(movieList.filter(item => item.id !== data));
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
                        <input onChange={handleChange} name='metascore' id='metascore' type="number" value={movie.metascore} />
                    </div>
                    <h3>Actors</h3>
                    <input type="text" name='stars' id='stars' onChange={handleChange} value={movie.stars.join()} />
                    {movie.stars.map((star, i) => (
                        <div key={star} className="movie-star">
                            {star}
                        </div>
                    ))}
                    
                    <button type='submit'>Update</button>
                </div>
            </form>
            <div style={{minWidth: '30px'}}>
                <button type='button' onClick={handleDeleteMovie}>Delete Movie</button>
            </div>
        </div>
    );
}

export default UpdateMovie
