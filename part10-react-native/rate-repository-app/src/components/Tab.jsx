import { Pressable, StyleSheet } from "react-native";
import {Link} from "react-router-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  tab: {
    marginRight: theme.spacing.large,
  },
});

const Tab = ({ children, to }) => {
    return (
       <Link to={to} style={styles.tab}>
        <Text
          color="tab"
          fontWeight="bold"
          fontSize="subheading"  
        >
          {children}
        </Text>
      </Link>
    );
    };

export default Tab;