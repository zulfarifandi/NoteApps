import React, { useState } from 'react';
import { StatusBar, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Home from './src/screens/home';
import AddNote from './src/screens/addNote';
import EditNote from './src/screens/editNote';

const CurrentPageWidget = ({
  currentPage,
  noteList,
  setCurrentPage,
  addNote,
  editNote,
  deleteNote,
  currentNote,
  setCurrentNote,
}) => {
  switch (currentPage) {
    case 'home':
      return <Home noteList={noteList} setCurrentPage={setCurrentPage} deleteNote={deleteNote} setCurrentNote={setCurrentNote} />;
    case 'add':
      return <AddNote setCurrentPage={setCurrentPage} addNote={addNote} />;
    case 'edit':
      return <EditNote setCurrentPage={setCurrentPage} editNote={editNote} note={currentNote} />;
    default:
      return <Home />;
  }
}

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentNote, setCurrentNote] = useState(null);

  const [noteList, setNoteList] = useState([
    {
      id: 1,
      title: 'Note pertama',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    },
  ]);

  const addNote = (title, desc) => {
    const id = noteList.length > 0 ? noteList[noteList.length - 1].id + 1 : 1;
    setNoteList([...noteList, { id, title, desc }]);
  }

  const editNote = (id, title, desc) => {
    const updatedNotes = noteList.map(note => note.id === id ? { id, title, desc } : note);
    setNoteList(updatedNotes);
  }

  const deleteNote = (id) => {
    const updatedNotes = noteList.filter(note => note.id !== id);
    setNoteList(updatedNotes);
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar animated={true} backgroundColor="black" />
      <CurrentPageWidget
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        noteList={noteList}
        addNote={addNote}
        editNote={editNote}
        deleteNote={deleteNote}
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
      />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  )
}

export default App;
