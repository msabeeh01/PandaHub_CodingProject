import { theme } from "@/utils/theme"
import { StyleSheet, TextInput } from "react-native"

const Input = () => {
    return(
        <TextInput style={styles.input} placeholderTextColor={theme.colors.muted} placeholder="Search movie, cinema, genre..."/>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'transparent',
        color: theme.colors.muted
    }
})


export default Input