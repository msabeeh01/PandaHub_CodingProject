import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
  Animated,
} from "react-native";
import { theme } from "@/utils/theme";

interface PlaceholderCarouselProps {
  count?: number;
  showDots?: boolean;
}

const { width: screenWidth } = Dimensions.get("window");
const CARD_WIDTH = screenWidth * 0.6;
const CARD_MARGIN = 40;

const PlaceholderCarousel: React.FC<PlaceholderCarouselProps> = ({
  count = 5,
  showDots = true,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Create placeholder data
  const placeholderData = Array.from({ length: count }, (_, index) => ({
    id: `placeholder-${index}`,
  }));

  /**
   * Stores animated values for each card:
   * - rotation: tilt effect
   * - scale: zoom-in/out based on focus
   * - translateY: moves cards back to simulate depth
   */
  const animationValues = useRef(
    placeholderData.map(() => ({
      rotation: new Animated.Value(0),
      scale: new Animated.Value(1),
      translateY: new Animated.Value(0),
    }))
  ).current;

  /**
   * Shimmer animation for placeholder cards
   */
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    shimmer.start();
    return () => shimmer.stop();
  }, [shimmerAnimation]);

  const shimmerOpacity = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

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
    setActiveIndex(Math.max(0, Math.min(index, placeholderData.length - 1)));
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
        {placeholderData.map((_, index) => (
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
   * Renders a single placeholder card with shimmer animation
   */
  const renderPlaceholderCard = (item: { id: string }, index: number) => {
    return (
      <View key={item.id} style={styles.cardContainer}>
        <Animated.View style={getCardStyle(index)}>
          <Animated.View 
            style={[
              styles.placeholderImage,
              { opacity: shimmerOpacity }
            ]} 
          />
          <View style={styles.cardContent}>
            <Animated.View 
              style={[
                styles.placeholderTitle,
                { opacity: shimmerOpacity }
              ]} 
            />
            <Animated.View 
              style={[
                styles.placeholderCategory,
                { opacity: shimmerOpacity }
              ]} 
            />
          </View>
        </Animated.View>
      </View>
    );
  };

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
        {placeholderData.map((item, index) => renderPlaceholderCard(item, index))}
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
  cardContent: {
    padding: 15,
    alignItems: "center",
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
  // Placeholder-specific styles
  placeholderImage: {
    width: "100%",
    height: 320,
    backgroundColor: theme.colors.muted,
    borderRadius: 15,
  },
  placeholderTitle: {
    width: "80%",
    height: 20,
    backgroundColor: theme.colors.muted,
    borderRadius: 4,
    marginBottom: 8,
  },
  placeholderCategory: {
    width: "60%",
    height: 16,
    backgroundColor: theme.colors.muted,
    borderRadius: 4,
  },
});

export default PlaceholderCarousel;