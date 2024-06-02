import React from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';

const UserForm: React.FC = () => {

  const handleSubmit = async (values: any, {resetForm}: any) => {
    console.log(values.firstName, values.lastName);

    console.log(values);

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      resetForm();
      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      // Reset form fields
      resetForm;
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ firstName: '', lastName: '', username: '', password: '' }}
        onSubmit={(values, actions) => handleSubmit(values, actions.resetForm)}
      >
        {({values, errors, handleChange, resetForm }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={handleChange('firstName')}
              value={values.firstName}
            />
            <Text style={styles.error}>{errors.firstName}</Text>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={handleChange('lastName')}
              value={values.lastName}
            />
            <Text style={styles.error}>{errors.lastName}</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={handleChange('username')}
              value={values.username}
            />
            <Text style={styles.error}>{errors.username}</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange('password')}
              value={values.password}
              secureTextEntry={true}
            />
            <Text style={styles.error}>{errors.password}</Text>
            <Button title="Submit" onPress={() => handleSubmit(values, {resetForm})} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default UserForm;
