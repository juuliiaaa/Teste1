import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase.config";
import { useAuth } from "../context/auth/useAuth";

const { width } = Dimensions.get("window");
const imageSize = (width - 40) / 3 - 10;

export default function ProfileScreen() {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) return;

    const postsRef = collection(db, "posts");
    const q = query(
      postsRef,
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserPosts(posts);
        setLoading(false);
      },
      (error) => {
        console.error("Error in snapshot listener:", error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const handleLogout = () => {
    Alert.alert("Sair da conta", "Tem certeza que deseja sair da sua conta?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth);
            await AsyncStorage.removeItem("userToken");
            setDrawerVisible(false);
            navigation.replace("Login");
          } catch (error) {
            Alert.alert("Erro", "Falha ao sair da conta");
          }
        },
      },
    ]);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const renderPost = ({ item }) => (
    <View style={styles.postItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
    </View>
  );

  const renderHeader = () => (
    <View style={styles.profileHeader}>
      <View style={styles.profileInfo}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user?.email?.charAt(0).toUpperCase() || "?"}
          </Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.email}</Text>
          <Text style={styles.userStats}>
            {userPosts.length}{" "}
            {userPosts.length === 1 ? "publicação" : "publicações"}
          </Text>
        </View>

        <TouchableOpacity style={styles.drawerButton} onPress={toggleDrawer}>
          <Ionicons name="menu" size={24} color="#861f66" />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Suas Publicações</Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        Você ainda não fez nenhuma publicação
      </Text>
      <Text style={styles.emptySubtext}>Suas fotos aparecerão aqui</Text>
    </View>
  );

  const DrawerMenu = () => (
    <Modal
      visible={drawerVisible}
      transparent={true}
      animationType="none"
      onRequestClose={() => setDrawerVisible(false)}
    >
      <View style={styles.drawerOverlay}>
        <TouchableOpacity
          style={styles.drawerBackdrop}
          activeOpacity={1}
          onPress={() => setDrawerVisible(false)}
        />
        <View style={styles.drawerContainer}>
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerTitle}>Menu</Text>
            <TouchableOpacity onPress={() => setDrawerVisible(false)}>
              <Ionicons name="close" size={24} color="#861f66" />
            </TouchableOpacity>
          </View>

          <View style={styles.drawerContent}>
            <TouchableOpacity style={styles.drawerItem}>
              <Ionicons name="settings-outline" size={20} color="#861f66" />
              <Text style={styles.drawerItemText}>Configurações</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItem}>
              <Ionicons name="help-circle-outline" size={20} color="#861f66" />
              <Text style={styles.drawerItemText}>Ajuda</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItem}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#861f66"
              />
              <Text style={styles.drawerItemText}>Sobre</Text>
            </TouchableOpacity>

            <View style={styles.drawerDivider} />

            <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color="#d32f2f" />
              <Text style={[styles.drawerItemText, { color: "#d32f2f" }]}>
                Sair da Conta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
      </View>

      <FlatList
        data={userPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        numColumns={3}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={!loading ? renderEmptyState : null}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={userPosts.length > 0 ? styles.row : null}
      />

      <DrawerMenu />
    </View>
  );
}

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
  listContainer: {
    paddingBottom: 20,
  },
  profileHeader: {
    padding: 20,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#861f66",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#861f66",
    marginBottom: 5,
  },
  userStats: {
    fontSize: 14,
    color: "#666",
  },
  drawerButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f8ad98",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#861f66",
    marginBottom: 15,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  postItem: {
    marginBottom: 10,
  },
  postImage: {
    width: imageSize,
    height: imageSize,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#861f66",
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  // Estilos do Drawer
  drawerOverlay: {
    flex: 1,
    flexDirection: "row",
  },
  drawerBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawerContainer: {
    backgroundColor: "#fff",
    width: 280,
    height: "100%",
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#861f66",
  },
  drawerContent: {
    padding: 20,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  drawerItemText: {
    fontSize: 16,
    color: "#861f66",
    marginLeft: 15,
    fontWeight: "500",
  },
  drawerDivider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 10,
  },
});
