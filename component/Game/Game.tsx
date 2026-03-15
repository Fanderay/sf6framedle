'use client'
import { FrameData } from "@/types/frameData";
import { fill, isEqual } from "lodash";
import { useCallback, useEffect, useState } from "react";
import frameData from "../../data/frameData.json";
import {imageData} from "../../data/imageData";
import BoardRow from "../BoardRow/BoardRow";
import GuessInput from "../GuessInput/GuessInput";
import SettingModal from "../SettingModal/SettingModal";
import { Setting } from "@/types/general";
import Image from 'next/image'



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
    const [settings, setSettings] = useState<Setting>()

    const [answer, setAnswer] = useState<FrameData | null>(null)

    const [boardStates, setBoardState] = useState<(FrameData|null)[]>(defaultBoardState())

    const [currentGuess, setCurrentGuess] = useState<FrameData|null>(null)
    const [currentGuessIndex, setCurrentGuessIndex] = useState(0)

    const [isWin, setIsWin] = useState(false)
    const [isLose, setIsLose] = useState(false)


    // Realy janky.
    // image url contains all the possible URL for the image
    // the image error contains all index of the URl which produced an error
    // we dont render these, we also dont render if any of the successive images was successful.
    const [imageUrls, setImageUrls] = useState<string[]>([])
    const [imageError, setImageError] = useState<boolean[]>([true,true,true,true])


    const handleGuess = useCallback((guess : FrameData | null) => { 
        setCurrentGuess(guess)  
    }, [])

    const handleGuessSubmit = useCallback(() => {
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

    }, [answer, currentGuess, currentGuessIndex])

    const handleNewAnswer = useCallback(() => {
        setBoardState(defaultBoardState())

        if (settings) {
            setAnswer(generateAnswer(settings))
        }
    
        setCurrentGuess(null)
        setCurrentGuessIndex(0)



        setIsWin(false)
        setIsLose(false)
    }, [settings])

    useEffect(()=> {
        console.log(answer)
    }, [answer])

    useEffect(() => {
        setSettings({...(getDefaultSettings()), ...JSON.parse(localStorage.getItem("settings") ?? "{}")})
    }, [])

    useEffect(() => {
        if (settings) {
            setAnswer(generateAnswer(settings))
        }
    }, [settings])
    

    const handleSettingSave = useCallback((settings: Setting) => {
        setSettings(settings)
        localStorage.setItem("settings", JSON.stringify(settings))
    }, [])

    const handleImageError = useCallback((e: any) => {
        setImageError((s: boolean[]) => {
            const index = parseInt(e.target.alt)
            const newS = [...s]
            newS[index] = false
            return newS
        })
    }, [])

    useEffect(() => {
        if (answer) {
            setImageUrls([
                ...(imageData?.[answer.character]?.imageName?.[answer.moveName] ? [`${imageData?.[answer.character]?.folderPath}${imageData?.[answer.character]?.imageName?.[answer.moveName]}`]  : []) ,
                `${imageData?.[answer.character]?.folderPath}${answer.moveMotion.toLowerCase()}.png`,
                `${imageData?.[answer.character]?.folderPath}${answer.moveName.toLowerCase()}.png`,
                `${imageData?.[answer.character]?.folderPath}${answer.moveMotion.toLowerCase().replaceAll(">", "_").replace("(ca)", "_ca").replaceAll(" ", "")}.png`,
                `${imageData?.[answer.character]?.folderPath}SF6_${answer.character}_${answer.moveMotion.toLowerCase().replaceAll(">", "_").replace("(ca)", "_ca").replaceAll(" ", "")}.png`
            ])
        }
        
    }, [answer])

    useEffect(() => {
        setImageError(fill(Array(imageUrls.length), true))
    }, [imageUrls])

    if (!answer || !settings) return null

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
                        <div className = "winner-modal-image-container">
                        {
                            imageUrls.map((src, index) => {
                                return <Image
                                    key = {index}
                                    src = {src ?? null}  
                                    alt = {index.toString()}
                                    height = {80}
                                    width = {80}
                                    onError={handleImageError}
                                    style = {{display: imageError[index] && !imageError.slice(0,index).some(s => s)  ? "block" : "none"}}
                                    className = "winner-modal-image"
                                    quality={100}
                                    unoptimized= {true}
                                />
                            })
                        }
                        </div>
                    <span>Start up: {answer.startUp.rawValue} On block: {answer.onBlock.rawValue} On hit: {answer.onHit.rawValue}</span>
                </div>
                <button onClick = {handleNewAnswer} className="new-answer-button">Generate New Answer</button>
            </div>
            
        </div>

    )

}