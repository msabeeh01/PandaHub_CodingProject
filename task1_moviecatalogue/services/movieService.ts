import {
  Movie,
  TMDBGenresResponse,
  TMDBMovie,
  TMDBMoviesResponse,
} from "@/types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

class MovieService {
  private genreMap = new Map<number, string>();

  //fetches genres, and maps them to their IDs, useful when mapping genre_ids returned by popular movies
  private async fetchGenres() {
    if (this.genreMap.size > 0) return; // Already cached

    try {
      const response = await fetch(
        `${BASE_URL}/genre/movie/list?language=en`,
        options
      );
      const data: TMDBGenresResponse = await response.json();

      data.genres.forEach((genre) => {
        this.genreMap.set(genre.id, genre.name);
      });
    } catch (error) {
      console.error("Failed to fetch genres:", error);
    }
  }

  async getPopularMovies() {
    try {
      //fetch genres first, so that we can map genre_ids to their names
      await this.fetchGenres();
      const response = await fetch(
        `${BASE_URL}/movie/popular?language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      const data: TMDBMoviesResponse = await response.json();
      // once data is fetched, find the corresponding genre based on genre_ids for each movie fetched by popular movies
      const movies: Movie[] = data.results.map((movie) => {
        // Map genre_ids to genre names
        const genreNames = movie.genre_ids
          .map((id) => this.genreMap.get(id))
          .filter((name) => name !== undefined);

        return {
          id: movie.id,
          title: movie.title,
          category: genreNames.join(", "),
          image: `${IMAGE_BASE_URL}${movie.poster_path}`,
        };
      });
      return movies;
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      return [];
    }
  }
}

export const movieService = new MovieService();
