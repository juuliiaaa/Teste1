// screens/Profile.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { auth } from "../firebase.config";
import { signOut } from "firebase/auth";

const Profile = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail("Nenhum usuário logado");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Erro ao fazer logout", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Título da tela */}
      <View style={styles.header}>
        <Text style={styles.title}>Meu Perfil</Text>
      </View>

      <View style={styles.profileContent}>
        <Text style={styles.profileText}>
          Bem-vindo, {userEmail || "Carregando..."}
        </Text>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </Pressable>
        {/* Você pode adicionar mais informações do perfil aqui */}
      </View>

      {/* Barra de navegação inferior */}
      <View style={styles.bottomNav}>
        <Pressable
          style={styles.navButton}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Text style={styles.navButtonText}>🏠</Text>
          <Text style={styles.navButtonLabel}>Home</Text>
        </Pressable>

        <Pressable
          style={styles.navButton}
          onPress={() => navigation.navigate("NewPost")} // Certifique-se de ter uma tela "NewPost"
        >
          <Text style={[styles.navButtonText, styles.plusButton]}>+</Text>
          <Text style={styles.navButtonLabel}>Nova Postagem</Text>
        </Pressable>

        <Pressable
          style={styles.navButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.navButtonText}>👤</Text>
          <Text style={styles.navButtonLabel}>Perfil</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#861f66",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  profileContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  profileText: {
    fontSize: 20,
    color: "#861f66",
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#f8ad98",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#861f66",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f8ad98",
    borderTopWidth: 1,
    borderTopColor: "#861f66",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  navButtonText: {
    fontSize: 24,
    color: "#861f66",
    marginBottom: 5,
  },
  plusButton: {
    fontSize: 36,
    fontWeight: "bold",
  },
  navButtonLabel: {
    fontSize: 12,
    color: "#861f66",
    fontWeight: "500",
  },
});

export default Profile;
