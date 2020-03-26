import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { deleteMovie } from './crud';

const MovieCard = ({ movie }) => {
  const { title, director, metascore, stars, id } = movie;
  const { push } = useHistory();


  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      
      <div style={{marginTop: '25px'}}>
        <Link to={`/movies/${id}/edit`}>
          Update
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
