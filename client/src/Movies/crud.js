import axios from 'axios';

export const updateMovie = async movie => {
    try {
        return await axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie);
    } catch (err) {
        console.log(err);
    }
}

export const deleteMovie = async movieId => {
    try {
        return await axios.delete(`http://localhost:5000/api/movies/${movieId}`);
    } catch (err) {
        console.log(err);
    }
}

export const addMovie = async movie => {
    try {
        return await axios.post('http://localhost:5000/api/movies/', movie);
    } catch (err) {
        console.log(err);
    }
}