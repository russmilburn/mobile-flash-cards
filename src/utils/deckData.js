import {AsyncStorage} from 'react-native';
import {FLASH_CARD_STORAGE_KEY} from "./StorageAPI";
import {Notifications, Permissions} from 'expo'

const NOTIFICATION_KEY = 'mobile-flash-cards:notifications';

const deck = {
  StarWars : {
    id: 'StarWars',
    title : 'Star Wars',
    questions : [
      {
        question: 'In what year was the first Star Wars movie released?',
        answer: '1977',
      },
      {
        question: 'Which of the Star Wars films had a tagline of \'The battle continues\'?',
        answer: 'Star Wars: Episode V - The Empire Strikes Back',
      },
    ]
  },
  GameOfThrones : {
    id: 'GameOfThrones',
    title : 'Games of Thrones',
    questions: [
      {
        question: 'What is the very first episode called?',
        answer: 'Winter is Coming',
      },
      {
        question: 'What does John Snow know?',
        answer: 'Nothing',
      },
    ]
  },
  Computers : {
    id : 'Computers',
    title : 'Computers',
    questions : [
      {
        question : 'What do computers and air conditioners have in common?',
        answer : 'They are both useless when you open windows',
      },
      {
        question : 'Why did the programmer quit his job?',
        answer : 'Because he didn\'t get arrays',
      },
      {
        question: '["hip", "hip"]',
        answer : 'Hip Hip Array',
      },
      {
        question : 'What is an object in python?',
        answer : 'EVERYTHING 🎉',
      },
      {
        question : 'What is a dictionary',
        answer : 'A set of key value pairs',
      },
      {
        question: 'What library is PI stored in',
        answer : 'The Math library',
      },
    ]
  }
};

function setInitData(){
  AsyncStorage.setItem(FLASH_CARD_STORAGE_KEY, JSON.stringify(deck));
  return deck;
}

export function formatDeckResults(results) {
  return results === null
    ? setInitData()
    : JSON.parse(results);
}

function createNotification(){
  return {
    title:'',
    body: '',
    ios:{
      sound:true,
    },
    android:{
      sound: true,
      priority : 'high',
      sticky: false,
      vibrate : true,
    }
  }
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function setLocalNotifications(){
  AsyncStorage.getItem(NOTIFICATION_KEY, null)
    .then(JSON.parse)
    .then((data) => {
      if (data == null){
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if (status === 'granted'){
              Notifications.cancelAllScheduledNotificationsAsync();
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(12);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat : 'day',
                }
              );
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          })
      }
    })
}



