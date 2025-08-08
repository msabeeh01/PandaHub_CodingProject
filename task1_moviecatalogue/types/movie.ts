export interface CastMember {
      adult: boolean,
      gender: number,
      id: number,
      known_for_department: string,
      name: string,
      original_name: string,
      popularity: number,
      profile_path: string | null,
      cast_id: number,
      character: string,
      credit_id: string,
      order: number
}

export interface CrewMember {
      adult: boolean,
      gender: number,
      id: number,
      known_for_department: string,
      name: string,
      original_name: string,
      popularity: number,
      profile_path: string | null,
      credit_id: string,
      department: string,
      job: string
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface Movie {
  id: number;
  title: string;
  category: string;
  image: string;
  overview: string;
  genre_ids: number[];
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
  overview?: string; // Optional field for overview
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
