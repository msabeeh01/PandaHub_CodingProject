import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { theme } from "@/utils/theme";
import { StyleSheet } from "react-native";
interface CinemaTextProps {
  cinemaName?: string;
  cinemaAddress?: string;
}
const CinemaText = ({
  cinemaName = "Placeholder",
  cinemaAddress = "Placeholder",
}: CinemaTextProps) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.primaryText} type="subtitle">{cinemaName}</ThemedText>
      <ThemedText style={styles.mutedText} type="default">{cinemaAddress}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
  primaryText: {
    color: theme.colors.text
  },
  mutedText: {
    color: theme.colors.muted,
    fontSize: theme.typography.muted.fontSize
  }
});

export default CinemaText;
