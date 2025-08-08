import { movieService } from "@/services/movieService";
import { CastMember, Movie, MovieCredits } from "@/types/movie";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface MovieState {
  movie: Movie | null;
  setMovie: (movie: Movie) => void;

  credit: MovieCredits;
  creditLoading: boolean;
  creditError: string | null;
  fetchCredits: (movieId: number) => Promise<void>;

  upcomingMovies: Movie[];
  fetchUpcomingMovies: () => Promise<void>;

  setSelectedCinema: (cinemaId: number) => void;
  selectedCinemaId: number | null;
}

const useMovieStore = create<MovieState>()(
  devtools(
    persist(
      (set) => ({
        movie: null,
        setMovie: (movie: Movie) => set({ movie }),

        selectedCinemaId: null,
        setSelectedCinema: (cinemaId) => set({ selectedCinemaId: cinemaId }),

        upcomingMovies: [],
        fetchUpcomingMovies: async () => {
          try {
            const movies = await movieService.getUpcomingMovies();
            set({ upcomingMovies: movies });
          } catch (error) {
            console.error("Failed to fetch upcoming movies:", error);
          }
        },

        credit: { id: 0, cast: [], crew: [] },
        creditLoading: false,
        creditError: null,
        fetchCredits: async (movieId) => {
          try {
            set({ creditLoading: true, creditError: null });
            const castData = await movieService.getMovieCredits(movieId);
            set({ credit: castData, creditLoading: false });
          } catch {
            set({ creditError: "Failed to load cast", creditLoading: false });
          }
        },
      }),
      {
        name: "movie-store",
      }
    )
  )
);

export default useMovieStore;
