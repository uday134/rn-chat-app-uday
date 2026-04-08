import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const rooms = [
  { id: '1', name: 'General' },
  { id: '2', name: 'Developers' },
];

export default function HomeScreen({ navigation }: any) {

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('Login'); // 🔥 important
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.room}
            onPress={() =>
              navigation.navigate('Chat', {
                roomId: item.id,
                roomName: item.name,
              })
            }
          >
            <Text style={styles.roomText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16,
  },
  room: {
    backgroundColor: '#1e293b',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  roomText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});