import { ThemedView } from "@/components/ThemedView";
import Subheading from "./Subheading";
import Redirect from "./Redirect";
import { StyleSheet } from "react-native";

interface SubheaderProps {
    subheading: string,
    redirect?: string
}

const Subheader = ({subheading, redirect}: SubheaderProps) => {
    return(
        <ThemedView style={styles.container}>
            <Subheading text={subheading}/>
            {redirect && <Redirect text={redirect}/>}
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
})

export default Subheader;