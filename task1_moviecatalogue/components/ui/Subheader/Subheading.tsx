import { ThemedText } from "@/components/ThemedText"
import { theme } from "@/utils/theme"
import { StyleSheet } from "react-native"

interface SubheadingProps {
    text: string
}

const Subheading = ({text}: SubheadingProps) => {
    return (
        <ThemedText style={styles.body}>
            {text}
        </ThemedText>
    )
}

const styles=  StyleSheet.create({
    body: {
        color: theme.typography.subheader.color,
        fontSize: theme.typography.subheader.fontSize,
        fontWeight: '500',
    },
})

export default Subheading