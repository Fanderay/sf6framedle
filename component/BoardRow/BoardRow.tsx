'use client'

import { inRange } from "lodash"

const colorMap =  {
    "green" : "#1ea83cff",
    "orange" : "#a37b0bff",
    "red" : "#a31515ff"
}

const getTwoStep = (val:string) => {
    const twoStepMatchVal1 = val.match(/(\d*)\,(\d*)/)

    if (twoStepMatchVal1?.[1] && twoStepMatchVal1?.[2]) {
        return [parseInt(twoStepMatchVal1[1]), parseInt(twoStepMatchVal1[2])]
    }
    else {
        console.error("I FUCKE DUIP")
        return [0,0]
    }
}

const checkTwoStepMove = (guess: any, correct: any) => {

        const twoStepGuess = getTwoStep(guess)
        if (Array.isArray(correct)) {
                if (
                    inRange(twoStepGuess[0],correct[0],correct[1]) || 
                    inRange(twoStepGuess[1],correct[0],correct[1]) 
                ) {
                    return colorMap["orange"]
                }
                else return colorMap["red"]
            }
            else if (typeof correct === "string") {
                const twoStepMatchVal1 = correct.match(/(\d*)\,(\d*)/)
                if (twoStepGuess[0] === parseInt(twoStepMatchVal1?.[1] ?? "NaN")) return colorMap["orange"]
                if (twoStepGuess[0] === parseInt(twoStepMatchVal1?.[2] ?? "NaN")) return colorMap["orange"]
                if (twoStepGuess[1] === parseInt(twoStepMatchVal1?.[1] ?? "NaN")) return colorMap["orange"]
                if (twoStepGuess[1] === parseInt(twoStepMatchVal1?.[2] ?? "NaN")) return colorMap["orange"]
                return colorMap["red"]
                
            }
            else if (typeof correct === "number") {
                if (twoStepGuess.includes(correct)) return colorMap["orange"]
                return colorMap["red"]
            }
            return colorMap["red"]


}

const checkRange = (guess: number[], correct:any) => {
    if (Array.isArray(correct)) {
        if (
            (inRange(guess[0],correct[0],correct[1]) && inRange(guess[1],correct[0],correct[1]) )
        ) {
            return colorMap["orange"]
        }
        else return colorMap["red"]
    }
    else if (typeof correct === "string") {
        const twoStepMatchVal1 = correct.match(/(\d*)\,(\d*)/)
        if (inRange(parseInt(twoStepMatchVal1?.[1] ?? "NaN"), guess[0], guess[1])) return colorMap["orange"]
        if (inRange(parseInt(twoStepMatchVal1?.[2] ?? "NaN"), guess[0], guess[1])) return colorMap["orange"]
        return colorMap["red"]
        
    }
    else if (typeof correct === "number") {
        if (inRange(correct, guess[0], guess[1])) return colorMap["orange"]
    }
    return colorMap["red"]
}

const checkNumber = (guess: number, correct: any) => {

        if (Array.isArray(correct)) {
                if (
                    inRange(guess,correct[0],correct[1])
                ) {
                    return colorMap["orange"]
                }
                else return colorMap["red"]
            }
            else if (typeof correct === "string") {
                const twoStepMatchVal1 = correct.match(/(\d*)\,(\d*)/)
                if (guess === parseInt(twoStepMatchVal1?.[1] ?? "NaN")) return colorMap["orange"]
                if (guess === parseInt(twoStepMatchVal1?.[2] ?? "NaN")) return colorMap["orange"]
                return colorMap["red"]
                
            }
            return colorMap["red"]


}

const checkAnswer = (guess: any, correct: any, index: number) => {
    if (guess === correct) return colorMap["green"]
    if (correct === "N/A") return colorMap["red"]
    if (guess === "N/A") return colorMap["red"]
    else if (typeof guess === "string" && index >= 3) {
        return checkTwoStepMove(guess, correct)
    }
    else if (typeof guess === "number"  && index >= 3) {
        return checkNumber(guess, correct)
    }
    else if (Array.isArray(guess)  && index >= 3) {
        return checkRange(guess, correct)
    }
    return colorMap["red"]

}

const renderGuess = (guess: any) => {
    if (Array.isArray(guess)) {
        return guess.join(" - ")
    }
    else return guess
}

export default function BoardRow({
    rowState,
    currentGuess,
    answer,
    currentGuessIndex,
    rowIndex,
    // Reveal from which index
    revealCharFromIndex,
    // Reveal up to which index
    revealStartupFromIndex
}: { 
    rowState: any[],
    answer: any[],
    currentGuess: any[],
    currentGuessIndex: number,
    rowIndex: number,
    revealCharFromIndex : number,
    revealStartupFromIndex: number
}) {

    return (


        
            (rowIndex === currentGuessIndex ? currentGuess : rowState).map((guess, index) => {
                return <div
                    key ={index}
                    style = {{
                        backgroundColor: 
                            rowIndex >= revealCharFromIndex && index === 0 && currentGuessIndex === rowIndex ? 
                                colorMap["green"] :
                                rowIndex >= revealStartupFromIndex && index === 3 && currentGuessIndex === rowIndex? 
                                    colorMap["green"] :
                                    // If already guessed, check for answers
                                    rowIndex >= currentGuessIndex  ? 
                                        "transparent" : 
                                        checkAnswer(guess,answer[index], index)
                    }}
                >

                    {   
                    //reveal answer for 3rd guess onwards
                        rowIndex >= revealCharFromIndex && index === 0 && currentGuessIndex === rowIndex   ? answer[index] :
                            rowIndex >= revealStartupFromIndex && index === 3 && currentGuessIndex === rowIndex ? 
                                answer[index] :
                                renderGuess(guess) ?? "?"
                    }
                </div>
            })
        


    )

}