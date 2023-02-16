import React from 'react'
import ReactDOM from 'react-dom'
import Dice from './component/Dice'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


export default function App(){

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(function(){
        let check = true
        for(let i = 0; i < dice.length; i++){
            if(dice[i].isHeld === false){
                check = false
                break;
            }
        }


        if(check){
            let check2 = true
            let val = dice[0].value
            for(let i = 1; i < dice.length; i++){
                if(dice[i].value != val){
                    check2 = false
                    break;
                }
            }

            if(check2){
                setTenzies(true)
                console.log("You Won!");
            }
        }



    }, [dice])
    
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
        if(!tenzies){
            setDice(prevDice => prevDice.map(di => {
                return di.isHeld ?  di : generator()
            }))
        }
        else{
            setTenzies(false)
            setDice(allNewDice)
        }
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
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='container'>
                {diceNew}
            </div>
            <button className = "roll-dice" onClick={rollDice}>{tenzies ? "Start Game" : "Roll"}</button>
        </main>
    )
}