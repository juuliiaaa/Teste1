import React, { useState, useEffect } from "react";
import { View, FlatList, Image, StyleSheet, Pressable, Text } from "react-native";
import { db } from "../firebase.config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsList = [];
      querySnapshot.forEach((doc) => {
        postsList.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsList);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.postContainer}
      onPress={() => navigation.navigate("ImageDetail", { post: item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
      <Text style={styles.postText}>IMAGEM POSTADA</Text>
      <Text style={styles.postText}>POR: {item.userEmail}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Título da tela */}
      <View style={styles.header}>
        <Text style={styles.title}>PIXIE</Text>
      </View>

      {/* Grid de imagens */}
      {posts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma postagem ainda</Text>
          <Text style={styles.emptyText}>Seja o primeiro a postar!</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}

      {/* Barra de navegação inferior */}
      <View style={styles.bottomNav}>
        <Pressable
          style={styles.navButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.navButtonText}>🏠</Text>
          <Text style={styles.navButtonLabel}>Home</Text>
        </Pressable>

        <Pressable
          style={styles.navButton}
          onPress={() => navigation.navigate("NewPost")}
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#861f66",
    marginBottom: 10,
  },
  list: {
    padding: 10,
    paddingBottom: 70, // Espaço para a barra inferior
  },
  postContainer: {
    flex: 1,
    margin: 5,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    maxWidth: "50%",
  },
  postImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 4,
    marginBottom: 8,
  },
  postText: {
    fontSize: 12,
    color: "#861f66",
    textAlign: "center",
    fontWeight: "500",
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

export default HomeScreen;