import React from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  View,
} from "react-native";

type CustomButtonProps = {
  text: string;
  imagePath: string;
  onPress: () => void;
  marginVertical?: number;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  imagePath,
  onPress,
  marginVertical = 8,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { marginVertical }]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Image source={{ uri: imagePath }} style={styles.icon} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 60,
    backgroundColor: "#333",
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
    resizeMode: "contain",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CustomButton;
