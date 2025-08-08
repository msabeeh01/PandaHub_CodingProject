import { ThemedText } from "@/components/ThemedText";
import { theme } from "@/utils/theme";
import { StyleSheet } from "react-native";
type MovieSubtitleProps = {
    text: string
};
const MovieSubtitle = ({text}: MovieSubtitleProps) => {
    return <ThemedText numberOfLines={2} ellipsizeMode="tail" style={styles.mutedText}>{text}</ThemedText>;
};

const styles = StyleSheet.create({
    mutedText: {
        color: theme.colors.muted,
        fontSize: theme.typography.muted.fontSize
    }
});

export default MovieSubtitle;