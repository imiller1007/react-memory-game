import React from 'react';
import ClickImage from "./components/ClickImage";
import Wrapper from "./components/Wrapper";
import characters from "./characters.json";
import './App.css';

class App extends React.Component {

  state = {
    characters: characters,
    counter: 0,
    highScore: 0,
    correct: "Click an Image to Begin"
  };



  addPoint = () => {
    var count = this.state.counter
    count ++
    this.setState({counter: count})
  }

  updateHighScore = () => {
    var score = this.state.counter
    var highest = this.state.highScore
    if(score === 12){
      this.setState({correct: "You Got a Perfect Score!"})
    }
    if(highest <= score){
      this.setState({highScore: highest +1})
    }
    

  }

  reset = () => {
    var chars = this.state.characters
    for(let i = 0; i < chars.length; i++){
      chars[i].clicked = false
    }
    this.setState({characters: chars})
    this.setState({counter: 0})
    }


  processClick = id => {
    var chars = this.state.characters.map(char => {
      if(char.id === id){
        if(char.clicked === false){
          char.clicked = true
          this.addPoint()
          this.setState({correct: "You Guessed Correctly!"})
          this.updateHighScore()
        }
        else{
          this.setState({correct:"You Guessed Poorly..."})
          this.reset()
        }
      }
      return(char)
    })
    
    this.setState({characters: chars})
  }
    
  
  
  
  shuffle = () => {
    var charArray = this.state.characters
    var currentIndex = charArray.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = charArray[currentIndex];
      charArray[currentIndex] = charArray[randomIndex];
      charArray[randomIndex] = temporaryValue;
      this.setState({characters:charArray})
    }
  };

  componentDidMount() {
    console.log("mounted")
  }

  render() {
    return(
      <Wrapper>

      <div id="header">  
        <h1>Game of Thrones Memory Game</h1>
      </div>

      <div id="score">
        <h1>Score: {this.state.counter} | High Score: {this.state.highScore}</h1>
      </div>

      <h3>{this.state.correct}</h3>

      <div className="container">
        
        {this.state.characters.map(person => (
        <div className="col-md-3">
          <ClickImage
          id={person.id}
          key={person.id}
          image={person.image}
          shuffle={this.shuffle}
          counter={this.processClick}
          clicked={person.clicked}
          />
        </div>
          
      ))}
      
        </div>

      </Wrapper>
    )
  };

};


export default App;
