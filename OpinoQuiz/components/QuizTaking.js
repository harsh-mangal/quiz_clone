import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const QuizTaking = ({ route }) => {
    const { quizId } = route.params;
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);

    useEffect(() => {
        const fetchQuiz = async () => {
            const docRef = doc(db, 'quizzes', quizId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setQuiz(docSnap.data());
            } else {
                console.log('Quiz not found');
            }
        };

        fetchQuiz();
    }, [quizId]);

    const handleAnswer = (answer) => {
        setUserAnswers([...userAnswers, { questionIndex: currentQuestionIndex, answer }]);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const calculateScore = () => {
        let score = 0;
        userAnswers.forEach((answer) => {
            const question = quiz.questions[answer.questionIndex];
            if (question.correctAnswer === answer.answer) {
                score += quiz.points / quiz.questions.length;
            }
        });
        return score;
    };

    if (!quiz) {
        return <Text>Loading...</Text>;
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <View style={styles.container}>
            {currentQuestion ? (
                <View style={styles.questionContainer}>
                    <Text style={styles.question}>{currentQuestion.prompt}</Text>
                    {currentQuestion.options.map((option, index) => (
                        <Button
                            key={index}
                            title={option}
                            onPress={() => handleAnswer(option)}
                        />
                    ))}
                </View>
            ) : (
                <View style={styles.resultsContainer}>
                    <Text style={styles.resultsText}>Quiz Completed!</Text>
                    <Text style={styles.resultsText}>Your Score: {calculateScore()}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    questionContainer: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 20,
    },
    question: {
        fontSize: 18,
        marginBottom: 10,
    },
    resultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultsText: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default QuizTaking;
