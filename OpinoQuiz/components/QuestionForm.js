import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const QuestionForm = ({ quizId, questionId, existingQuestion, onSave }) => {
  const [prompt, setPrompt] = useState(existingQuestion ? existingQuestion.prompt : '');
  const [options, setOptions] = useState(existingQuestion ? existingQuestion.options : ['', '', '', '']);

  const handleSave = async () => {
    try {
      const questionRef = doc(db, 'quizzes', quizId, 'questions', questionId);
      await updateDoc(questionRef, { prompt, options });
      onSave();
    } catch (e) {
      console.error('Error updating question: ', e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Question Prompt" value={prompt} onChangeText={setPrompt} style={styles.input} />
      {options.map((option, index) => (
        <TextInput
          key={index}
          placeholder={`Option ${index + 1}`}
          value={option}
          onChangeText={(text) => {
            const newOptions = [...options];
            newOptions[index] = text;
            setOptions(newOptions);
          }}
          style={styles.input}
        />
      ))}
      <Button title="Save Question" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
});

export default QuestionForm;
