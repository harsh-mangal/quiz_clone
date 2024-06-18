import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const QuizForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [timeLimit, setTimeLimit] = useState('');

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, 'quizzes'), {
        name,
        description,
        points: parseInt(points, 10),
        timeLimit: parseInt(timeLimit, 10),
        questions: [],
      });
      console.log('Quiz created with ID:', docRef.id);
    } catch (e) {
      console.error('Error adding quiz: ', e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Quiz Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
      <TextInput placeholder="Points" value={points} onChangeText={setPoints} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Time Limit (minutes)" value={timeLimit} onChangeText={setTimeLimit} keyboardType="numeric" style={styles.input} />
      <Button title="Create Quiz" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
});

export default QuizForm;
