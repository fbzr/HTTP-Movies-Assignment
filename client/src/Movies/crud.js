import axios from 'axios';

export const updateMovie = async movie => {
    try {
        return await axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie);
    } catch (err) {
        console.log(err);
    }
}