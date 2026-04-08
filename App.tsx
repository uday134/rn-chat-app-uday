import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './src/firebase';

import { Store } from './src/store/store';
import { setUser, clearUser } from './src/store/userSlice';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const dispatch = useDispatch();

  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUserState(u);

      // 🔥 Sync with Redux
    if (u) {
      dispatch(
        setUser({
          uid: u.uid,
          email: u.email || '',
          displayName: u.email?.split('@')[0] || 'User', // ✅ fallback
        })
      );
    } else {
      dispatch(clearUser());
    }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <StatusBar style="light" />

      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0f172a' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' },
        }}
      >
        {user ? (
          <>
            {/* 🔓 Logged In */}
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Chat Rooms' }}
            />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
            />
          </>
        ) : (
          <>
            {/* 🔐 Auth */}
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={Store}>
      <AppNavigator />
    </Provider>
  );
}