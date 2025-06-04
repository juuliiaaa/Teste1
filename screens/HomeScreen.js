import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import { db } from "../firebase.config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsList = [];
      querySnapshot.forEach((doc) => {
        postsList.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Text style={styles.userEmail}>{item.userEmail}</Text>
      </View>

      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />

      {item.caption && (
        <View style={styles.captionContainer}>
          <Text style={styles.captionText}>{item.caption}</Text>
        </View>
      )}

      <View style={styles.postFooter}>
        <Text style={styles.timeText}>
          {item.createdAt?.toDate?.()?.toLocaleDateString("pt-BR") || "Agora"}
        </Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📸</Text>
      <Text style={styles.emptyTitle}>Nenhuma postagem ainda</Text>
      <Text style={styles.emptyText}>
        Seja o primeiro a compartilhar uma foto!
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>PIXIE</Text>
      </View>

      {/* Feed de posts */}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={!loading ? renderEmptyState : null}
        showsVerticalScrollIndicator={false}
      />
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  list: {
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: "#fff",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#861f66",
  },
  postImage: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#f0f0f0",
  },
  captionContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  captionText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 18,
  },
  postFooter: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  timeText: {
    fontSize: 12,
    color: "#999",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#861f66",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
});

export default HomeScreen;
