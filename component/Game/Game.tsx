'use client'
import { FrameData } from "@/types/frameData";
import { fill, isEqual } from "lodash";
import { useEffect, useState } from "react";
import frameData from "../../data/frameData.json";
import BoardRow from "../BoardRow/BoardRow";
import GuessInput from "../GuessInput/GuessInput";
import SettingModal from "../SettingModal/SettingModal";
import { Setting } from "@/types/general";



const categories = [
    "Character",
    "Motion",
    "Button",
    "Start up",
    "On block",
    "On hit" 
]

const maxRow = 6

const getDefaultSettings = () : Setting => ({
    revealPropertyFromIndex : {
        character: 3,
        startUp: 5,
        onBlock: 6,
    },
    allowedCharacters: null
})

const defaultBoardState = () : null[] => fill(new Array(maxRow), null)

const generateAnswer = (setting: Setting) => {
    const {allowedCharacters} = setting
    const availableFrameData = frameData.filter(({character}) => {
        if (allowedCharacters) {
            return allowedCharacters.includes(character)
        }
        return true
    })
    const randIndex = Math.floor(Math.random() * availableFrameData.length)

    return availableFrameData[randIndex]
}

export default function Game() {

    
    const [showSettings, setShowSettings] = useState(false)
    const [settings, setSettings] = useState<Setting>({...(getDefaultSettings()), ...JSON.parse(localStorage.getItem("settings") ?? "{}")})

    const [answer, setAnswer] = useState<FrameData>(generateAnswer(settings))

    const [boardStates, setBoardState] = useState<(FrameData|null)[]>(defaultBoardState())

    const [currentGuess, setCurrentGuess] = useState<FrameData|null>(null)
    const [currentGuessIndex, setCurrentGuessIndex] = useState(0)

    const [isWin, setIsWin] = useState(false)
    const [isLose, setIsLose] = useState(false)


    const handleGuess = (guess : FrameData | null) => { 
        setCurrentGuess(guess)  
    }

    const handleGuessSubmit = () => {
        setBoardState(b => {
            let a = [...b]
            a[currentGuessIndex] = currentGuess

            return a 
        })

        if (isEqual(answer, currentGuess)) {
            setIsWin(true)
        }
        else if (currentGuessIndex + 1 >= maxRow ) {
            setIsLose(true)
        }
        else {
            setCurrentGuess(null)
        }

        setCurrentGuessIndex(c => (c + 1))

    }

    const handleNewAnswer = () => {
        setBoardState(defaultBoardState())

        setAnswer(generateAnswer(settings))

        setCurrentGuess(null)
        setCurrentGuessIndex(0)

        setIsWin(false)
        setIsLose(false)
    }

    useEffect(()=> {
        console.log(answer)
    }, [answer])
    

    const handleSettingSave = (settings: Setting) => {
        setSettings(settings)
        localStorage.setItem("settings", JSON.stringify(settings))
        setAnswer(generateAnswer(settings))
    }

    return (
        <div className = "game-container">
            <div>
                <button onClick = {handleNewAnswer} className="new-answer-button">Generate New Answer</button>
                <button onClick = {() => setShowSettings(true)} className="new-answer-button">Settings</button>
            </div>
            {
                settings.allowedCharacters ? <div>Limited to {settings?.allowedCharacters?.length ?? 0} character(s)</div>
                    :
                    null
            }

            <div className = "input-container">
                <GuessInput onGuess = {handleGuess} value = {currentGuess}/>
            </div>
            <div className = "game-table">
                <>
                {
                    categories.map((category, index) => {
                        return <div key ={index} className="game-head">{category}</div>
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
                            revealPropertyFromIndex={settings.revealPropertyFromIndex}
                        />
                    })
                }
                </>
                
            </div>
            <button onClick = {handleGuessSubmit} disabled={!currentGuess || isLose || isWin} className = "select-button">Submit</button>
            
            <SettingModal 
                maxRow={maxRow} 
                settings={settings} 
                isVisible = {showSettings} 
                onSave = {handleSettingSave} 
                onClose={() => setShowSettings(false)}
                getDefaultSetting= {getDefaultSettings}
            />

            <div className = "winner-modal" style ={{visibility: isWin || isLose ? "visible" : "hidden" }}>
                <div>
                    <span>YA {isWin ? "WIN" : isLose ? "LOSE" : "HOW THE FUCK DID YOU GET HERE "}. ANSWER WAS:</span>
                    <span>{answer.character} - {answer.moveName}</span>
                    <span>{answer.moveMotion}</span>
                    <span>Start up: {answer.startUp.rawValue} On block: {answer.onBlock.rawValue} On hit: {answer.onHit.rawValue}</span>
                </div>
                <button onClick = {handleNewAnswer} className="new-answer-button">Generate New Answer</button>
            </div>
            
        </div>

    )

}