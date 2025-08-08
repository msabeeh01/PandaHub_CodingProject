import { ThemedText } from "@/components/ThemedText"
import { theme } from "@/utils/theme"
import { StyleSheet } from "react-native"

interface MovieTitleProps {
    movieTitle: string
}
const MovieTitle = ({movieTitle}: MovieTitleProps) => {
    // show Loading text while the movie is loading
    if (movieTitle === "") {
        return (
            <ThemedText style={styles.primaryText}>Loading...</ThemedText>
        )
    }
    return(
        <ThemedText style={styles.primaryText}>{movieTitle}</ThemedText>
    )
}

const styles = StyleSheet.create({
    primaryText: {
        color: theme.colors.text,
        fontSize: theme.typography.subheader.fontSize
    }
})

export default MovieTitle