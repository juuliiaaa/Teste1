import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { auth } from '../firebase.config';
import { getAuth } from 'firebase/auth';

export default function Tela3() {

  getAuth().onAuthStateChanged((user) => {
    if(!user)
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login'}],
      })
  });

  const handleLogout = async () => {
    auth.signOut()
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://place-puppy.com/300x150' }}
        style={styles.image}
      />
      <Text style={styles.text}>Aluno: XXXX</Text>
      <Text style={styles.text}>Curso: BCC</Text>
      <Text style={styles.text}>Semestre: 5º</Text>

      <View style={styles.button}>
        <Button title="Fazer Logout" onPress={handle_logout} />
      </View>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  image: { width: '100%', height: 150, marginBottom: 20 },
  text: { fontSize: 16 }
});