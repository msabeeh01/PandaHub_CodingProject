import { ThemedText } from "@/components/ThemedText";
import { theme } from "@/utils/theme";
import { StyleSheet } from "react-native";

const SynopsisText = ({ text }: { text: string }) => {
    return <ThemedText numberOfLines={2} style={styles.mutedText} type="default">{text}</ThemedText>
};

const styles = StyleSheet.create({
    mutedText: {
        fontSize: theme.typography.muted.fontSize,
        color: theme.colors.muted,
        lineHeight: 18
    }
});

export default SynopsisText