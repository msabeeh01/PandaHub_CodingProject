import { ThemedView } from "@/components/ThemedView";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import CinemaInfo from "./CinemaInfo";
import Subheader from "@/components/ui/Subheader";
import { theme } from "@/utils/theme";
import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import useMovieStore from "@/store/movieStore";

const cinemas = [
  { id: 1, name: "Cineplex - Yonge & Dundas" },
  { id: 2, name: "Scotiabank Theatre Toronto" },
  { id: 3, name: "TIFF Bell Lightbox" },
];

const Cinema = () => {
  const { selectedCinemaId, setSelectedCinema } = useMovieStore();

  const handleSelectCinema = (id: number) => {
    setSelectedCinema(id);
  };

  return (
    <ThemedView style={styles.container}>
      <Subheader subheading="Cinema" />
      {cinemas.map((cinema) => (
        <CinemaInfo
          key={cinema.id}
          id={cinema.id}
          name={cinema.name}
          isSelected={selectedCinemaId === cinema.id}
          onSelect={handleSelectCinema}
        />
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    gap: theme.spacing.md,
  },
});

export default Cinema;
