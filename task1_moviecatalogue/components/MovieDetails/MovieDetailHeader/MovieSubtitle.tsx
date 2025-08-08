import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { formatRuntime } from "@/utils/formatRuntime";
import { theme } from "@/utils/theme";
import { StyleSheet } from "react-native";
type MovieSubtitleProps = {
  runtime: number;
  releaseDate: string;
  genres: string;
};
const MovieSubtitle = ({
  runtime,
  releaseDate = "Placeholder",
  genres = "Placeholder",
}: MovieSubtitleProps) => {
  // convert runtime to proper format
  const formattedRuntime = formatRuntime(runtime);
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.mutedText}>2021</ThemedText>
      <ThemedView style={styles.dot} />
      <ThemedText style={styles.mutedText}>Adventure</ThemedText>
      <ThemedView style={styles.dot} />
      <ThemedText style={styles.mutedText}>2h 28m</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "transparent"
    },
  mutedText: {
    color: theme.colors.muted,
    fontSize: theme.typography.muted.fontSize,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#888",
    marginHorizontal: 8,
  },
});

export default MovieSubtitle;
