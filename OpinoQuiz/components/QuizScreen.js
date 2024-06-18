import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, StyleSheet } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import QuestionForm from '../components/QuestionForm';

const QuizScreen = ({ route }) => {
  const { quizId } = route.params;
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'quizzes', quizId, 'questions'), (querySnapshot) => {
      const questionsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionsArray);
    });

    return unsubscribe;
  }, []);

  const handleAddQuestion = () => {
    // Logic to add a new question
  };

  const handleDeleteQuestion = (questionId) => {
    // Logic to delete a question
  };

  return (
    <View style={styles.container}>
      <Button title="Add Question" onPress={handleAddQuestion} />
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.questionContainer}>
            <Text>{item.prompt}</Text>
            {item.options.map((option, index) => (
              <Text key={index}>{option}</Text>
            ))}
            <Button title="Edit" onPress={() => {/* Navigate to edit screen */}} />
            <Button title="Delete" onPress={() => handleDeleteQuestion(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  questionContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default QuizScreen;
