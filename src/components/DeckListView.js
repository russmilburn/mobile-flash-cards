import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getDecks} from "../utils/StorageAPI";
import {receiveDecks} from "../actions";
import {white} from "../utils/colors";

class DeckListView extends React.Component {

  componentDidMount() {
    const {dispatch} = this.props;

    getDecks()
      .then((decks) => {
        dispatch(receiveDecks(decks));
      })
  }

  _keyExtractor = (item, index) => {
    return item.id
  };

  renderItem = ({item}) => {
    console.log(JSON.stringify(item));
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckDetails', {deckId:item.id, title:item.title})}>
        <View style={styles.deckCardContainer}>
          <Text style={styles.deckCardTitle}>{item.title}</Text>
          <Text style={styles.deckCardSubtitle}>{item.questions.length} Cards</Text>
        </View>
      </TouchableOpacity>
    )
  };

  render() {
    const {decks} = this.props;
    return (
      <View style={styles.deckListView}>
        <FlatList
          data={decks}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItem}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deckListView: {
    flex: 1
  },
  deckCardContainer: {
    flex: 1,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: white,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    }
  },
  deckCardTitle: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10,
  },
  deckCardSubtitle: {
    fontSize: 20,
    textAlign: 'center'
  }
});

function mapStateToProps(decks) {
  const a = Object.keys(decks).map((key) => {
    return decks[key];
  });
  return {
    decks: a
  }
}

export default connect(mapStateToProps)(DeckListView);