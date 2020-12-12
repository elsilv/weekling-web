import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './pohja.css';
import logo from './weekling_logo_1.png';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import $ from "jquery"

const App = () => {

    const [status, setStatus] = useState(true)

    // Taulukko mahdollisista kellonajoista
    var timesArray = [
        ['08'],
        ['09'],
        ['10'],
        ['11'],
        ['12'],
        ['13'],
        ['14'],
        ['15'],
        ['16'],
        ['17'],
        ['18'],
        ['19']
    ]

    // Taulukko päivistä, maanantai on 01, tiistai 02, jne.
    var daysArray = [
        ['00'],
        ['01'],
        ['02'],
        ['03'],
        ['04'],
        ['05'],
        ['06'],
        ['07'],
        ['00']
    ]

    // Uusien aikojen lisääminen
    const handleSubmit = () => {
        var inputElements = document.getElementsByClassName('check')
        var suitableTimes = []

        const search = window.location.search;
        const params = new URLSearchParams(search)
        const id = params.get('id')

        function makeDate(boolean) {
            for (var i = 0; i < inputElements.length; ++i) {
                if (inputElements[i].checked == boolean) {
                    var z = (inputElements[i].id).split(',')
                    var x = z[0]
                    var y = z[1].trimLeft()

                    // Luodaan tietojen pohjalta uusi Date()
                    var c = new Date()
                    c.setDate(daysArray[x].toString())
                    c.setHours(timesArray[y].toString())
                    c.setMinutes(0)
                    c.setSeconds(0)
                    c.setMonth(0)
                    c.setMilliseconds(0)
                    console.log(c)

                    suitableTimes.push(c)
                }
            }
        }

        if (status == false) { makeDate(false) }
        else { makeDate(true) }

        // Notifikaatiot lisäyksen onnistumisesta ja epäonnistumisesta
        const notyf = new Notyf()
        if (id == null || id.length != 24) { notyf.error('Id is wrong') }
        if (suitableTimes.length === 0) { notyf.error('Please, select some times before submitting') }

        else {
            notyf.success('Success!')
            axios.put('/', {
                times: suitableTimes,
                id: id
            })
                .then((response) => {
                    console.log(response.data)
                }, (error) => {
                    console.log(error.response)
                })

            setTimeout(function () { window.location.reload() }, 3000)
        }
    }

    window.onload = function () {
        createChecks(12)
        addDayClick()
    }

    function checkColor(event) {
        var box = event.target
        var cont = box.parentNode
        if (box.checked) {
            cont.style.backgroundColor = '#c3a41e'
        }
        else {
            cont.style.backgroundColor = '#292929'
        }
    }

    function addDayClick() {
        $('.dayName').each(function () {
            var divId = $(this).parent().attr('id')
            var parentDiv = $('#' + divId)

            $(this).on("click", function () {
                $('#' + divId).find(':checkbox').each(function () {
                    $(this).prop('checked', true)
                    $(this).parent().css('background-color', '#c3a41e')
                })
            })
        })
    }

    function checkColour(checkId, contId, x) {
        if (document.getElementById(checkId).checked) {
            console.log("klikattu")
            document.getElementById(contId).style.backgroundColor = '#000000'
        }
        else {
            document.getElementById(contId).style.backgroundColor = "FFFFFF"
        }
    }

    function checkBoxes(divId) {
        $('#' + divId).find(':checkbox').each(function () {
            $(this).prop('checked', true)
        })
    }

    function selectAll() {
        $('#kalenteri').find(':checkbox').each(function () {
            $(this).prop('checked', true)
            $(this).parent().css('background-color', '#c3a41e')
        })
    }

    function unselectAll() {
        $('#kalenteri').find(':checkbox').each(function () {
            $(this).prop('checked', false)
            $(this).parent().css('background-color', '#292929')
        })
    }

    function createChecks(maara) {
        for (let i = 1; i <= 7; i++) {
            var paiva = document.getElementById(i)
            var dayNow = new Date(Date.now()).getDay().toString()
            if (dayNow == 0) { document.getElementById(7).style.backgroundColor = '#c3a41e' }
            if (dayNow == i) {
                document.getElementById(i).style.backgroundColor = '#c3a41e'
            }

            for (let j = 0; j < maara; j++) {
                let checkCont = document.createElement("div")
                checkCont.className = "checkcontainer"
                checkCont.id = 'checkCont' + i + j
                checkCont.style.backgroundColor = '#292929'
                paiva.appendChild(checkCont)

                let check = document.createElement('input')
                checkCont.appendChild(check)
                check.className = 'check'
                var x = `${i}, ${j}` // määritellään id
                check.id = x
                check.type = 'checkbox'
                check.addEventListener('change', checkColor, false)
            }
        }
    }

    const search = window.location.search;
    const params = new URLSearchParams(search)
    const eventName = params.get('event')

    return (
        <html>
            <head>
                <meta charset="UTF-8" />
                <link type="text/css" href="pohja.css" />
            </head>
            <body id="vartalo">
                <div id="headerContainer">
                    <img src={`${logo}`} alt="logo" />
                    <div id="otsikko"> <h3>{ `${eventName}` }</h3> </div>
                </div>
                <div id="header"></div>
                <div id="instructions">
                    <p id="instructions-text">Please select available times and press Send.<br></br>
                    You can choose an entire day by clicking on the name, or change the input mode with
                                              the dropdown box above the calendar.</p>
                </div>

                <div id="buttons">
                    <button onClick={ () => setStatus(!status) }>{ status ? 'Add available times' : 'Add non-available times' }</button>
                    <div id="selectButtonDiv">
                        <button id="selectButton" onClick={selectAll}>
                            <div id="selectButtonText">Select all</div>
                        </button>

                        <button id="unselectButton" onClick={unselectAll}>
                            <div id="unselectButtonText">Unselect all</div>
                        </button>
                    </div>
                </div>

                <div id="kalenteri">
                    <aside class="sivu">
                        <ul class="left">
                            <li class="ajat">
                                <label className="ajatLabel">Times
                            <div class="time">
                                        <p class="teksti">8-9</p>
                                    </div>
                                    <div class="time">
                                        <p class="teksti">9-10</p>
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
                            <div class="group" id='1'>
                                <div class="dayName">Monday</div>
                            </div>
                        </li>
                        <li class="date">
                            <div class="group" id='2' >
                                <div class="dayName">Tuesday</div>
                            </div>
                        </li>
                        <li class="date">
                            <div class="group" id='3' >
                                <div class="dayName">Wednesday</div>
                            </div>
                        </li>
                        <li class="date">
                            <div class="group" id='4'>
                                <div class="dayName">Thursday</div>
                            </div>
                        </li>
                        <li class="date">
                            <div class="group" id='5'>
                                <div class="dayName">Friday</div>
                            </div>
                        </li>
                        <li class="date">
                            <div class="group" id='6'>
                                <div class="dayName">Saturday</div>
                            </div>
                        </li>
                        <li class="date">
                            <div class="group" id='7'>
                                <div class="dayName">Sunday</div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div id="buttondiv">
                    <button id="sendButton" onClick={handleSubmit}>
                        <div id="buttonText">Send</div>
                    </button>
                </div>

            </body>
        </html>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))