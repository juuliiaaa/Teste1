import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { useAuth } from "../context/auth/useAuth";

export default function NewPostScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const { user } = useAuth();

  const pickImage = async () => {
    // Solicitar permissão
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de permissão para acessar suas fotos!"
      );
      return;
    }

    // Abrir galeria
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    // Solicitar permissão da câmera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de permissão para usar a câmera!"
      );
      return;
    }

    // Abrir câmera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const imageRef = ref(storage, `posts/${Date.now()}_${user.uid}`);

    await uploadBytes(imageRef, blob);
    const downloadURL = await getDownloadURL(imageRef);

    return downloadURL;
  };

  // Função para adicionar comentário
  const addComment = async () => {
    if (!newComment.trim()) {
      Alert.alert("Erro", "Por favor, digite um comentário!");
      return;
    }

    setAddingComment(true);

    try {
      const commentData = {
        text: newComment.trim(),
        userEmail: user.email,
        userId: user.uid,
        createdAt: new Date(),
        id: Date.now() + Math.random(), // ID único temporário
      };

      // Adicionar à lista local
      setComments((prev) => [...prev, commentData]);
      setNewComment("");

      Alert.alert("Sucesso!", "Comentário adicionado!");
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
      Alert.alert("Erro", "Falha ao adicionar comentário.");
    } finally {
      setAddingComment(false);
    }
  };

  // Função para upload de comentário para Firestore (quando o post existir)
  const uploadCommentToFirestore = async (postId, commentData) => {
    try {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        comments: arrayUnion({
          ...commentData,
          createdAt: serverTimestamp(),
        }),
      });
    } catch (error) {
      console.error("Erro ao fazer upload do comentário:", error);
    }
  };

  const createPost = async () => {
    if (!selectedImage) {
      Alert.alert("Erro", "Por favor, selecione uma imagem!");
      return;
    }

    setUploading(true);

    try {
      // Upload da imagem
      const imageUrl = await uploadImage(selectedImage);

      // Criar post no Firestore
      const docRef = await addDoc(collection(db, "posts"), {
        imageUrl,
        caption: caption.trim(),
        userEmail: user.email,
        userId: user.uid,
        createdAt: serverTimestamp(),
        likes: 0,
        comments: comments.map((comment) => ({
          ...comment,
          createdAt: serverTimestamp(),
        })),
      });

      Alert.alert("Sucesso!", "Postagem criada com sucesso!", [
        {
          text: "OK",
          onPress: () => {
            setSelectedImage(null);
            setCaption("");
            setComments([]);
            setNewComment("");
            navigation.navigate("Home");
          },
        },
      ]);
    } catch (error) {
      console.error("Erro ao criar post:", error);
      Alert.alert("Erro", "Falha ao criar postagem. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  const removeComment = (commentId) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Nova Postagem</Text>
      </View>

      {/* Seleção de imagem */}
      <View style={styles.imageContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>
              Nenhuma imagem selecionada
            </Text>
          </View>
        )}
      </View>

      {/* Campo de legenda */}
      <View style={styles.captionContainer}>
        <Text style={styles.label}>Legenda (opcional):</Text>
        <TextInput
          style={styles.captionInput}
          placeholder="Escreva uma legenda para sua foto..."
          placeholderTextColor="#999"
          value={caption}
          onChangeText={setCaption}
          multiline
          maxLength={500}
        />
        <Text style={styles.characterCount}>{caption.length}/500</Text>
      </View>

      {/* Botões para selecionar imagem */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.buttonText}>📷 Galeria</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
          <Text style={styles.buttonText}>📸 Câmera</Text>
        </TouchableOpacity>
      </View>

      {/* Seção de Comentários */}
      <View style={styles.commentsSection}>
        <Text style={styles.label}>Comentários Pré-definidos:</Text>

        {/* Adicionar novo comentário */}
        <View style={styles.addCommentContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Adicione um comentário..."
            placeholderTextColor="#999"
            value={newComment}
            onChangeText={setNewComment}
            multiline
            maxLength={200}
          />
          <TouchableOpacity
            style={[
              styles.addCommentButton,
              !newComment.trim() && styles.disabledButton,
            ]}
            onPress={addComment}
            disabled={!newComment.trim() || addingComment}
          >
            {addingComment ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.addCommentButtonText}>Adicionar</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Lista de comentários */}
        {comments.length > 0 && (
          <View style={styles.commentsList}>
            <Text style={styles.commentsTitle}>
              Comentários ({comments.length}):
            </Text>
            {comments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <View style={styles.commentContent}>
                  <Text style={styles.commentUser}>{comment.userEmail}</Text>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeCommentButton}
                  onPress={() => removeComment(comment.id)}
                >
                  <Text style={styles.removeCommentText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Botão de postar */}
      <TouchableOpacity
        style={[
          styles.postButton,
          (!selectedImage || uploading) && styles.disabledButton,
        ]}
        onPress={createPost}
        disabled={!selectedImage || uploading}
      >
        {uploading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.postButtonText}>PUBLICAR</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  selectedImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#861f66",
  },
  placeholderContainer: {
    width: 300,
    height: 300,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#999",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  imageButton: {
    backgroundColor: "#f8ad98",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 0.45,
    alignItems: "center",
  },
  buttonText: {
    color: "#861f66",
    fontSize: 16,
    fontWeight: "bold",
  },
  captionContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#861f66",
    marginBottom: 10,
  },
  captionInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  characterCount: {
    textAlign: "right",
    color: "#999",
    fontSize: 12,
    marginTop: 5,
  },
  // Estilos para comentários
  commentsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 15,
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    maxHeight: 80,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
  },
  addCommentButton: {
    backgroundColor: "#861f66",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
  },
  addCommentButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  commentsList: {
    marginTop: 15,
  },
  commentsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#861f66",
    marginBottom: 10,
  },
  commentItem: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    alignItems: "flex-start",
  },
  commentContent: {
    flex: 1,
  },
  commentUser: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#861f66",
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    color: "#333",
  },
  removeCommentButton: {
    backgroundColor: "#ff4757",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  removeCommentText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  postButton: {
    backgroundColor: "#861f66",
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
