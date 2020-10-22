import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const App = () => {

  const handleClick = () => {

  axios.post('http://localhost:3001/', {
    clickedTimes: 'klikattu'
  })
  .then((response) => {
    console.log(response.data)
  }, (error) => {
    console.log(error)
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
