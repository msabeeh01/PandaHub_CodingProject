import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
  Animated,
} from "react-native";
import { Link, router } from "expo-router";
import { Movie } from "@/types/movie";
import { theme } from "@/utils/theme";
import useMovieStore from "@/store/movieStore";

interface MovieCarouselProps {
  movies: Movie[];
  onMoviePress?: (movie: Movie) => void;
  showDots?: boolean;
  autoPlay?: boolean;
}

const { width: screenWidth } = Dimensions.get("window");
const CARD_WIDTH = screenWidth * 0.6;
const CARD_MARGIN = 40;

const MovieCarousel: React.FC<MovieCarouselProps> = ({
  movies,
  showDots = true,
  autoPlay = false,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);

  /**
   * Stores animated values for each card:
   * - rotation: tilt effect
   * - scale: zoom-in/out based on focus
   * - translateY: moves cards back to simulate depth
   */
  const animationValues = useRef(
    movies.map(() => ({
      rotation: new Animated.Value(0),
      scale: new Animated.Value(1),
      translateY: new Animated.Value(0),
    }))
  ).current;

  /**
   * Runs when activeIndex changes.
   * Animates each card based on its distance from the focused card.
   */
  useEffect(() => {
    const animations = animationValues.map((vals, index) => {
      const distance = index - activeIndex;
      const maxRotation = 15;
      const maxTranslateY = 15;
      const minScale = 0.9;

      const isActive = index === activeIndex;

      const targetRotation = isActive
        ? 0
        : distance > 0
        ? Math.min(distance * 8, maxRotation)
        : Math.max(distance * 8, -maxRotation);

      const targetScale = isActive ? 1 : minScale;
      const targetTranslateY = isActive ? 0 : maxTranslateY;

      // Animate all transforms in parallel for this card
      return Animated.parallel([
        Animated.timing(vals.rotation, {
          toValue: targetRotation,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(vals.scale, {
          toValue: targetScale,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(vals.translateY, {
          toValue: targetTranslateY,
          duration: 200,
          useNativeDriver: true,
        }),
      ]);
    });

    Animated.parallel(animations).start();
  }, [activeIndex]);

  /**
   * Updates activeIndex based on current scroll position.
   * Ensures animations sync with user scroll.
   */
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH + CARD_MARGIN));
    setActiveIndex(Math.max(0, Math.min(index, movies.length - 1)));
  };


  /**
   * Generates the animated style for a given card index
   * using its rotation, scale, and Y translation values.
   */
  const getCardStyle = (cardIndex: number) => {
    const animated = animationValues[cardIndex];
    if (!animated) return styles.card;

    const { rotation, scale, translateY } = animated;

    const rotateZ = rotation.interpolate({
      inputRange: [-15, 0, 15],
      outputRange: ["-15deg", "0deg", "15deg"],
      extrapolate: "clamp",
    });

    return [
      styles.card,
      {
        transform: [{ rotateZ }, { scale }, { translateY }],
      },
    ];
  };

  /**
   * Renders pagination dots below the carousel
   * to indicate the currently active card.
   */
  const renderDots = () => {
    if (!showDots) return null;

    return (
      <View style={styles.dotsContainer}>
        {movies.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    );
  };

  /**
   * Renders a single movie card with touch handling
   * and animated tilt/scale/depth effects.
   */
  const renderMovieCard = (movie: Movie, index: number) => {
    const {movie: activeMovie, setMovie} = useMovieStore();
    return (
      <Link
      onPress={() => setMovie(movie)}
        key={movie.id}
        style={styles.cardContainer}
        href={{
          pathname: "/movies/[id]",
          params: { id: movie.id},
        }}
      >
        <Animated.View style={getCardStyle(index)}>
          <Image source={{ uri: movie.image }} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.movieTitle} numberOfLines={1}>
              {movie.title}
            </Text>
            <Text style={styles.movieCategory}>{movie.category}</Text>
          </View>
        </Animated.View>
      </Link>
    );
  };

  if (!movies.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No movies available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + CARD_MARGIN}
        snapToAlignment="start"
        contentInset={{
          top: 0,
          left: (screenWidth - CARD_WIDTH) / 2,
          bottom: 0,
          right: (screenWidth - CARD_WIDTH) / 2,
        }}
        contentContainerStyle={{
          paddingTop: 15,
          paddingHorizontal:
            Platform.OS === "android" ? (screenWidth - CARD_WIDTH) / 2 : 0,
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {movies.map((movie, index) => renderMovieCard(movie, index))}
      </ScrollView>

      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginRight: CARD_MARGIN,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 15,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 320,
    resizeMode: "cover",
    borderRadius: 15,
  },
  cardContent: {
    padding: 15,
    alignItems: "center",
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 5,
    textAlign: "center",
  },
  movieCategory: {
    fontSize: 14,
    color: theme.colors.muted,
    textAlign: "center",
    marginBottom: 8,
  },
  ratingContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    fontSize: 12,
    fontWeight: "bold",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: theme.colors.primary,
    width: 24,
  },
  inactiveDot: {
    backgroundColor: theme.colors.muted,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },
  emptyText: {
    color: theme.colors.muted,
    fontSize: 16,
  },
});

export default MovieCarousel;
