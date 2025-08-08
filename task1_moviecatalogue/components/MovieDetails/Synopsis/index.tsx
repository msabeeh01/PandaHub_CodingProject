import { ThemedView } from "@/components/ThemedView";
import Subheader from "@/components/ui/Subheader";
import { StyleSheet } from "react-native";
import SynopsisText from "./SynopsisText";
import { theme } from "@/utils/theme";

type SynopsisProps = {
  text: string;
};

const Synopsis = ({text}: SynopsisProps) => {
  return (
    <ThemedView style={styles.container}>
      <Subheader subheading="Synopsis" />
      <SynopsisText text={text} />
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
