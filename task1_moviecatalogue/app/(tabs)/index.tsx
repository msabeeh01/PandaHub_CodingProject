import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Greeting from "@/components/ui/Greeting";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/utils/theme";
import SearchBar from "@/components/ui/SearchBar";
import Subheader from "@/components/ui/Subheader";
import MovieCarousel from "@/components/MovieCarousel";
import { Movie } from "@/types/movie";
import { useMovies } from "@/hooks/useMovies";


export default function HomeScreen() {
  const { movies, loading, error } = useMovies();
  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.pagePadded}>
        <Greeting />
        <SearchBar />
        <Subheader subheading="Upcoming Movies" redirect="See all" />
      </ThemedView>

      {loading && <ThemedText>Loading movies...</ThemedText>}
      {error && <ThemedText>Failed to load movies</ThemedText>}

      {/* Carousel */}
      {/* only show the carousel if there are movies */}
      {movies.length > 0 && (
        <MovieCarousel movies={movies} />
      )}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  pagePadded: {
    paddingHorizontal: theme.padding.page,
    backgroundColor: "transparent",
  },
});
