import { ThemedView } from "@/components/ThemedView";
import Avatar from "./Avatar";
import WelcomeText from "./WelcomeText";
import { StyleSheet } from "react-native";
import { theme } from "@/utils/theme";

const Greeting = () => {
  return (
    <ThemedView style={styles.container}>
      <WelcomeText />
      <Avatar />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});

export default Greeting;
