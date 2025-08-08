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
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  // get the movie details from store
  const {
    movie,
    fetchCredits,
    credit,
    creditLoading,
    creditError,
    selectedCinemaId,
  } = useMovieStore();

  useEffect(() => {
    if (id) {
      fetchCredits(id as unknown as number);
    }
  }, [id]);

  if (!movie) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </SafeAreaView>
    );
  }

  if (creditLoading || creditError) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </SafeAreaView>
    );
  }
  return (
    <ThemedView style={styles.container}>
      <ParallaxScrollView
        headerImage={
          <Image
            source={{ uri: movie?.image }}
            style={{ width: "100%", height: "100%" }}
          />
        }
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      >
        <ThemedView style={styles.pagePadded}>
          <MovieDetailHeader crew={credit.crew} />
          <Synopsis />
          <Cast data={credit} />
          <Cinema />
        </ThemedView>
      </ParallaxScrollView>
      {selectedCinemaId !== null && (
        <ThemedView
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: theme.spacing.md,
            backgroundColor: "transparent",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.primary,
              padding: theme.spacing.md,
              borderRadius: theme.radius.md,
              width: "100%",

            }}
          >
            <ThemedText>Book Now</ThemedText>
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
  pagePadded: {
    paddingHorizontal: theme.padding.page,
    backgroundColor: "transparent",
    gap: theme.spacing.md,
  },
});

export default MovieDetails;
