import { StyleSheet, ActivityIndicator } from "react-native"
import { ThemedText } from "../ThemedText"
import { ThemedView } from "../ThemedView"
import MovieText from "./MovieText"
import MiniMoviePoster from "./MiniMoviePoster"
import { theme } from "@/utils/theme"
import useMovieStore from "@/store/movieStore"
import { useEffect } from "react"
import { Movie } from "@/types/domain"

const ComingSoon = () => {
    const {
        fetchUpcomingMovies,
        upcomingMovies // This is now AsyncState<Movie[]>
    } = useMovieStore();

    useEffect(() => {
        fetchUpcomingMovies();
    }, [fetchUpcomingMovies]);

    // Handle loading state
    if (upcomingMovies.loading) {
        return (
            <ThemedView style={styles.centerContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <ThemedText style={styles.loadingText}>Loading upcoming movies...</ThemedText>
            </ThemedView>
        );
    }

    // Handle error state
    if (upcomingMovies.error) {
        return (
            <ThemedView style={styles.centerContainer}>
                <ThemedText style={styles.errorText}>
                    {upcomingMovies.error}
                </ThemedText>
            </ThemedView>
        );
    }

    // Handle empty state
    if (upcomingMovies.data.length === 0) {
        return (
            <ThemedView style={styles.centerContainer}>
                <ThemedText style={styles.emptyText}>
                    No upcoming movies found
                </ThemedText>
            </ThemedView>
        );
    }

    // Render the movies
    return (
        <ThemedView style={styles.parentContainer}>
            {upcomingMovies.data.map((movie: Movie) => (
                <ThemedView key={movie.id} style={styles.container}>
                    <MiniMoviePoster src={movie.image} />
                    <MovieText movieTitle={movie.title} movieGenres={movie.category} />
                </ThemedView>
            ))}
        </ThemedView>
    );
};

const styles = StyleSheet.create({
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
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.background
    },
    loadingText: {
        marginTop: theme.spacing.sm,
        color: theme.colors.muted
    },
    errorText: {
        color: theme.colors.primary,
        textAlign: 'center'
    },
    emptyText: {
        color: theme.colors.muted,
        textAlign: 'center'
    }
});

export default ComingSoon;