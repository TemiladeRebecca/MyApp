import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ToggleTabs from "./widgets/toggleTabs";
import CustomButton from "./custom/customButton";
import { sampleImages } from "../data/sampleImages";
import BaseScreen from "./widgets/basescreen";
import { useTheme } from "../themes/themeContext";


const { width: screenWidth } = Dimensions.get("window");

type ThemeMode = "light" | "dark";

const HomeScreen: React.FC = () => {
  const { mode, setMode } = useTheme();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  // Toggle between light/dark mode
  const handleToggle = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  // Dynamic styles based on current theme
  const styles = getStyles(mode);

  return (
    <BaseScreen scrollable padding={20} backgroundColor={mode === "dark" ? "#000" : "#fff"} 
      appBar={
        <SafeAreaView>
          <View style={[styles.appBar, { marginHorizontal: 20, marginTop: 28 }]}>
            <TouchableOpacity onPress={() => Alert.alert("Close pressed")}>
              <Ionicons name="close" size={32} color={mode === "dark" ? "#fff" : "#000"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggle}>
              <Ionicons
                name={mode === "dark" ? "moon" : "sunny"}
                size={28}
                color={mode === "dark" ? "#fff" : "#000"}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      }
    >
      {/* Toggle Tabs */}
      <ToggleTabs width={screenWidth} />

      {/* Heading */}
      <Text style={styles.heading}>
        What type of posters do you want to create?
      </Text>

      {/* Image Selector */}
      <View style={styles.imageScroll}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sampleImages.map((item) => {
            const isSelected = selectedId === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelectedId(item.id)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.imageCard,
                    {
                      borderColor: isSelected ? "#FFF" : styles.imageCard.borderColor,
                      transform: [{ scale: isSelected ? 1.1 : 1 }],
                    },
                  ]}
                >
                  <Image source={{ uri: item.imageUrl }} style={styles.image} />
                  <View style={styles.imageOverlay}>
                    <Text style={styles.imageText}>{item.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Description Box */}
      {selectedId && (
        <View style={styles.descriptionBox}>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Add description..."
            placeholderTextColor={mode === "dark" ? "#aaa" : "#888"}
            multiline
            style={styles.textInput}
          />
          <TouchableOpacity
            style={styles.uploadIcon}
            onPress={() => Alert.alert("Upload image tapped")}
          >
            <Ionicons name="image" size={28} color={mode === "dark" ? "#fff" : "#000"} />
          </TouchableOpacity>
        </View>
      )}

      {/* Settings Title */}
      <Text style={styles.settingsTitle}>Settings</Text>

      {/* Settings Box */}
      <View style={styles.settingsBox}>
        <View style={styles.settingsRow}>
          <Text style={styles.settingsText}>Size</Text>
          <TouchableOpacity style={styles.rowButton}>
            <Text style={styles.rowButtonText}>1080 X 1920 px</Text>
            <Ionicons name="chevron-forward" size={16} color={mode === "dark" ? "#fff" : "#000"} />
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View style={styles.settingsRow}>
          <Text style={styles.settingsText}>Category</Text>
          <TouchableOpacity style={styles.rowButton}>
            <Text style={styles.rowButtonText}>Foods and beverage</Text>
            <Ionicons name="chevron-forward" size={16} color={mode === "dark" ? "#fff" : "#000"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Generate Button */}
      <CustomButton
        text="Generate"
        marginVertical={10}
        backgroundColor={mode === "dark" ? "#fff" : "#333"}
        textColor={mode === "dark" ? "#333" : "#fff"} 
        imagePath="https://cdn.pixabay.com/photo/2015/05/22/19/01/business-779542_640.jpg"
        onPress={() => Alert.alert("Generate pressed")}
      />
    </BaseScreen>
  );
};

// Dynamic styles function
const getStyles = (mode: ThemeMode) =>
  StyleSheet.create({
    appBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      backgroundColor: mode === "dark" ? "#000" : "#fff",
    },
    heading: {
      fontSize: 18,
      fontWeight: "600",
      marginVertical: 16,
      color: mode === "dark" ? "#fff" : "#000",
    },
    imageScroll: {
      marginBottom: 20,
    },
    imageCard: {
      width: 120,
      height: 160,
      borderWidth: 2,
      borderRadius: 12,
      marginHorizontal: 12,
      overflow: "hidden",
      backgroundColor: mode === "dark" ? "#222" : "#f9f9f9",
      borderColor: mode === "dark" ? "#555" : "#ccc",
      marginVertical: 12,
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    imageOverlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      padding: 4,
    },
    imageText: {
      color: "#fff",
      fontSize: 12,
      textAlign: "center",
    },
    descriptionBox: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginVertical: 16,
      borderWidth: 1,
      borderColor: mode === "dark" ? "#555" : "#ccc",
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 16,
      backgroundColor: mode === "dark" ? "#111" : "#fff",
      position: "relative",
    },
    textInput: {
      flex: 1,
      minHeight: 120,
      padding: 8,
      color: mode === "dark" ? "#fff" : "#000",
      textAlignVertical: "top",
    },

    uploadIcon: {
      position: "absolute",
      bottom: 16,
      right: 16,
    },
    settingsTitle: {
      fontSize: 16,
      fontWeight: "600",
      marginVertical: 12,
      color: mode === "dark" ? "#fff" : "#000",
    },
    settingsBox: {
      borderWidth: 1,
      borderColor: mode === "dark" ? "#555" : "#ccc",
      borderRadius: 8,
      padding: 12,
      marginBottom: 50,
      backgroundColor: mode === "dark" ? "#111" : "#fff",
    },
    settingsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
    },
    settingsText: {
      color: mode === "dark" ? "#fff" : "#000",
    },
    rowButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    rowButtonText: {
      color: mode === "dark" ? "#fff" : "#000",
    },
    divider: {
      height: 1,
      backgroundColor: mode === "dark" ? "#555" : "#ccc",
      marginVertical: 8,
    },
  });

export default HomeScreen;
