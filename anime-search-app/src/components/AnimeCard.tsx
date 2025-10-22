import React from 'react';
import { Link } from 'react-router-dom';
import { Anime } from '../types/anime';

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  return (
    <Link to={`/anime/${anime.mal_id}`} className="anime-card">
      <div className="card-image">
        <img 
          src={anime.images.jpg.large_image_url || anime.images.jpg.image_url} 
          alt={anime.title}
          loading="lazy"
        />
      </div>
      <div className="card-content">
        <h3 className="card-title">{anime.title}</h3>
        <div className="card-details">
          {anime.score && (
            <div className="card-score">
              ⭐ {anime.score}
            </div>
          )}
          {anime.episodes && (
            <div className="card-episodes">
              📺 {anime.episodes} eps
            </div>
          )}
        </div>
        {anime.genres && anime.genres.length > 0 && (
          <div className="card-genres">
            {anime.genres.slice(0, 2).map(genre => (
              <span key={genre.mal_id} className="genre-tag">
                {genre.name}
              </span>
            ))}
            {anime.genres.length > 2 && (
              <span className="genre-tag">+{anime.genres.length - 2}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default AnimeCard;