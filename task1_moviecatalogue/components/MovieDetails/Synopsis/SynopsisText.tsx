import { ThemedText } from "@/components/ThemedText";
import { theme } from "@/utils/theme";
import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

interface SynopsisTextProps {
  text: string;
  numberOfLines?: number;
}

const SynopsisText = ({ 
  text, 
  numberOfLines = 2
}: SynopsisTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [truncatedText, setTruncatedText] = useState(text);

  const onTextLayout = (event: any) => {
    const { lines } = event.nativeEvent;
    if (lines.length > numberOfLines && !showReadMore) {
      setShowReadMore(true);
      // Calculate approximate truncation point to fit "... Read More"
      const avgCharsPerLine = text.length / lines.length;
      const maxChars = Math.floor(avgCharsPerLine * numberOfLines);
      const truncateAt = Math.max(maxChars - 15, maxChars * 0.8); // Leave space for "... Read More"
      
      // Find the last space before truncation point for clean word break
      let truncateIndex = Math.floor(truncateAt);
      while (truncateIndex > 0 && text[truncateIndex] !== ' ') {
        truncateIndex--;
      }
      
      setTruncatedText(text.slice(0, truncateIndex));
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // If expanded, show full text with inline "Read Less"
  if (isExpanded) {
    return (
      <Text style={styles.mutedText}>
        {text}
        <Text style={styles.readMoreText} onPress={toggleExpanded}>
          {' '}Read Less
        </Text>
      </Text>
    );
  }

  // If collapsed and needs truncation, show truncated text with inline "Read More"
  if (showReadMore) {
    return (
      <Text style={styles.mutedText}>
        {truncatedText}
        <Text style={styles.readMoreText} onPress={toggleExpanded}>
          ... Read More
        </Text>
      </Text>
    );
  }

  // Default state - detect if text needs truncation
  return (
    <ThemedText
      numberOfLines={numberOfLines}
      style={styles.mutedText}
      type="default"
      onTextLayout={onTextLayout}
    >
      {text}
    </ThemedText>
  );
};

const styles = StyleSheet.create({
  mutedText: {
    fontSize: theme.typography.muted.fontSize,
    color: theme.colors.muted,
    lineHeight: 18,
  },
  readMoreText: {
    fontSize: theme.typography.muted.fontSize,
    color: theme.colors.primary,
    fontWeight: '600',
  },
});

export default SynopsisText;