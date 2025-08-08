import { StyleSheet } from "react-native"
import { ThemedText } from "../ThemedText"
import { ThemedView } from "../ThemedView"
import { theme } from "@/utils/theme"

interface MovieTextProps {
    movieTitle?: string,
    movieGenres?: string
}

const MovieText = ({movieTitle = "Placeholder", movieGenres = "Placeholder"}: MovieTextProps) => {
    return(
        <ThemedView style={styles.container}>
            <ThemedText numberOfLines={1} ellipsizeMode="tail" style={styles.primaryText}>{movieTitle}</ThemedText>
            <ThemedText numberOfLines={1} ellipsizeMode="tail" style={styles.mutedText}>{movieGenres}</ThemedText>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'transparent',
        gap: theme.spacing.xxs,

    },
    primaryText: {
        color: theme.colors.text
    },
    mutedText: {
        color: theme.colors.muted,
        fontSize: theme.typography.muted.fontSize
    }
})

export default MovieText