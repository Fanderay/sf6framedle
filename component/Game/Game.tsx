'use client'
import { useEffect, useState } from "react";
import frameData from "../../data/frameData.json"
import BoardRow from "../BoardRow/BoardRow";
import GuessInput from "../GuessInput/GuessInput";
import { fill } from "lodash";

const categories = [
    "Character",
    "Motion",
    "Button",
    "Start up",
    "On block",
    "On hit" 
]

const maxRow = 6

export default function Game() {

    const [answerIndex, setAnswerIndex] = useState(Math.floor(Math.random() * frameData.length))

    const [answer, setAnswer] = useState([
        frameData[answerIndex].character,
        frameData[answerIndex].moveMotion,
        frameData[answerIndex].moveButton,
        frameData[answerIndex].startUp,
        frameData[answerIndex].onBlock,
        frameData[answerIndex].onHit
    ])


    /* 
        "character": "ryu",
        "moveComand": "5",
        "moveButton": "LP",
        "startUp": "4",
        "recovery": "7",
        "onBlock": "-1",
        "onHit": "+4",
    */
    const [boardStates, setBoardState] = useState(fill(Array( maxRow), fill(Array(6), null)))

    const [currentGuess, setCurrentGuess] = useState(fill(Array(6), null))
    const [currentGuessIndex, setCurrentGuessIndex] = useState(0)

    const [isWin, setIsWin] = useState(false)
    const [isLose, setIsLose] = useState(false)

    const handleGuess = (guess: any[]) => { 
        setCurrentGuess(guess)  
    }
    const handleGuessSubmit = () => {
        setBoardState(b => {
            let a = [...b]
            a[currentGuessIndex] = currentGuess

            return a 
        })

        if (currentGuess.every((g,index) => g === answer[index])) {
            setIsWin(true)
        }
        else if (currentGuessIndex + 1 >= maxRow ) {
            setIsLose(true)
            setCurrentGuessIndex(c => (c + 1))
        }
        else {
            setCurrentGuessIndex(c => (c + 1))
            setCurrentGuess(fill(Array(6), null))
        }

    }

    const handleNewAnswer = () => {
        setBoardState(fill(Array( maxRow), fill(Array(6), null)))
        const newAnswerIndex = Math.floor(Math.random() * frameData.length)
        setAnswerIndex(newAnswerIndex)

        setAnswer([
            frameData[newAnswerIndex].character,
            frameData[newAnswerIndex].moveMotion,
            frameData[newAnswerIndex].moveButton,
            frameData[newAnswerIndex].startUp,
            frameData[newAnswerIndex].onBlock,
            frameData[newAnswerIndex].onHit
        ])

        setCurrentGuess(fill(Array(6), null))
        setCurrentGuessIndex(0)

        setIsWin(false)
        setIsLose(false)
    }

    useEffect(()=> {
        console.log(answer)
    }, [answer])

    return (
        <div className = "game-container">
            <button onClick = {handleNewAnswer} className="new-answer-button">Generate New Answer</button>
            <div className = "input-container">
                <GuessInput onGuess = {handleGuess} onSubmit = {handleGuessSubmit} disabled={currentGuess.some(a => !a) || isLose}/>
            </div>
            <div className = "game-table">
                <>
                {
                    categories.map(category => {
                        return <div className="game-head">{category}</div>
                    })
                }
                </>

                <>
                {
                    boardStates.map((state, index) => {
                        return <BoardRow 
                            key = {index}
                            rowState = {state} 
                            currentGuess = {currentGuess} 
                            currentGuessIndex = {currentGuessIndex}
                            rowIndex = {index}
                            answer = {answer} 
                            revealCharFromIndex = {3}
                            revealStartupFromIndex = {2}
                        />
                    })
                }
                </>
                
            </div>
            <button onClick = {handleGuessSubmit} disabled={currentGuess.some(a => !a) || isLose} className = "select-button">Submit</button>
        

            <div className = "winner-modal" style ={{visibility: isWin || isLose ? "visible" : "hidden" }}>
                <span>YA {isWin ? "WIN" : isLose ? "LOSE" : "HOW THE FUCK DID YOU GET HERE "}. ANSWER WAS:</span>
                <span>{answer[0]} - {answer[1]}</span>
                <span>Start up: {answer[3]} On block: {answer[4]} On hit: {answer[5]}</span>
            </div>
            
        </div>

    )

}