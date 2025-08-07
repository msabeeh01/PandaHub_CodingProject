export interface Movie {
  id: number;
  title: string;
  category: string;
  image: string;
}

interface Genre {
  id: number;
  name: string;
}

export interface TMDBGenresResponse {
  genres: Genre[];
}

export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
}

export interface TMDBMoviesResponse {
  results: TMDBMovie[];
}

export interface CarouselProps {
  movies: Movie[];
  onMoviePress?: (movie: Movie) => void;
  autoPlay?: boolean;
  showDots?: boolean;
}
