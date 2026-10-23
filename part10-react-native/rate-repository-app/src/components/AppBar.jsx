import Constants from "expo-constants";
import { ScrollView, StyleSheet, View } from "react-native";
import theme from "../theme";
import Tab from "./Tab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: "row",
    // ...
  },
  scroll: {
    flexDirection: "row",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        <Tab to="/">Repositories</Tab>
        <Tab to="/signin">Sign in</Tab>
      </ScrollView>
    </View>
  );
};

export default AppBar;
