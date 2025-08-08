import { ThemedView } from "@/components/ThemedView";
import Subheader from "@/components/ui/Subheader";
import { StyleSheet } from "react-native";
import SynopsisText from "./SynopsisText";
import { theme } from "@/utils/theme";

const Synopsis = () => {
  return (
    <ThemedView style={styles.container}>
      <Subheader subheading="Synopsis" />
      <SynopsisText text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. asdddddddddddddddddddddddd" />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    gap: theme.spacing.md,
  },
});

export default Synopsis;
