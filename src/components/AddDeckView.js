import React from 'react';
import {View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView} from 'react-native';
import TextButton from "./TextButton";
import {black, gray, white} from "../utils/colors";
import {addDeck} from "../actions";
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import {saveDeckTitle} from "../utils/StorageAPI";

class AddDeckView extends React.Component {

  state = {
    input: ''
  };

  onChangeTextHandler = (input) => {
    this.setState({
      input
    });
  };

  addDeckHandler = () => {
    const {input} = this.state;
    const key = input.split(' ').join('');
    let deck = {
      id: key,
      title: input,
      questions: [],
    };
    this.props.dispatch(addDeck(deck));

    this.setState({
      input:'',
    });

    saveDeckTitle(deck);

    this.toHome();

  };

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
  };

  render() {
    const {input} = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View>
          <Text style={styles.titleLabel}>What is the title of your new deck?</Text>

          <TextInput style={styles.deckTitleInput}
                     onChangeText={this.onChangeTextHandler}
                     placeholder='Deck title'
                     value={input}/>

          <TextButton buttonLabel='Create Deck'
                      onPress={this.addDeckHandler}
                      btnStyle={styles.submitBtn}
                      labelStyle={styles.submitBtnLabel}/>
        </View>
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
  titleLabel: {
    fontSize: 30,
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
  },
  deckTitleInput: {
    marginBottom: 40,
    marginLeft: 10,
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

export default connect()(AddDeckView)