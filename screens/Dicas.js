import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Dicas({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.tip}>Leve para passear</Text>
      <Text style={styles.tip}>Leve ao veterinário regularmente</Text>
      <Text style={styles.tip}>Dê atenção e carinho</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  tip: { fontSize: 16, marginBottom: 10 }
});