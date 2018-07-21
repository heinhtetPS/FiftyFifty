## Fifty/Fifty (Work In Progress)

![alt text](https://github.com/heinhtetPS/weather-test/blob/master/public/preview.jpg "preview")

This is a simple single-page app that tests your knowledge of random statistics relating to world countries such as population, capital cities, size etc... Each questions has only 2 choices, making it a 50/50 chance of getting it right. However, can you do it 10 times in a row?

### MVP GOALS
- User is posed a question with 2 options to choose from.
- Questions are on the topics of world countries. Specifically population, size, capital cities, etc.
- All data used for the questions are real time and up to date as they are retrived from live data sources.
- Correct answers will yield points, wrong answers will cause you to lose those points. Get 10 questions in a row to win!

## Installation
Simply download the repo, cd into the directory and run npm -install. Before running the app itself, you must make sure the node server is running by typing node server.js. To run the app itself, use the command npm start.

### Tech Info
- The frontend utilizes React.js, specifically implemented using create-react-app for fast startup.
- Data is retrieved via a Node.js server using express.
- There is no backend or database as we are not persisting data across sessions.
- NPM libraries used:
  - request (to make easy API Calls)
  - extend (simple object merging)

### Implementation process outline and notes
- Create frontend Homepage container with question box, option 1 box, option 2 box.
- Every session, different data will be retrieved and questioned will be based on that data.
- Create API retrieval methods and make sure the data lines up
- Populate boxes with real data and fix the css

### Future Directions / Improvements


### Implementation issues/problems:
