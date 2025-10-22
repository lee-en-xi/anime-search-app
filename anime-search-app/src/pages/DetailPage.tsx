import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Anime } from '../types/anime';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        setAnime(response.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch anime details');
        console.error('Error fetching anime details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAnimeDetails();
    }
  }, [id]);

  if (loading) return <div className="loading">Loading anime details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!anime) return <div className="error">Anime not found</div>;

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">← Back to Search</Link>
      
      <div className="anime-detail">
        <div className="anime-header">
          <img src={anime.images.jpg.large_image_url} alt={anime.title} className="anime-image" />
          <div className="anime-info">
            <h1>{anime.title}</h1>
            <div className="anime-stats">
              <div className="stat">
                <span className="label">Score:</span>
                <span className="value">{anime.score || 'N/A'}</span>
              </div>
              <div className="stat">
                <span className="label">Rank:</span>
                <span className="value">{anime.rank || 'N/A'}</span>
              </div>
              <div className="stat">
                <span className="label">Popularity:</span>
                <span className="value">{anime.popularity || 'N/A'}</span>
              </div>
              <div className="stat">
                <span className="label">Episodes:</span>
                <span className="value">{anime.episodes || 'N/A'}</span>
              </div>
              <div className="stat">
                <span className="label">Status:</span>
                <span className="value">{anime.status}</span>
              </div>
              <div className="stat">
                <span className="label">Rating:</span>
                <span className="value">{anime.rating}</span>
              </div>
            </div>
            <div className="genres">
              {anime.genres.map(genre => (
                <span key={genre.mal_id} className="genre-tag">{genre.name}</span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="anime-synopsis">
          <h2>Synopsis</h2>
          <p>{anime.synopsis || 'No synopsis available.'}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;