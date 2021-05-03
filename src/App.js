import './App.css';
import React from 'react';
import axios from 'axios';
import M from 'materialize-css/dist/js/materialize.min.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      randomFlag: {},
      randomOpt: [],
      correctAnswers: 0,
      winner: '',
      countdown: 60,
      background: { backgroundColor: 'lightslategray' },
      currentCorrect: [],
      capital: [],
      disabled: false,
      // languages: '',
      // capital: '',
    };
    this.randomFlag = this.randomFlag.bind(this);
    this.isCorrect = this.isCorrect.bind(this);
    this.countdown = this.countdown.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  async componentDidMount() {
    try {
      const res = await axios.get('https://restcountries.eu/rest/v2/all');
      const countries = res.data;
      this.setState({ countries });
      this.randomFlag();
      this.countdown();
      M.AutoInit()
    } catch (error) {
      console.log('error in componentDidMount');
    }
  }

  randomFlag() {
    const { countries } = this.state;
    const random1 =
      countries[Math.floor(Math.random() * this.state.countries.length)];
    const random2 =
      countries[Math.floor(Math.random() * this.state.countries.length)];
    const random3 =
      countries[Math.floor(Math.random() * this.state.countries.length)];
    const random4 =
      countries[Math.floor(Math.random() * this.state.countries.length)];
    const randomOpt = [random1.name, random2.name, random3.name, random4.name];
    randomOpt.sort(() => {
      return 0.5 - Math.random();
    });
    this.setState({
      randomFlag: random1,
      randomOpt: randomOpt,
      winner: '',
    });
  }

  isCorrect(event) {
    const correct = this.state.randomFlag.name;
    const guess = event.target.value;
    if (correct === guess) {
      this.setState({
        winner: 'Correct!',
        correctAnswers: this.state.correctAnswers + 1,
        background: { backgroundColor: 'mediumseagreen' },
        currentCorrect: [...this.state.currentCorrect, this.state.randomFlag.name],
        capital: [...this.state.capital, this.state.randomFlag.capital],
        // language: this.state.randomFlag.languages,
        // capital: this.state.randomFlag.capital
      });
      console.log(this.state.currentCorrect)
      console.log(this.state.capital)
      console.log(this.randomFlag.capital)
      this.randomFlag();
    } else {
      this.setState({
        winner: 'Incorrect!',
        background: {backgroundColor: 'maroon'}
      });
    }
  }

  countdown() {
    this.timeInterval = setInterval(() => {
      this.setState((prevState) => ({
        countdown: prevState.countdown - 1,
      }));
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timeInterval);
  }

  playAgain() {
   window.location.reload(false)
  }

  render() {
    const { randomFlag, correctAnswers, countdown } = this.state;
    return (
      <div className="App" style={this.state.background}>
  
        <div className = "correct-list-outer">
        <ul className='collapsible'>
          <p className = 'correct-text'>Your Correct Guesses:</p>
          
        {this.state.currentCorrect.map((current) => {
          return (
            <li key={randomFlag.id}>

              <div id='list' className="collapsible-header">{current}</div>

              {this.state.capital.map((currentCapital) => {
                return (
                  <p id = "more-info" className="collapsible-body"> <span>Capital: {currentCapital}</span></p>
                )
              })}
           
            </li>
               )
        })}
        </ul>
</div>
        


        
        <div id="right-side">

          <p className = "title">Guess That Flag!</p>
            <p className="sub-title">How Many Countries Can You Guess In 1 Minute?</p>
          
          <p className="timer">Time Remaining: {countdown > 0 ? countdown : "Time's Up!"}</p>
          <div>
        <img
          className="flag-img"
          alt="randomFlag"
          src={randomFlag.flag}
            /> 
          </div>


          <fieldset disabled = {countdown < 0 ? true : false}>
          <div className = "bottom-btns">
            <button
              id="randomize"
          onClick={(event) => this.isCorrect(event)}
          className="waves-effect waves-light btn"
          value={this.state.randomOpt[0]}
        >
          {this.state.randomOpt[0]}
        </button>
            <button
           id="randomize" 
          onClick={(event) => this.isCorrect(event)}
          className="waves-effect waves-light btn"
          value={this.state.randomOpt[1]}
        >
          {this.state.randomOpt[1]}
        </button>
            <button
              id="randomize"
          onClick={(event) => this.isCorrect(event)}
          className="waves-effect waves-light btn"
          value={this.state.randomOpt[2]}
        >
          {this.state.randomOpt[2]}
        </button>
            <button
              id="randomize"
          onClick={(event) => this.isCorrect(event)}
          className="waves-effect waves-light btn"
          value={this.state.randomOpt[3]}
        >
          {this.state.randomOpt[3]}
          </button>
          </div>
          </fieldset>
      

       
          
        <p className = "correct-ans-text">Number of Correct Answers: {correctAnswers}</p>

        <div className ="top-btns">
        <button
          id="randomize"
          className="waves-effect waves-light btn"
          onClick={() => this.randomFlag()}
        >
          Randomize!
        </button>
          <button id="randomize" className="waves-effect waves-light btn" onClick={() => this.playAgain()}>Play Again</button>
          </div>
        </div>
        </div>
    );
  }
}

export default App;
