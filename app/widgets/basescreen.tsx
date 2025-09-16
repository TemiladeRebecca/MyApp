import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ViewStyle,
} from "react-native";

type BaseScreenProps = {
  children: React.ReactNode;
  appBar?: React.ReactNode;
  scrollable?: boolean;
  padding?: number | ViewStyle;
  backgroundColor?: string;
};

const BaseScreen: React.FC<BaseScreenProps> = ({
  children,
  appBar,
  scrollable = false,
  padding = 20,
  backgroundColor = "#fff", // default
}) => {
  const content = (
    <View style={[styles.content, typeof padding === "number" ? { padding } : padding]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {appBar && <View>{appBar}</View>}
      {scrollable ? <ScrollView>{content}</ScrollView> : content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});

export default BaseScreen;