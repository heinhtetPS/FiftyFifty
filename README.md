## Fifty/Fifty (Countries Quiz)

[Live version](http://heinhtetps.info/FiftyFifty/)

![alt text](https://github.com/heinhtetPS/NodeAssesment/blob/master/public/screen.jpg "preview")

This is a single-page app meant to demonstrate creative usage of Node.js api calls and server capability. The server file is <50 lines and is a simple implementation of Node with Express, but the frontend output is a dynamic quiz game with thousands of possible question and country combinations. Fifty/Fifty aims to test your knowledge of random statistics relating to world countries such as population, capital cities, size etc... Each questions has only 2 choices, making it a 50/50 chance of getting it right. However, can you do it 10 times in a row?

### MVP GOALS
- User is posed a question with 2 options to choose from, repeating 10 times. At the end, the user is scored on how many questions they got correct out of 10.
- Questions are on the topics of world countries and cover basic demographic and geographic info such as population, size, capital cities, etc.
- All data used for the questions are real time and up to date as they are retrieved from live data sources. (http://restcountries.eu/)
- Correct answers will yield points. Get 10 questions in a row to win!

### Tech Info
- The frontend utilizes React.js, specifically implemented using create-react-app for fast startup.
- Upon starting the game, data is fetched via the Node server's endpoint which, in turn, fetches data from a live data source. The data then travels through the Node server and is served back to the frontend.
- There is no backend or database as we are not persisting data across sessions. Each session starts a fresh game with new data being retrieved.
- NPM libraries used:
  - request (to make easy API Calls)
  - bodyParser (to extract request params)
  - extend (simple object merging)

### Deploy

The app is deployed on my portfolio site (http://heinhtetps.info/FiftyFifty/). A deploy helper npm library named gh-pages was used to make a smooth deployment process to github pages. As I already have my github pages URL redirect to my personal portfolio domain, the app is then hosted on my portfolio domain. 

## Retrieving our data

When you press the START button, the application puts out a fetch request to the accompanying node server via the handleStart() function, shown below. In fact, this function invokes fetchCountry 20 times in order to get 2 random countries per question. To ensure variety, we use a getRandom() function and a simple process to reject duplicates in the same game.

```
handleStart() {
  for (let i = 0; i < 20; i++) {
    let usedValues = [];
    let random = this.getRandom();

    //prevent dupes
    while (usedValues.includes(random)) {
      random = this.getRandom();
    }
    this.fetchCountry(AllCodes[random]);
    usedValues.push(random);
  }
}
```

handleStart commands the app to invoke our asynchronous fetchCountry() method (below) which queries the /country route in our node server including a param which is a random country's alpha2Code, a commonly recognized 2 letter abbreviation for each country. AllCodes is a storage object containing all current country codes that exist. AllCodes[random] accesses a random index of that array and uses it to query the information of a specific country. The basis of our game logic lies in identifying these countries using this alpha2Code.

```
async fetchCountry(countryCode) {
    let finalData = {};
    const staticURL = 'https://restcountries.eu/rest/v2/alpha/'
    let fullURL = staticURL + countryCode;

    try {
      let response = await fetch(fullURL);
      finalData = await response.json();
      let newData = this.state.data.concat(finalData);
      this.setState({data: newData});
      if (this.state.data.length >= 18)
      this.setState({gameStarted: true});
    } catch (err) {
      alert(err);
      console.log('error with fetch');
    }
}
```
If the server is listening, it will invoke its country route, which in turn will fetch live data from http://restcountries.eu/ using the param to query a unique country. Inside the try block above, once the query succeeds, we will immediately insert the new data into our application state. Due to state immutability, I am using a method of concating the old data with the new data and overwriting the entire state each time. Remember: We have executed 20 queries in a row and state.data will end up with an array containing 20 JSON objects, each containing a unique country's stats.

From here, our data will travel from the Parent 'App.js' component into the 'main' component which hosts the game. This is achieved through providing the data as props when 'main' is created. Now the game has access to the data and can commence.

## Creating the game

Game flow is controlled by state.QuestionCount, which is a variable with 2 jobs: while it counts the question from 1-10, it also acts as an index to access props.countries (our large store of 20 random countries). Each side of the choice UI displays country info according to this same number. Right and left are differentiated using a simple offset value. Since QuestionCount starts at 1, offset for leftside will display country information in props.countries[0-9] and rightside will display props.countries[10-19]. Thus there are 2 static offset values: -1 for leftside and +9 for rightside. Since the countries are already pre-randomized, it does not matter that we are showing them in sequence. Below is an example of the HTML returned from React as it generates the UI.

```
<div className="optional-block">
  <img src={"https://www.countryflags.io/" + this.props.countries[this.state.QuestionCount + offset].alpha2Code + "/flat/64.png"} alt="flag"></img>
  <p>Capital City: {this.props.countries[this.state.QuestionCount + offset].capital}</p>
  <p>Population: {this.props.countries[this.state.QuestionCount + offset].population}</p>
  <p>Main Language: {this.props.countries[this.state.QuestionCount + offset].languages[0].name}</p>
  <p>Internet Domain: {this.props.countries[this.state.QuestionCount + offset].topLevelDomain[0]}</p>
</div>
```
As you can see above, flag pictures are pulled directly from an existing source, using the alpha2Code we already have. Each country's statistics are shown and offset is used to differentiate between leftside and rightside.

## Playing the game
Answers and points are determined by our handleAnswer function, which looks at 3 pieces of information to answer any question.
1) The question's text. To determine what type of question it is.
2) The 2 countries being compared (for example: props.countries[2] vs props.countries[12])
3) The player's chosen side via event handler.

```
handleAnswer(e) {
  let question = AllQuestions[this.state.CurrentQuestion];
  let chosenOffset = e.currentTarget.id === "left" ? -1 : 9;

    if (question.includes("population")) {
      this.answerCompareQues(this.props.countries, chosenOffset);
    } else {
      this.answerWhichQues(this.props.countries, chosenOffset);
    }
}
```

It uses different heuristics for each question type to determine the correct answer. Currently there are 2 types of questions: "Which" questions and "Compare" questions. In a "Which" question, a single attribute of the display is duplicated (such as flag) for 2 different countries. We ask the user to pick the side where the correct info is being shown. This is controlled by a "wildcard" variable which picks which side will contain the correct info. "Compare" questions simply compare 2 mathematical attributes such as population.

For debugging purposes, I have included a commented-out function called reveal, in the main component, which simply invokes console.log to display the current state and props.

### Current Issues / Bugs
- MAJOR: Due to how the 2 boxes display, LEFT is always the correct answer. Add some variable in OptionInfo to fix. (fixed)
- Sometimes, the answers seem to go out of sync with the questions, like its looking at a different country other than the ones displayed (fixed)
- Refactor inefficient methods like optionalInfo()
- Sometimes discrepancies in alpha2Codes cause flags to not display. Fix by pulling flags from the same source (have to use alpha3code instead).
- Sometimes for questions like LANG, both answers can be correct.

### Future Directions / Improvements
- The game system is modular, meaning that it can now be used to create 50/50 quizzes about any topic that we can retrieve API statistics on.  
- Instead of advancing immediately, show CORRECT or WRONG graphic and reveal the correct info on both sides.
- Add google maps to show location. Ask if this is the correct location.
- Additional questions can be added when additional algorithms for the answer guide are added.
- An endless mode where you build up score until you get one wrong. This can include a leaderboard system for highest scores. This will require adding a backend database to persist scores and player identities.
