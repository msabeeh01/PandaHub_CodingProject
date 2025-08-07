import { ThemedView } from "@/components/ThemedView"
import { StyleSheet } from "react-native"
import { theme } from "@/utils/theme"

const Avatar = () => {
    return(
        <ThemedView style={styles.container}>
            
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: theme.radius.sm,
        backgroundColor: theme.colors.card,
        height: 40,
        width: 40
    }
})

export default Avatar