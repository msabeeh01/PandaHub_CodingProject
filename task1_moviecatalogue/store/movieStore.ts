// store/movieStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { movieService } from "@/services/movie/movieService";
import { Movie, MovieCredits } from "@/types/domain";

// Separate loading and error states for better UX
interface AsyncState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

interface MovieState {
  // Selected movie
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
  
  // Cinema selection
  selectedCinemaId: number | null;
  setSelectedCinema: (cinemaId: number | null) => void;
  
  // Popular movies
  popularMovies: AsyncState<Movie[]>;
  fetchPopularMovies: () => Promise<void>;
  
  // Upcoming movies
  upcomingMovies: AsyncState<Movie[]>;
  fetchUpcomingMovies: () => Promise<void>;
  
  // Movie credits
  movieCredits: AsyncState<MovieCredits>;
  fetchMovieCredits: (movieId: number) => Promise<void>;
  
  // Clear errors
  clearErrors: () => void;
}

const initialAsyncState = <T>(data: T): AsyncState<T> => ({
  data,
  loading: false,
  error: null,
});

const useMovieStore = create<MovieState>()(
  devtools(
    persist(
      (set, get) => ({
        // Selected movie
        selectedMovie: null,
        setSelectedMovie: (movie) => set({ selectedMovie: movie }),
        
        // Cinema selection
        selectedCinemaId: null,
        setSelectedCinema: (cinemaId) => set({ selectedCinemaId: cinemaId }),
        
        // Popular movies
        popularMovies: initialAsyncState<Movie[]>([]),
        fetchPopularMovies: async () => {
          set(state => ({
            popularMovies: { ...state.popularMovies, loading: true, error: null }
          }));
          
          try {
            const movies = await movieService.getPopularMovies();
            set(state => ({
              popularMovies: { ...state.popularMovies, data: movies, loading: false }
            }));
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to fetch popular movies";
            set(state => ({
              popularMovies: { ...state.popularMovies, loading: false, error: errorMessage }
            }));
          }
        },
        
        // Upcoming movies
        upcomingMovies: initialAsyncState<Movie[]>([]),
        fetchUpcomingMovies: async () => {
          set(state => ({
            upcomingMovies: { ...state.upcomingMovies, loading: true, error: null }
          }));
          
          try {
            const movies = await movieService.getUpcomingMovies();
            set(state => ({
              upcomingMovies: { ...state.upcomingMovies, data: movies, loading: false }
            }));
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to fetch upcoming movies";
            set(state => ({
              upcomingMovies: { ...state.upcomingMovies, loading: false, error: errorMessage }
            }));
          }
        },
        
        // Movie credits
        movieCredits: initialAsyncState<MovieCredits>({ id: 0, cast: [], crew: [] }),
        fetchMovieCredits: async (movieId) => {
          set(state => ({
            movieCredits: { ...state.movieCredits, loading: true, error: null }
          }));
          
          try {
            const credits = await movieService.getMovieCredits(movieId);
            set(state => ({
              movieCredits: { ...state.movieCredits, data: credits, loading: false }
            }));
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to load movie credits";
            set(state => ({
              movieCredits: { ...state.movieCredits, loading: false, error: errorMessage }
            }));
          }
        },
        
        // Clear all errors
        clearErrors: () => {
          set(state => ({
            popularMovies: { ...state.popularMovies, error: null },
            upcomingMovies: { ...state.upcomingMovies, error: null },
            movieCredits: { ...state.movieCredits, error: null },
          }));
        },
      }),
      {
        name: "movie-store",
        // Only persist non-sensitive, static data
        partialize: (state) => ({
          selectedCinemaId: state.selectedCinemaId,
          selectedMovie: state.selectedMovie,
        }),
      }
    ),
    {
      name: "movie-store", // DevTools name
    }
  )
);

export default useMovieStore;

// Selectors for better component integration
export const usePopularMovies = () => useMovieStore(state => state.popularMovies);
export const useUpcomingMovies = () => useMovieStore(state => state.upcomingMovies);
export const useMovieCredits = () => useMovieStore(state => state.movieCredits);
export const useSelectedMovie = () => useMovieStore(state => state.selectedMovie);