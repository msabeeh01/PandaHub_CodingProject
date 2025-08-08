import { ThemedView } from "@/components/ThemedView"
import Input from "./Input"
import { StyleSheet } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { theme } from "@/utils/theme"
import Subheader from "../Subheader"

const SearchBar = () => {
    return(
        <ThemedView style={styles.container}>
            <AntDesign name="search1" size={24} color="white" />
            <Input />

        </ThemedView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.sm,
        paddingHorizontal: theme.padding.md,
        gap: theme.spacing.sm,
    }
})

export default SearchBar