/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import reducer from './src/reducers/index';
import DeckListView from './src/components/DeckListView'
import AddDeckView from './src/components/AddDeckView'
import {gray, blue, white, black} from "./src/utils/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DeckDetails from "./src/components/DeckDetailsView";
import QuizView from "./src/components/QuizView";
import AddQuestionView from "./src/components/AddCardView";
import {setLocalNotifications} from "./src/utils/deckData";


function FlashCardStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: 20}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Decks : {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel :'Decks',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-albums' size={30} color={tintColor}/>
    }
  },
  AddDeck:{
    screen: AddDeckView,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    }
  }
}, {
  tabBarOptions:{
    activeTintColor: white,
    activeBackgroundColor: blue,
    inactiveTintColor: blue,
    inactiveBackgroundColor: white,
    tabStyle: {
      borderRadius: 2
    }
  }
});

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header : null,
      headerBackTitle: null,
    }
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions:{
      title: 'Deck',
      headerTintColor: white,
      headerStyle : {
        backgroundColor: black,
      }
    }
  },
  Quiz: {
    screen: QuizView,
    navigationOptions : {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    }
  },
  AddCard:{
    screen: AddQuestionView,
    navigationOptions : {
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    }
  }
});

export default class App extends Component<Props> {

  componentDidMount(){
    setLocalNotifications();
  }



  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <FlashCardStatusBar backgroundColor={gray} barStyle='light-content'/>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}