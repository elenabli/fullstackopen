import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const formatThousands = value => {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundItem,
    padding: theme.spacing.large,
    marginBottom: theme.spacing.large,
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.medium,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.small,
    marginRight: theme.spacing.large,
  },
  info: {
    flexShrink: 1,
  },
  fullName: {
    marginBottom: theme.spacing.small,
  },
  description: {
    marginBottom: theme.spacing.small,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.languageTagBackground,
    color: theme.colors.languageTagText,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
    borderRadius: theme.borderRadius.small,
    overflow: 'hidden',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.medium,
  },
  statItem: {
    alignItems: 'center',
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.info}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.fullName}>
            {item.fullName}
          </Text>
          <Text color="textSecondary" style={styles.description}>
            {item.description}
          </Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <Stat label="Stars" value={formatThousands(item.stargazersCount)} />
        <Stat label="Forks" value={formatThousands(item.forksCount)} />
        <Stat label="Reviews" value={item.reviewCount} />
        <Stat label="Rating" value={item.ratingAverage} />
      </View>
    </View>
  );
};

const Stat = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text fontWeight="bold">{value}</Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

export default RepositoryItem;