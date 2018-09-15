import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import TextButton from "./TextButton";
import {black, blue, gray, white} from "../utils/colors";

class DeckDetailsView extends React.Component {

  startQuiz = () => {
    const {deck} = this.props;
    if (deck.questions.length ===0){
      return;
    }
    this.props.navigation.navigate('Quiz', {deckId: deck.id})
  };

  addQuestion = () =>{
    const {deck} = this.props;
    this.props.navigation.navigate('AddCard', {deckId: deck.id})
  };

  render() {
    const {deck} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.deckTitle}>{deck.title}</Text>
          <Text style={styles.deckSubTitle}>{deck.questions.length} cards</Text>
        </View>

        <View style={styles.btnContainer}>

          <TextButton onPress={this.addQuestion}
                      btnStyle={styles.addCardBtn}
                      labelStyle={styles.addCardLabel}
                      buttonLabel='Add Card'/>

          <TextButton onPress={this.startQuiz}
                      btnStyle={styles.startQuizBtn}
                      labelStyle={styles.startQuizLabel}
                      buttonLabel='Start Quiz'/>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  btnContainer: {},
  textContainer: {},
  addCardBtn: {
    borderColor: blue,
  },
  addCardLabel: {
    color: black,
  },
  startQuizBtn: {
    backgroundColor: black,
  },
  startQuizLabel: {
    color: white,
  },
  deckTitle:{
    textAlign:'center',
    marginBottom: 10,
    fontSize: 30
  },
  deckSubTitle: {
    textAlign:'center',
    marginBottom: 10,
    fontSize: 25,
    color: gray,
  }
});

function mapStateToProps(decks, {navigation}) {
  const {deckId} = navigation.state.params;
  return {
    deck: decks[deckId],
  }
}

export default connect(mapStateToProps)(DeckDetailsView);