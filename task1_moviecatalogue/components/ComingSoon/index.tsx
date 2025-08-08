import { StyleSheet } from "react-native"
import { ThemedText } from "../ThemedText"
import { ThemedView } from "../ThemedView"
import MovieText from "./MovieText"
import MiniMoviePoster from "./MiniMoviePoster"
import { theme } from "@/utils/theme"
import useMovieStore from "@/store/movieStore"
import { useEffect } from "react"
import { Movie } from "@/types/movie"

const ComingSoon = () => {
    // fetch upcoming movies here!
    const {
        fetchUpcomingMovies,
        upcomingMovies
    } = useMovieStore();

    useEffect(() => {
        fetchUpcomingMovies();
    }, []);

    //get the movie genres

    return(
        <ThemedView style={styles.parentContainer}>
            {upcomingMovies.map((movie: Movie) => (
                <ThemedView key={movie.id} style={styles.container}>
                    <MiniMoviePoster src={movie.image} />
                    <MovieText movieTitle={movie.title} movieGenres={movie.category} />
                </ThemedView>
            ))}
        </ThemedView>
    )
}

const styles= StyleSheet.create({
    parentContainer: {
        gap: theme.spacing.sm,
        backgroundColor: theme.colors.background
    },
    container: {
        backgroundColor: theme.colors.card,
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        padding: theme.spacing.sm,
        borderRadius: theme.radius.sm,
        overflow: 'hidden'
    }
})

export default ComingSoon