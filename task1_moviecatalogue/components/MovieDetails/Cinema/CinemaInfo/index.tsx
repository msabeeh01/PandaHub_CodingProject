import { ThemedView } from "@/components/ThemedView";
import CinemaText from "./CinemaText";
import { StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "@/utils/theme";
import useMovieStore from "@/store/movieStore";

// Define props for the component
type CinemaInfoProps = {
    id: number;
    name: string;
    isSelected: boolean;
    onSelect: (id: number) => void;
};

const CinemaInfo = ({ id, name, isSelected, onSelect }: CinemaInfoProps) => {
    // You no longer need local state here

    const { movie: activeMovie, setMovie } = useMovieStore();

    // The onPress handler now calls the onSelect function from the parent
    return (
        <TouchableOpacity
            onPress={() => onSelect(id)}
            style={[
                styles.container,
                isSelected ? styles.selected : styles.unselected,
            ]}
        >
            {/* The name prop can be passed to CinemaText */}
            <CinemaText cinemaName={name} />
            <ThemedView style={{ backgroundColor: theme.colors.primary, height: 20, width: 30, borderRadius: theme.radius.sm }} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    selected: {
        backgroundColor: theme.colors.primaryHighlight,
        borderColor: theme.colors.primary,
        borderWidth: 1,
    },
    unselected: {
        backgroundColor: theme.colors.card,
    },
});

export default CinemaInfo;