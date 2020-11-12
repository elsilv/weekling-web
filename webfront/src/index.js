import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './pohja.css';

const App = () => {

    const handleClick = () => {

        axios.post('/', {
            times: new Date()
        })
            .then((response) => {
                console.log(response.data)
            }, (error) => {
                console.log(error.response)
            })
    }

    const handlePut = () => {

        axios.put('/', {
            times: new Date()
        })
            .then((response) => {
                console.log(response.data)
            }, (error) => {
                console.log(error.response)
            })
    }

    const handleSubmit = () => {
        var checkedValue = null;
        var inputElements = document.getElementsByClassName('check');
        for (var i = 0; inputElements[i]; ++i) {
            if (inputElements[i].checked) {
                console.log(inputElements[i].id + '  on valitun ajan sijainti')
                checkedValue = inputElements[i].value;
                break;
            }
        }
    }

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
                var x = `${i}, ${j}`
                check.id = x //paiva.id // kertoo mikä päivä on (idn)
                check.type = 'checkbox';
            }
        }
    }

    return (
        <html>
            <head>
                <meta charset="UTF-8" />
                <link type="text/css" href="pohja.css" />
                <script src="pohja.js"> </script>
            </head>
            <body id="vartalo">
                <h1 id="otsikko">Weekling-bot</h1>
                <div id="kalenteri">
                    <aside class="sivu">
                        <ul class="left">
                            <li class="ajat">
                                <label className="ajatLabel">Times
                            <div class="time">
                                        <p class="teksti">8-9</p>
                                    </div>
                                    <div class="time" id='kissa'>
                                        <p class="teksti" id='koira'>9-10</p>
                                    </div>
                                    <div class="time">
                                        <p class="teksti">10-11</p>
                                    </div>
                                    <div class="time">
                                        <p class="teksti">11-12</p>
                                    </div>
                                    <div class="time">
                                        <p class="teksti">12-13</p>
                                    </div>
                                    <div class="time">
                                        <p class="teksti">13-14</p>
                                    </div>
                                    <div class="time">
                                        <p class="teksti">14-15</p>
                                    </div>
                                    <div class="time">
                                        <p class="teksti">15-16</p>
                                    </div>
                                    <div class="time">
                                        <p class="teksti">16-17</p>
                                    </div>
                                    <div class="time">
                                        <p class="teksti">17-18</p>
                                    </div>
                                    <div class="time">
                                        <p class="teksti">18-19</p>
                                    </div>
                                    <div class="time">
                                        <p class="teksti">19-20</p>
                                    </div>
                                </label>
                            </li>
                        </ul>
                    </aside>
                    <ul class="k">
                        <li class="date">
                            <div class="group" id='1'>Monday</div>
                        </li>
                        <li class="date">
                            <div class="group" id='2'>Tuesday</div>
                        </li>
                        <li class="date">
                            <div class="group" id='3'>Wednesday</div>
                        </li>
                        <li class="date">
                            <div class="group" id='4'>Thursday</div>
                        </li>
                        <li class="date">
                            <div class="group" id='5'>Friday</div>
                        </li>
                        <li class="date">
                            <div class="group" id='6'>Saturday</div>
                        </li>
                        <li class="date">
                            <div class="group" id='7'>Sunday</div>
                        </li>
                    </ul>
                </div>

                <button id="sendButton">
                    <div id="buttonText">Send</div>
                </button>
                <button onClick={handleClick}>Klikkaa</button>
                <button onClick={handleSubmit}>Testaus</button>
                <button onClick={handlePut}>Put Testaus</button>
            </body>
        </html>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
