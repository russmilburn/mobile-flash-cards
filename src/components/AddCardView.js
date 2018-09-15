import React from 'react';
import {KeyboardAvoidingView, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import TextButton from "./TextButton";
import {black, gray, white} from "../utils/colors";
import {addQuestion} from "../actions";
import {NavigationActions} from "react-navigation";
import {addCardToDeck} from "../utils/StorageAPI";

class AddCardView extends React.Component {

  state = {
    questionInput: '',
    answerInput : '',
  };

  onChangeQuestionHandler = (questionInput) => {
    this.setState({
      questionInput
    });
  };

  onChangeAnswerHandler = (answerInput) => {
    this.setState({
      answerInput
    })
  };

  addQuestionHandler = () => {
    const {deckId} = this.props;
    const {questionInput, answerInput} = this.state;
    if (questionInput === '' || answerInput === ''){
      return
    }
    let question = {
      question: questionInput,
      answer: answerInput,
    };
    this.props.dispatch(addQuestion(deckId, question));

    addCardToDeck(deckId, question);

    this.toHome();
  };

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  };

  render() {
    const {questionInput, answerInput} = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

        <TextInput style={styles.inputField}
                   onChangeText={this.onChangeQuestionHandler}
                   placeholder='Enter your question'
                   value={questionInput}/>

        <TextInput style={styles.inputField}
                   onChangeText={this.onChangeAnswerHandler}
                   placeholder='Enter your answer'
                   value={answerInput}/>

        <TextButton buttonLabel='Submit'
                    onPress={this.addQuestionHandler}
                    btnStyle={styles.submitBtn}
                    labelStyle={styles.submitBtnLabel}/>


      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputField: {
    marginBottom: 40,
    padding: 5,
    borderWidth: 1,
    borderColor: gray,
    fontSize: 14,
    borderRadius: 5,
    height: 40,
    width: 350
  },
  submitBtn: {
    backgroundColor: black,
  },
  submitBtnLabel: {
    color: white,
  },
});

function mapStateToProps(decks, {navigation}) {
  const {deckId} = navigation.state.params;
  return {
    deckId,
  }
}

export default connect(mapStateToProps)(AddCardView)
