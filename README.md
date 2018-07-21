## Fifty/Fifty (Work In Progress)

![alt text](https://github.com/heinhtetPS/weather-test/blob/master/public/preview.jpg "preview")

This is a simple single-page app that tests your knowledge of

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
- Use the DAILY API call instead of the forecast one which gives you a more appropriate results
- Implement unit converter option so user can choose to see F or C
- Instead of having cities set in stone, we can have the user choose a city via menu or search
- Have style options such as dark mode or light mode

### Implementation issues/problems:
- Problems displaying UTF-8 symbols
  - Fixed above by just copy pasting the symbol
- ditched async.waterfall in favor of just doing 5 requests in a row
- Data has now been passed into individual boxes. But for some reason props.info.main is undefined
- Props problem has been figured out, however it presents a new problem:
  - Props are undefined because re-render always re-pulls empty info from weathercontainer state
  - This is because STATE is not changed after API call
  - Need to use setState instead of extend inside API call
  - Fixed this problem by using forceUpdate, can probably also use complicated variations of setState
- next: Implement large page, fix css and icons, another api call for forecast?
  - large page has no props when it starts, just call the forecast API with 6 count, number 0 is today
- DANGER: Objects inside arrays that cannot be accessed by index!!! (this cost me 2-3 hours)
  - Example: `{ForecastList: [{etc: 10101}, {etc: 10101}, {etc: 10101}]}`
  - (Above array contains objects that track each day's weather info, but they cannot be accessed via `.ForecastList[0]`
  - Learn how to process these more easily
- DANGER: API call for forecast was misinterpreted. Each entry wasn't 1 day, it was an interval of 3 hours.
  - The daily? API call would not let me retrieve with the current API Key so I had to make due with the forecast data.
  - I simply rejected useless data from the same day by tracking which days had already been forecasted
