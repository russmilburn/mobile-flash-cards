import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import TextButton from "./TextButton";
import {connect} from 'react-redux';
import {green, red, white} from "../utils/colors";
import {clearLocalNotification, setLocalNotifications} from "../utils/deckData";

class QuizView extends React.Component {

  state = {
    questionIndex: 0,
    correctAnswers: 0,
    displayAnswer: false,
    opacity: new Animated.Value(0),
  };

  nextQuestion = () => {
    this.setState((currentState) => ({
      questionIndex: currentState.questionIndex + 1,
      displayAnswer: false,
    }))
  };

  correctHandler = () => {
    this.setState((currentState) => ({
      correctAnswers: currentState.correctAnswers + 1,
    }));
    this.nextQuestion();
  };

  incorrectHandler = () => {
    this.nextQuestion();
  };

  restartQuizHandler = () => {
    this.setState({
      questionIndex: 0,
      correctAnswers: 0,
      displayAnswer: false,
    })
  };

  displayAnswerHandler = () => {
    const {opacity} = this.state;

    this.setState({
      displayAnswer: true,
    });

    Animated.timing(opacity, {toValue:1, duration:1000})
      .start();
  };


  render() {
    const {questions} = this.props.deck;
    const {questionIndex, correctAnswers, displayAnswer} = this.state;

    if (questionIndex == questions.length) {
      clearLocalNotification()
        .then(setLocalNotifications);
      return (
        <View style={styles.container}>
          <Text style={styles.question}>You have scored {'\n'}{((correctAnswers / questions.length) * 100).toFixed(0)}%</Text>
          <TextButton onPress={this.restartQuizHandler}
                      buttonLabel='Restart Quiz'/>
        </View>
      )
    }
    return (
      <View style={styles.container}>

        <Text>{questionIndex + 1} / {questions.length}</Text>

        <View style={styles.questionCardContainer}>
          <View>
            <Text style={styles.question}>{questions[questionIndex].question}</Text>
            <TextButton onPress={this.displayAnswerHandler}
                        labelStyle={styles.answerBtnLabel}
                        btnStyle={styles.answerBtn}
                        buttonLabel='Show Answer'/>

            {displayAnswer && (<Animated.Text style={styles.answer}>{questions[questionIndex].answer}</Animated.Text>)}
          </View>
          <View style={styles.buttonContainer}>
            <TextButton onPress={this.correctHandler}
                        btnStyle={styles.correctBtn}
                        labelStyle={styles.correctBtnLabel}
                        buttonLabel='Correct'/>

            <TextButton onPress={this.incorrectHandler}
                        btnStyle={styles.incorrectBtn}
                        labelStyle={styles.incorrectBtnLabel}
                        buttonLabel='Incorrect'/>
          </View>
        </View>

      </View>
    )
  }
}

function mapStateToProps(decks, {navigation}) {
  const {deckId} = navigation.state.params;
  return {
    deck: decks[deckId],
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    flexDirection: 'column',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  questionCardContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  question: {
    fontSize: 30,
    margin: 10,
    textAlign: 'center'
  },
  answer: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center'
  },
  correctBtn: {
    borderColor: green,
    backgroundColor: green,
  },
  correctBtnLabel: {
    color: white,
    fontWeight: 'bold'
  },
  incorrectBtn: {
    backgroundColor: red,
    borderColor: red,
  },
  incorrectBtnLabel: {
    color: white,
    fontWeight: 'bold',
  },
  answerBtn: {
    backgroundColor: white,
    borderWidth: 0,
    margin: 10,
  },
  answerBtnLabel: {
    color: red,
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps)(QuizView);
