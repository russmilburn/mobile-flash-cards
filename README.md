## Table of Contents

- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [yarn install](#yarn-install)
  - [yarn start](#yarn-start)

yarn install should be used as npm 5 has a bug in it that will you will not able to run the project using expo

## Folder Structure

After creation, your project should look like this:

```
mobile-flash-cards
    README.md
    package.json - dependancey for tha app
    app.json
    App.js - entry point for the application, StackNavigator and Tab nav are created here
    src
        actions
            index.js - contains all actions for adding a deck and a card it used for redux
        components
            AddCardView.js - Form to add a question card to a specified deck
            AddDeckView.js - Form to add a new deck to the local database
            DeckDetailsView.js - Detailed view of the deck from here you can stgart a quiz or add a card
            DeckListView.js - List of decks that have been added to the app
            QuizView.js - View to display question, answer and result fo the quiz
            TextButton.js - a reusable Text Button that can change apperance based on the style you pass to it.
        reducers
            index.js - reducers used by redux to store and modify state
        utils
            colors.js - list of hex colors used for the application
            deckData.js - initial data added for the first two decks
            StorageAPI.js - API used to get, add and modify a deck 

## Available Scripts

In the project directory, you can run:



Installs all dependencies for the project to run
### 'yarn install'

Starts application server
### 'yarn start'

Application has been tested on Android and iOS, and will run within the expo deployment environment




