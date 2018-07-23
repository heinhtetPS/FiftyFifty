## Fifty/Fifty (Work In Progress)

![alt text](https://github.com/heinhtetPS/weather-test/blob/master/public/preview.jpg "preview")

This is a single-page app meant to demonstrate creative usage of Node.js api calls and server capability. The server file is <50 lines and is a simple implementation of Node with Express but the frontend output is a quiz game with hundreds of possible questions and answers. The App tests your knowledge of random statistics relating to world countries such as population, capital cities, size etc... Each questions has only 2 choices, making it a 50/50 chance of getting it right. However, can you do it 10 times in a row?

### MVP GOALS
- User is posed a question with 2 options to choose from, repeating 10 times. At the end, the user is scored on how many questions they got correct out of 10. 
- Questions are on the topics of world countries and cover basic demographic and geographic info such as population, size, capital cities, etc.
- All data used for the questions are real time and up to date as they are retrieved from live data sources. (http://restcountries.eu/)
- Correct answers will yield points. Get 10 questions in a row to win!

## Installation
Simply download the repo, cd into the directory and run npm -install. Before running the app itself, you must make sure the node server is running by typing node server.js. To run the app itself, use the command npm start.

### Tech Info
- The frontend utilizes React.js, specifically implemented using create-react-app for fast startup.
- Upon starting the game, data is fetched via the Node server's endpoint which, in turn, fetches data from a live data source. The data then travels through the Node server and is served back to the frontend.
- There is no backend or database as we are not persisting data across sessions. Each session starts a fresh game with new data being retrieved.
- NPM libraries used:
  - request (to make easy API Calls)
  - bodyParser (to extract request params)
  - extend (simple object merging)

### Implementation process outline and notes
- Create frontend Homepage container with question box, option 1 box, option 2 box.
- Every session, different data will be retrieved and questioned will be based on that data.
- Create API retrieval methods and make sure the data lines up
- Populate boxes with real data and fix the css

### Future Directions / Improvements
- Additional questions can be added when additional algorithms for the answer guide are added.
- An endless mode where you build up score until you get one wrong. This can include a leaderboard system for highest scores. This will require adding a backend database to persist scores and player identities.
