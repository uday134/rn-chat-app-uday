import { db } from '../firebase';
import { ref, push, onValue, off } from 'firebase/database';

export const sendMessage = async (roomId: string, text: string, user: any) => {
  const msgsRef = ref(db, `rooms/${roomId}/messages`);
  await push(msgsRef, {
    text,
    senderId: user.uid,
    senderName: user.displayName || 'User',
    timestamp: Date.now(),
  });
};

export const subscribeMessages = (roomId: string, callback: any) => {
  const msgsRef = ref(db, `rooms/${roomId}/messages`);

  const listener = onValue(msgsRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) return callback([]);

    const messages = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));

    messages.sort((a, b) => a.timestamp - b.timestamp);
    callback(messages);
  });

  return () => off(msgsRef, 'value', listener);
};