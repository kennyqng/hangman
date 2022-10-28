import './App.css';
import {useState, useRef, React} from "react";

function App() {
  const library = [
    "Zoo",
    "computer",
    "chetah",
    "California",
    "friend"
  ]
  const [guessCounter, setGuessCounter] = useState(0);
  const [word, setWord] = useState(["s","t", "a","r","t"]);

  const [blank, setBlank] = useState(["s","t", "a","r","t", "^"]);

  const letterRef = useRef(null);

  function stringToArray (word) {
    let arrayWord = [];
    for (let i = 0; i < word.length; i++) {
      arrayWord[i] = word.slice(i, i + 1);
    }
    setWord(arrayWord);
    console.log("unknown word: " + word);
  };
  
  const [guessLetter, setGuessLetter] = useState("");
  const [displayType, setDisplayType] = useState("none");
  
  function blankLength(word) {
    console.log("blank word: " + word);
    let arr = [];
    for(let i = 0; i < word.length; i++) {
      arr[i] = "_ ";
    }
    setBlank(arr);
  }
  
  function newGame() {
    const guess = library[Math.floor(Math.random() * 5)];
    stringToArray(guess);
    blankLength(guess);
    setDisplayType("none");
  }

  function giveUp () {
    if(displayType === "none") {
      setDisplayType("");
    } else setDisplayType("none");
  }
  
  function submit(l) {
    let letter = l.toLocaleLowerCase();
    let matchedIndex = [];
    let blankCopy = blank.slice();
    for(let i = 0; i < word.length; i++) {
      if(word[i].toLocaleLowerCase() === letter) {
        matchedIndex += i;
      }
    }
    if (matchedIndex.length > 0){
      alert("There are " +matchedIndex.length + letter);
      for(let i = 0; i < matchedIndex.length; i++) {
        blankCopy[matchedIndex[i]] = word[matchedIndex[i]];
      }
      setBlank(blankCopy);
    } else {
      setGuessCounter(guessCounter + 1);
      alert("there are no " + letter + " :(");
      console.log(guessCounter);
    };
    if(guessCounter > 5) {
      setGuessCounter(0);
      setBlank(["s","t", "a","r","t"]);
      setWord(["s","t", "a","r","t"]);
      alert("Sorry, you ran out of guesses.")
    };
    letterRef.current.value = '';
  }
  
  return (
    <div className="Hangman">
      <button className='new-game' onClick={() => newGame()}>New Game</button>
      <div className='guessBoard'>
        {blank}
        <p className='spacing'></p>
      </div>
      <div className='user-input'>
        <input className='letter-input' 
        placeholder='enter a letter'
        ref={letterRef}
        maxLength="1"
        onChange={(e) => setGuessLetter(e.target.value)}></input>
        <button className='submit-guess' type="submit" onClick={() => submit(guessLetter)}>Submit</button>
      </div>

      <div> guesses: {guessCounter}</div>
      <div>
      <p className='answer' style={{display:displayType}} >the word is: {word}</p>
      <button onClick={() => giveUp()}>show answer</button>
      </div>

    </div>
  );
}

export default App;
