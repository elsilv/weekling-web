import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './pohja.css';

const App = () => {

  const handleClick = () => {

    axios.post('/', {
      date: new Date()
    })
      .then((response) => {
        console.log(response.data)
      }, (error) => {
        console.log(error.response)
      })
  }

  /*
  window.onload = function () {
    createChecks(12);
  }

  function createChecks(maara) {
    for (let i = 1; i < 8; i++) {
      var paiva = document.getElementById(i)
      for (let j = 0; j < maara; j++) {
        let checkCont = document.createElement("div")
        checkCont.className = "checkcontainer";
        paiva.appendChild(checkCont);

        let check = document.createElement('input');
        checkCont.appendChild(check);
        check.className = 'check';
        check.type = 'checkbox';
      }
    }
  } */

  return (
    <>
      <div>
        <p>Klikkaamalla tietokantaan tulee merkintä</p>
        <button onClick={handleClick}>Klikkaa</button>
      </div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
