import { useState, useEffect } from 'react';
import { movieService } from '@/services/movie/movieService';
import { Movie } from '@/types/domain';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await movieService.getPopularMovies();
        setMovies(data);
      } catch (err) {
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  return { movies, loading, error };
};