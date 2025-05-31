import React from 'react';
import { View, Text, Image, SectionList, StyleSheet } from 'react-native';

const DATA = [
  { categoria: "Cães", data: ["Vira-Lata", "Golden", "Labrador", "Poodle", "Bulldog"] },
  { categoria: "Gatos", data: ["Vira-Lata", "Persa", "Siamês", "Sphynx"] }
];

export default function Tela2() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/zoe.jpg')} style={styles.image} resizeMode='contain' />
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({ section: { categoria } }) => <Text style={styles.header}>{categoria}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  image: { width: '100%', height: 300, marginBottom: 10 },
  header: { fontWeight: 'bold', fontSize: 18, marginTop: 10 },
  item: { fontSize: 16, paddingLeft: 10 }
});