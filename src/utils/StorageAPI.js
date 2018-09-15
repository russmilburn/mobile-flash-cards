import {AsyncStorage} from 'react-native';
import {formatDeckResults} from './deckData';

export const FLASH_CARD_STORAGE_KEY = 'MobileFlashCards:decks';

export function getDecks() {
  return AsyncStorage.getItem(FLASH_CARD_STORAGE_KEY, null)
    .then(formatDeckResults)
}

export function getDeck() {

}

export function saveDeckTitle({id, title, questions}) {
  return AsyncStorage.mergeItem(FLASH_CARD_STORAGE_KEY, JSON.stringify({
    [id] : {
      id : id,
      title,
      questions
    }
  }))
}

export function addCardToDeck(deckId, {question, answer}){
  getDecks()
    .then((data) =>{
      data[deckId].questions.push({
        question,
        answer,
      });
      AsyncStorage.setItem(FLASH_CARD_STORAGE_KEY, JSON.stringify(data));
    })
}