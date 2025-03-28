// app/+not-found.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
      <View style={styles.container}>
        <Text style={styles.title}>Page non trouvée</Text>
        <Button title="Retour à l'accueil" onPress={() => router.push('/chat')} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
