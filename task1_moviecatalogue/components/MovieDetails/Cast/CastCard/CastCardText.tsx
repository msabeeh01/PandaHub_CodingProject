import { ThemedText } from "@/components/ThemedText";
import { theme } from "@/utils/theme";
import { StyleSheet } from "react-native";

const CastCardText = ({ text }: { text: string }) => {
    return <ThemedText ellipsizeMode="tail" numberOfLines={2} style={styles.text}>{text}</ThemedText>;
};

const styles = StyleSheet.create({
    text: {
        color: theme.colors.text,
        fontSize: theme.typography.body.fontSize,
        flexShrink: 1,
        flexWrap: "wrap"
    },
});

export default CastCardText