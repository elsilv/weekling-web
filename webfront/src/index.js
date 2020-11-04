import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

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

  return (
    <div>
      <p>Klikkaamalla tietokantaan tulee merkintä</p>
      <button onClick={handleClick}>Klikkaa</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
