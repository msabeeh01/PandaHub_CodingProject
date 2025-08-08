import { ThemedView } from "@/components/ThemedView";
import DirectorAvatar from "./DirectorAvatar";
import DirectorText from "./DirectorText";
import { StyleSheet } from "react-native";
import { theme } from "@/utils/theme";
import Trailer from "./Trailer";
import useMovieStore from "@/store/movieStore";
import { CastMember, CrewMember } from "@/types/movie";

interface DirectorProps {
  director: CrewMember | undefined ;
}

const Director = ({
  director
}: DirectorProps) => {
  return (
    <ThemedView style={styles.container}>
      <DirectorAvatar img={director?.profile_path}/>
      <ThemedView style={styles.directorContainer}>
        <DirectorText directorName={director?.name} />
        <Trailer />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  directorContainer:{
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    justifyContent: "space-between",
    flex: 1,
  }
});

export default Director;
