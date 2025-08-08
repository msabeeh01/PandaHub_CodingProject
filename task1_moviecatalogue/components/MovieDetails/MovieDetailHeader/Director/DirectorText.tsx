import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { theme } from "@/utils/theme";
import { StyleSheet } from "react-native";
import Trailer from "./Trailer";

interface DirectorProps {
  directorName: string | undefined;
} 

const DirectorText = ({ directorName }: DirectorProps) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.mutedText}>Director</ThemedText>
      <ThemedText style={styles.primaryText}>{directorName}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "column",
  },
  primaryText: {
    color: theme.colors.text,
  },
  mutedText: {
    color: theme.colors.muted,
    fontSize: theme.typography.muted.fontSize,
  },
});

export default DirectorText;
