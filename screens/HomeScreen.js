import React, { useState } from 'react';
import { View, FlatList, Image, StyleSheet, Pressable, Text } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState(Array(20).fill().map((_, i) => ({
    id: i.toString(),
    imageUrl: `https://picsum.photos/300/300?random=${i}`,
    userEmail: `user${i}@example.com`,
  })));

  const renderItem = ({ item }) => (
    <Pressable 
      style={styles.postContainer}
      onPress={() => navigation.navigate('ImageDetail', { post: item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
      <Text style={styles.postText}>IMAGEM POSTADA</Text>
      <Text style={styles.postText}>PELO USUÁRIO</Text>
      <Text style={styles.postText}>ALEATÓRIO</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 10,
  },
  postContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    maxWidth: '50%',
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 4,
    marginBottom: 8,
  },
  postText: {
    fontSize: 12,
    color: '#861f66',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default HomeScreen;