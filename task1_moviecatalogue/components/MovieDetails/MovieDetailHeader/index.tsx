import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import MovieTitle from "./MovieTitle";
import MovieSubtitle from "./MovieSubtitle";
import { theme } from "@/utils/theme";
import { StyleSheet } from "react-native";
import Director from "./Director";
import Subheader from "@/components/ui/Subheader";
import { CastMember, CrewMember } from "@/types/movie";
import { useEffect } from "react";
import useMovieStore from "@/store/movieStore";

type MovieDetailHeaderProps = {
  crew: CrewMember[] | undefined
};

const MovieDetailHeader = (
  {crew}: MovieDetailHeaderProps
) => {
  const {movie} = useMovieStore();
  //find director should only work if crew is available
  const findDirector = (crew: CrewMember[]) => {
    return crew.find((member) => member.job === "Director");
  }

    const director = crew && Array.isArray(crew) ? findDirector(crew) : undefined;
  return (
    <ThemedView style={styles.container}>
      <MovieTitle movieTitle={movie?.title || "Loading"} />
      <MovieSubtitle text={movie?.overview || "Loading"} />
      <Director director={director}/>
    </ThemedView>
  );
};

const styles= StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    gap: theme.spacing.sm
  }
});

export default MovieDetailHeader;
