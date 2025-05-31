import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

import {auth} from '../FirebaseConfig'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        // Verifica se já tem usuário autenticado
        const checkLogin = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Usuário já está logado
                navigation.replace('MainTabs');
            } 
    });
        return () => checkLogin();
    }, []);


    const handleLogin = async ()=> {
        if (!email.includes('@') || senha.length < 6) {
            Alert.alert('Login inválido');
            //alert('Login inválido');
        }
        else{
        try {
            const user = await signInWithEmailAndPassword(auth, email, senha)
            if (user)
                navigation.replace('Tela2');
        } catch(error) {
            console.log(error)
            alert('Erro ao realizar login' + error.message)
        }

        }
    }

    const handleCreateAccount = async () => {
        if (!email.includes('@') || senha.length < 6) {
            Alert.alert('Login inválido');
            alert('Login inválido');
        }
        else{
            try {
                const user = await createUserWithEmailAndPassword(auth, email, senha)
                if (user)  
                    navigation.replace('Nav-Tela2');
            } catch (error) {
            console.log(error)
            alert('Erro ao criar login: ' + error.message);
            }
        }       
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>E-mail:</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="digite@exemplo.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
        />

            <Text style={styles.label}>Senha:</Text>
                <TextInput
                    value={senha}
                    onChangeText={setSenha}
                    placeholder="******"
                    secureTextEntry
                    style={styles.input}
            />

            <View style={styles.buttonsContainer}>
                <Button title="Entrar" onPress={handleLogin} />
                <Button title="Criar Conta" onPress={handleCreateAccount} />
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    padding: 10,
    marginBottom: 16
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});