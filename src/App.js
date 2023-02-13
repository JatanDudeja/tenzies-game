import React from 'react'
import ReactDOM from 'react-dom'
import Dice from './component/Dice'
import {nanoid} from "nanoid"


export default function App(){

    const [dice, setDice] = React.useState(allNewDice())
    
    function generator(){
        return {
            value : (Math.floor(Math.random()*6) + 1),
            isHeld : false,
            id : nanoid()
        }
    }


    function allNewDice(){
        let arr = [];
        for(let i = 0; i < 10; i++){
            arr.push(generator())
        }
        return arr;
    }


    function rollDice(){
        setDice(prevDice => prevDice.map(di => {
            return di.isHeld ?  di : generator()
        }))
    }

    function holdDice(id){
        setDice(prevDice => prevDice.map(di => {
            if (di.id === id)
                return {...di, isHeld : !di.isHeld}
            else
                return di
        }))
    }

    const diceNew = dice.map(prevDice => (
        <Dice
            key = {prevDice.id}
            value = {prevDice.value}
            isHeld = {prevDice.isHeld}
            holdDice = {() => holdDice(prevDice.id)}/>
        )
    )

    return(
        <main className='app-container'>
            <div className='container'>
                {diceNew}
            </div>
            <button className = "roll-dice" onClick={rollDice}>Roll</button>
        </main>
    )
}