import { ThemedText } from "@/components/ThemedText"
import { theme } from "@/utils/theme"
import { StyleSheet } from "react-native"

interface RedirectProps {
    text: string
}

const Redirect = ({text}: RedirectProps) => {
    return (
        <ThemedText style={styles.body}>
            {text}
        </ThemedText>
    )
}

const styles=  StyleSheet.create({
    body: {
        color: theme.typography.redirect.color,
        fontSize: theme.typography.redirect.fontSize
    },
})

export default Redirect