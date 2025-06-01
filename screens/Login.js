// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

// import {auth} from '../FirebaseConfig'
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

// export default function Login({ navigation }) {
//     const [email, setEmail] = useState('');
//     const [senha, setSenha] = useState('');

//     useEffect(() => {
//         // Verifica se já tem usuário autenticado
//         const checkLogin = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 // Usuário já está logado
//                 navigation.replace('MainTabs');
//             } 
//     });
//         return () => checkLogin();
//     }, []);


//     const handleLogin = async ()=> {
//         if (!email.includes('@') || senha.length < 6) {
//             Alert.alert('Login inválido');
//             //alert('Login inválido');
//         }
//         else{
//         try {
//             const user = await signInWithEmailAndPassword(auth, email, senha)
//             if (user)
//                 navigation.replace('Tela2');
//         } catch(error) {
//             console.log(error)
//             alert('Erro ao realizar login' + error.message)
//         }

//         }
//     }

//     const handleCreateAccount = async () => {
//         if (!email.includes('@') || senha.length < 6) {
//             Alert.alert('Login inválido');
//             alert('Login inválido');
//         }
//         else{
//             try {
//                 const user = await createUserWithEmailAndPassword(auth, email, senha)
//                 if (user)  
//                     navigation.replace('Nav-Tela2');
//             } catch (error) {
//             console.log(error)
//             alert('Erro ao criar login: ' + error.message);
//             }
//         }       
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.label}>E-mail:</Text>
//                 <TextInput
//                     value={email}
//                     onChangeText={setEmail}
//                     placeholder="digite@exemplo.com"
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                     style={styles.input}
//         />

//             <Text style={styles.label}>Senha:</Text>
//                 <TextInput
//                     value={senha}
//                     onChangeText={setSenha}
//                     placeholder="******"
//                     secureTextEntry
//                     style={styles.input}
//             />

//             <View style={styles.buttonsContainer}>
//                 <Button title="Entrar" onPress={handleLogin} />
//                 <Button title="Criar Conta" onPress={handleCreateAccount} />
//             </View>
//         </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     justifyContent: 'center',
//     backgroundColor: '#fff'
//   },
//   label: { fontSize: 16, marginBottom: 8 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#888',
//     borderRadius: 4,
//     padding: 10,
//     marginBottom: 16
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   }
// });



import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Image } from "react-native";
import { auth } from "../firebase.config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const registry = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, senha);
            Alert.alert("Sucesso", "UsuÃ¡rio registrado com sucesso!");
            navigation.navigate('HomeScreen'); 
        } catch (error) {
            Alert.alert("Erro", "Falha no registro: " + error.message);
        }
    };

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, senha);
            navigation.navigate('HomeScreen');
        } catch (error) {
            Alert.alert("Erro", "Falha no login: " + error.message);
        }
    };

    return (
        <View style={styles.container} pointerEvents="auto">
            <Image source={require('../assets/logo.png')} style={styles.image} resizeMode='contain' />

            <Text style={styles.title}>PIXIE</Text>
            
            <TextInput
                placeholder="E-mail"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            
            <TextInput
                placeholder="Senha"
                placeholderTextColor="#999"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
                style={styles.input}
                autoCapitalize="none"
            />
            
            <TouchableOpacity style={styles.button} onPress={login} activeOpacity={0.8}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={registry} activeOpacity={0.8}>
                <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#861f66",
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 40,
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#f8ad98",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#861f66",
        fontSize: 18,
        fontWeight: "bold",
    },
});