import { ThemedView } from "@/components/ThemedView";
import { ScrollView, StyleSheet } from "react-native";
import CastCard from "./CastCard";
import { CastMember, MovieCredits } from "@/types/movie";
import { theme } from "@/utils/theme";

type CastProps = {
  data: MovieCredits;
};

const Cast = ({ data }: CastProps) => {
  return (
    <ScrollView contentContainerStyle={styles.container} horizontal>
      {data?.cast.map((item, index) => (
        <CastCard item={item} key={index} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    gap: theme.spacing.md,
  },
});

export default Cast;
