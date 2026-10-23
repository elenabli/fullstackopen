import Text from './Text';

const Subheading = ({ children, style, ...props }) => {
  return (
    <Text
      fontSize="subheading"
      fontWeight="bold"
      color="textPrimary"
      {...props}
    >
      {children}
    </Text>
  );
};
export default Subheading;