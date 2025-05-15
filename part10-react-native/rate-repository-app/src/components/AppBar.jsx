import Constants from "expo-constants";
import { Pressable, StyleSheet, View } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: "row",
    // ...
  },
  tab: {
    marginRight: 20,
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text
          color="tab"
          fontWeight="bold"
          fontSize="subheading"
          style={styles.tab}
        >
          Repositories
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
