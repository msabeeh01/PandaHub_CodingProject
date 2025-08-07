import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { theme } from "@/utils/theme";

const WelcomeText = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.mutedText}>Welcome, User!</ThemedText>
      <ThemedText style={styles.bodyText}>Let's relax and watch a movie.</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  },
  mutedText: {
    color: theme.colors.muted,
    fontSize: theme.typography.muted.fontSize,
  },
  bodyText: {
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '500',
  }
});

export default WelcomeText;
