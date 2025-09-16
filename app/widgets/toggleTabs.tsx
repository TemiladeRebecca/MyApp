import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../themes/themeContext";

interface ToggleTabsProps {
  width?: number;
}

const ToggleTabs: React.FC<ToggleTabsProps> = ({ width }) => {
  const screenWidth = useWindowDimensions().width;
  const tabWidth = (width ?? screenWidth) / 2;

  const [selectedTab, setSelectedTab] = useState(0);
  const translateX = React.useRef(new Animated.Value(0)).current;

  const { mode } = useTheme();

  const handleTabPress = (index: number) => {
    setSelectedTab(index);
    Animated.timing(translateX, {
      toValue: index === 0 ? 0 : tabWidth,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const textColor = mode === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)";
  const activeTextColor = mode === "dark" ? "#fff" : "#000";
  const dividerColor = mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)";

  return (
    <View style={{ width: width ?? screenWidth }}>
      {/* Row of tab labels */}
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleTabPress(0)}>
          <Text style={[styles.tabText, { color: textColor }, selectedTab === 0 && { color: activeTextColor }]}>
            Smart Script
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress(1)}>
          <Text style={[styles.tabText, { color: textColor }, selectedTab === 1 && { color: activeTextColor }]}>
            Advanced Script
          </Text>
        </TouchableOpacity>
      </View>

      {/* Divider + moving gradient */}
      <View style={styles.dividerContainer}>
        <View style={[styles.divider, { backgroundColor: dividerColor }]} />
        <Animated.View
          style={[
            styles.indicatorWrapper,
            { transform: [{ translateX }] },
            { width: tabWidth },
          ]}
        >
          <LinearGradient
            colors={["blue", "purple"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradientBar}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 6,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
  },
  dividerContainer: {
    position: "relative",
    height: 8,
    justifyContent: "flex-end",
  },
  divider: {
    height: 1,
  },
  indicatorWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  gradientBar: {
    height: 3,
    borderRadius: 2,
  },
});

export default ToggleTabs;
