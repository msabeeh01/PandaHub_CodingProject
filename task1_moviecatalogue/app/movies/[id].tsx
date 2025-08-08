import Cast from "@/components/MovieDetails/Cast";
import Cinema from "@/components/MovieDetails/Cinema";
import MovieDetailHeader from "@/components/MovieDetails/MovieDetailHeader";
import Synopsis from "@/components/MovieDetails/Synopsis";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useMovieStore from "@/store/movieStore";
import { theme } from "@/utils/theme";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  // Get store state - adjust based on your actual store structure
  const {
    selectedMovie,
    fetchMovieCredits,
    movieCredits, // Assuming this is AsyncState<MovieCredits>
    selectedCinemaId,
  } = useMovieStore();

  useEffect(() => {
    // Validate and convert id
    if (!id) return;
    
    const movieId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id as string);
    
    if (isNaN(movieId)) {
      Alert.alert("Error", "Invalid movie ID");
      router.back();
      return;
    }

    fetchMovieCredits(movieId);
  }, [id, fetchMovieCredits]);

  // Loading state for invalid ID
  if (!id) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ThemedText style={styles.errorText}>Invalid movie ID</ThemedText>
      </SafeAreaView>
    );
  }

  // Loading state for missing movie
  if (!selectedMovie) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <ThemedText style={styles.loadingText}>Loading movie details...</ThemedText>
      </SafeAreaView>
    );
  }

  // Loading state for credits
  if (movieCredits.loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <ThemedText style={styles.loadingText}>Loading cast information...</ThemedText>
      </SafeAreaView>
    );
  }

  // Error state for credits
  if (movieCredits.error) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ThemedText style={styles.errorText}>
          Failed to load movie details
        </ThemedText>
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={() => {
            const movieId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id as string);
            fetchMovieCredits(movieId);
          }}
        >
          <ThemedText style={styles.retryButtonText}>Retry</ThemedText>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleBookNow = () => {
    if (selectedCinemaId) {
      // Navigate to booking screen or handle booking logic
      Alert.alert("Booking", `Booking movie at cinema ${selectedCinemaId}`);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ParallaxScrollView
        headerImage={
          <Image
            source={{ uri: selectedMovie.image }}
            style={styles.headerImage}
            contentFit="cover"
          />
        }
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      >
        <ThemedView style={styles.pagePadded}>
          <MovieDetailHeader 
            crew={movieCredits.data.crew} 
          />
          <Synopsis text={selectedMovie.overview} />
          <Cast data={movieCredits.data} />
          <Cinema />
        </ThemedView>
      </ParallaxScrollView>
      
      {selectedCinemaId !== null && (
        <ThemedView style={styles.bookingContainer}>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={handleBookNow}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.bookButtonText}>Book Now</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
  },
  pagePadded: {
    paddingHorizontal: theme.padding.page,
    backgroundColor: "transparent",
    gap: theme.spacing.md,
  },
  headerImage: {
    width: "100%", 
    height: "100%"
  },
  loadingText: {
    marginTop: theme.spacing.sm,
    color: theme.colors.muted,
    textAlign: 'center',
  },
  errorText: {
    color: theme.colors.primary,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: theme.spacing.md,
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bookingContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: theme.spacing.md,
    backgroundColor: "transparent",
  },
  bookButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    width: "100%",
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MovieDetails;