import { ThemedView } from "@/components/ThemedView";
import DirectorAvatar from "../../MovieDetailHeader/Director/DirectorAvatar";
import { StyleSheet } from "react-native";
import { theme } from "@/utils/theme";
import CastCardText from "./CastCardText";
import { CastMember } from "@/types/movie";

interface CastCardProps {
  item: CastMember
}

const CastCard = ({item}: CastCardProps) => {
  return (
    <ThemedView style={styles.container}>
      <DirectorAvatar img={item.profile_path}/>
      <CastCardText text={item.name} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.card,
        padding: theme.spacing.sm,
        borderRadius: theme.radius.md,
        width: 150,
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.sm,

    }
})

export default CastCard;
