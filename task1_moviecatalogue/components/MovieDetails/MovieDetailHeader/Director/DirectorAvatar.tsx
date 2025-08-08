import { ThemedView } from "@/components/ThemedView";
import { theme } from "@/utils/theme";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
type DirectorAvatarProps = {
  img?: string | null;
};
const DirectorAvatar = ({ img }: DirectorAvatarProps) => {
  return (
    <ThemedView style={styles.container}>
      {img && <Image source={{ uri: img }} style={{ width: "100%", height: "100%" }} />}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.muted,
    height: 45,
    width: 45,
    borderRadius: theme.radius.sm,
    overflow: "hidden",
  },
});

export default DirectorAvatar;
