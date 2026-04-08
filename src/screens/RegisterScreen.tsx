import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('⚠️ Missing Fields', 'Please fill all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('⚠️ Weak Password', 'Password must be at least 6 characters');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 🔥 Save display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      Alert.alert('✅ Success', 'Account created successfully!');
      // No navigation needed (App.tsx handles auth)
    } catch (e: any) {
      Alert.alert('❌ Signup Failed', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>💬 ChatApp</Text>
      <Text style={styles.subtitle}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={onRegister}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    padding: 20
  },
  logo: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },
  subtitle: {
    textAlign: 'center',
    color: '#94a3b8',
    marginBottom: 30
  },
  input: {
    backgroundColor: '#1e293b',
    color: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#334155'
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  link: {
    color: '#3b82f6',
    textAlign: 'center',
    marginTop: 15
  }
});