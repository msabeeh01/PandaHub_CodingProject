import { MovieRepository } from "./movieRepository";
import { Movie, MovieCredits, CastMember, CrewMember } from "@/types/domain";
import { TMDBClient } from "../api/tmdbClient";

export class MovieService {
  private repository = new MovieRepository();
  private client = TMDBClient.getInstance();
  private genreMap = new Map<number, string>();

  private async ensureGenresLoaded(): Promise<void> {
    if (this.genreMap.size > 0) return;

    try {
      const data = await this.repository.getGenres();
      data.genres.forEach((genre) => {
        this.genreMap.set(genre.id, genre.name);
      });
    } catch (error) {
      console.error("Failed to fetch genres:", error);
      throw new Error("Unable to load movie genres");
    }
  }

  private mapTMDBMovieToMovie = async (tmdbMovie: any): Promise<Movie> => {
    const genreNames = tmdbMovie.genre_ids
      .map((id: number) => this.genreMap.get(id))
      .filter((name?: string) => name !== undefined);

    // Fetch runtime separately - this could be optimized further
    let runtime: number | null = null;
    try {
      const details = await this.repository.getMovieDetails(tmdbMovie.id);
      runtime = details.runtime;
    } catch (error) {
      console.error(`Failed to fetch runtime for movie ${tmdbMovie.id}`);
    }

    return {
      id: tmdbMovie.id,
      title: tmdbMovie.title,
      category: genreNames.join(", "),
      image: this.client.getImageURL(tmdbMovie.poster_path),
      overview: tmdbMovie.overview || "No overview available",
      genre_ids: tmdbMovie.genre_ids,
      release_date: tmdbMovie.release_date || "TBA",
      runtime,
    };
  };

  async getPopularMovies(): Promise<Movie[]> {
    try {
      await this.ensureGenresLoaded();
      const data = await this.repository.getPopularMovies();
      
      return Promise.all(
        data.results.map(this.mapTMDBMovieToMovie)
      );
    } catch (error) {
      console.error("Failed to fetch popular movies:", error);
      throw error;
    }
  }

  async getUpcomingMovies(): Promise<Movie[]> {
    try {
      await this.ensureGenresLoaded();
      const data = await this.repository.getUpcomingMovies();
      
      return Promise.all(
        data.results.map(this.mapTMDBMovieToMovie)
      );
    } catch (error) {
      console.error("Failed to fetch upcoming movies:", error);
      throw error;
    }
  }

  async getMovieCredits(movieId: number): Promise<MovieCredits> {
    try {
      const data = await this.repository.getMovieCredits(movieId);

      const cast = data.cast.map((member: CastMember) => ({
        ...member,
        profile_path: member.profile_path
          ? this.client.getImageURL(member.profile_path)
          : null,
      }));

      const crew = data.crew.map((member: CrewMember) => ({
        ...member,
        profile_path: member.profile_path
          ? this.client.getImageURL(member.profile_path)
          : null,
      }));

      return {
        id: movieId,
        cast,
        crew,
      };
    } catch (error) {
      console.error(`Failed to fetch credits for movie ${movieId}:`, error);
      throw error;
    }
  }
}

export const movieService = new MovieService();