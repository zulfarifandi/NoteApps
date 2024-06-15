import React from 'react';
import { FlatList, StyleSheet, View, Text, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import CustomButton from '../components/customButton';

const NoteCard = ({ item, setCurrentPage, deleteNote, setCurrentNote }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{item.title}</Text>
    <Text>{item.desc}</Text>
    <View style={styles.buttons}>
      <CustomButton
        backgroundColor="#FFC300"
        color="#151D3B"
        text="Ubah"
        fontSize={12}
        width={100}
        onPress={() => {
          setCurrentNote(item); // Set current note
          setCurrentPage('edit');
        }}
      />
      <CustomButton
        backgroundColor="#D82148"
        color="#fff"
        text="Hapus"
        fontSize={12}
        width={100}
        onPress={() => {
          Alert.alert(
            "Konfirmasi",
            "Apakah Anda yakin ingin menghapus note ini?",
            [
              { text: "Batal" },
              {
                text: "Ya",
                onPress: () => {
                  deleteNote(item.id);
                  Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Note berhasil dihapus',
                    visibilityTime: 2000,
                  });
                }
              }
            ]
          );
        }}
      />
    </View>
  </View>
);

const Home = ({ noteList, setCurrentPage, deleteNote, setCurrentNote }) => (
  <View style={styles.container}>
    <CustomButton
      backgroundColor="#DDD"
      color="#203239"
      text="Tambahkan Note"
      width="100%"
      onPress={() => {
        setCurrentPage('add');
      }}
    />
    {noteList.length === 0 ? (
  <Text style={styles.noDataText}>No data, please create note</Text>
) : (
  <FlatList
    showsVerticalScrollIndicator={false}
    data={noteList}
    renderItem={({ item }) => (
      <NoteCard item={item} setCurrentPage={setCurrentPage} deleteNote={deleteNote} setCurrentNote={setCurrentNote} />
    )}
    keyExtractor={(item) => item.id.toString()}
  />
)}
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    padding: 10,
    marginVertical: 15,
    borderColor: '#DDD',
    borderWidth: 2,
    borderRadius: 5,
  },
  cardTitle: {
    fontWeight: '600',
    color: '#203239',
    fontSize: 16,
    marginBottom: 5,
  },
  buttons: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  noDataText: {
    fontSize: 18,
    color: '#333', // Warna teks yang kontras
    textAlign: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default Home;
