import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { auth } from "../firebase.config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    const checkLogin = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuário já está logado
        navigation.replace("HomeScreen");
      }
    });
    return checkLogin;
  }, []);

  const registry = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      Alert.alert("Sucesso", "Usuário registrado com sucesso!");
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert("Erro", "Falha no registro: " + error.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert("Erro", "Falha no login: " + error.message);
    }
  };

  return (
    <View style={styles.container} pointerEvents="auto">
      <Image
        source={require("../assets/logo.png")}
        style={styles.image}
        resizeMode="contain"
      />

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

      <TouchableOpacity
        style={styles.button}
        onPress={login}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={registry}
        activeOpacity={0.8}
      >
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#861f66",
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
