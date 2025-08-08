import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { theme } from "@/utils/theme";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Trailer = () => {
  return (
    <ThemedView style={styles.container}>
      <Ionicons name="play" size={theme.typography.body.fontSize} color={theme.colors.text} />
      <ThemedText style={styles.primaryText}>Watch Trailer</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#232323",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
    gap: theme.spacing.sm
  },
  primaryText: {
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
  },
});

export default Trailer;
