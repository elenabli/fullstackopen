import Text from './Text';
import { Formik } from 'formik';
import theme from '../theme';

import { Pressable, StyleSheet, View, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.backgroundItem,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: theme.borderRadius.small,
    padding: 12,
    marginBottom: 12,
    fontSize: theme.fontSizes.body,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.small,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const SignIn = () => {
    const onSubmit = (values) => {
        console.log(values);
    }
  return (
    <Formik 
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.container}>
                
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                />
               <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </Pressable>
            </View>
        )}
        </Formik>
  )
};

export default SignIn;