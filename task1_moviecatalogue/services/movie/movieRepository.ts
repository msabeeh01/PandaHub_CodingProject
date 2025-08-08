import { TMDBClient } from "../api/tmdbClient";
import { 
  MovieDetails, 
  MovieCredits 
} from "@/types/domain";

import { TMDBMoviesResponse, TMDBGenresResponse } from "@/types/api";

export class MovieRepository {
  private client = TMDBClient.getInstance();

  async getPopularMovies(): Promise<TMDBMoviesResponse> {
    return this.client.get<TMDBMoviesResponse>("/movie/popular?language=en-US&page=1");
  }

  async getUpcomingMovies(): Promise<TMDBMoviesResponse> {
    return this.client.get<TMDBMoviesResponse>("/movie/upcoming?language=en-US&page=1");
  }

  async getGenres(): Promise<TMDBGenresResponse> {
    return this.client.get<TMDBGenresResponse>("/genre/movie/list?language=en");
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.client.get<MovieDetails>(`/movie/${movieId}?language=en-US`);
  }

  async getMovieCredits(movieId: number): Promise<MovieCredits> {
    return this.client.get<MovieCredits>(`/movie/${movieId}/credits?language=en-US`);
  }
}
