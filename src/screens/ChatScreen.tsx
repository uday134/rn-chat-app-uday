import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { sendMessage, subscribeMessages } from '../services/chatService';
import { RootState } from '../store/store';

export default function ChatScreen({ route, navigation }: any) {
  const roomId = route?.params?.roomId;
  const roomName = route?.params?.roomName;

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');
  const insets = useSafeAreaInsets();

  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: roomName,
    });
  }, [navigation, roomName]);

  useEffect(() => {
    const unsubscribe = subscribeMessages(roomId, setMessages);
    return () => unsubscribe();
  }, [roomId]);

  const handleSend = async () => {

    if (!text.trim() || !currentUser) return;
    // send message to firebase
    await sendMessage(roomId, text, currentUser);
    setText('');
  };

  const isMe = (senderId: string) =>
    senderId === currentUser?.uid;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              isMe(item.senderId) ? styles.mine : styles.theirs,
            ]}
          >
            {!isMe(item.senderId) && (
              <Text style={styles.sender}>{item.senderName}</Text>
            )}
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
      />

      <View style={[styles.inputRow, { paddingBottom: insets.bottom + 10 }]}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type message..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  bubble: {
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
    maxWidth: '75%',
  },
  mine: {
    backgroundColor: '#3b82f6',
    alignSelf: 'flex-end',
  },
  theirs: {
    backgroundColor: '#1e293b',
    alignSelf: 'flex-start',
  },
  sender: {
    fontSize: 10,
    color: '#aaa',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
  inputRow: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#1e293b',
  },
  input: {
    flex: 1,
    backgroundColor: '#0f172a',
    color: '#fff',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  sendBtn: {
    marginLeft: 10,
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 20,
  },
  sendText: {
    color: '#fff',
    fontWeight: '600',
  },
});