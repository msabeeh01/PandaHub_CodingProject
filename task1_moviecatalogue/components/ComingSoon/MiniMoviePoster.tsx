import { Image } from "expo-image"
import { ThemedView } from "../ThemedView"
import { ActivityIndicator, StyleSheet } from "react-native"
import { theme } from "@/utils/theme"

interface MiniMoviePosterProps {
    src?: string
}

const MiniMoviePoster = ({src}: MiniMoviePosterProps) => {
    // if src is not provided, return activity indicator
    if (!src) {
        return(
            <ThemedView style={styles.container}>
                <ActivityIndicator color={theme.colors.primary}/>           
            </ThemedView>
        )
    }

    return(
        <ThemedView style={styles.container}>
            <Image source={{uri: src}} style={{width: "100%", height: "100%"}}/>
        </ThemedView>
    )
}

const styles=  StyleSheet.create({
    container: {
        backgroundColor: theme.colors.muted,
        justifyContent: "center",
        width: 60,
        height: 60,
        borderRadius: theme.radius.sm
    }
})

export default MiniMoviePoster