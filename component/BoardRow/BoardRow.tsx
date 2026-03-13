'use client'

import { useEffect, useState } from "react"
import { FrameData, FrameValue  } from "@/types/frameData"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"

import { isCorrect, isHigherLower, isPartial } from "@/utils/frameDataCompare"
import { Setting } from "@/types/general"

const colorMap =  {
    "correct" : "#1ea83cff",
    "partial" : "#a37b0bff",
    "wrong" : "#a31515ff"
}


const getRenderStyle = (equalType: string, answer:FrameData[keyof FrameData], value:FrameData[keyof FrameData] | null, showTransprent: boolean) => {

    if (!value || showTransprent) {
        return {
            backgroundColor: "transparent"
        }
    }

    if (equalType === "simple") {
        if (answer === value) {
            return { backgroundColor: colorMap.correct }
        }
        else return { backgroundColor: colorMap.wrong }
    }

    if (equalType === "frameData") {
        if (isCorrect(value as FrameValue, answer as FrameValue)) {
            return {
                backgroundColor: colorMap.correct
            }
        }
        if (isPartial(value as FrameValue, answer as FrameValue)) {
            return {
                backgroundColor: colorMap.partial
            }
        }
        return {
            backgroundColor: colorMap.wrong
        }

    }


    return {
        backgroundColor: "transparent"
    }

    
}

// Returns a partial of frameData that is to be rendered.
const getRevealedPropertyFrameData = (
        revealPropertyFromIndex : {
      [K in keyof Partial<FrameData>]: number | null
    },
        currentGuessIndex: number, 
        answer: FrameData  )  : Partial<FrameData> => {
    return Object.entries(revealPropertyFromIndex).reduce<Partial<FrameData>>((acc: Partial<FrameData>, [keyToReveal, indexToReveal]) => {
        if (indexToReveal !== null && currentGuessIndex >= indexToReveal ) {
            return {
                ...acc, 
                [keyToReveal]: answer[keyToReveal as keyof FrameData]
            }
        }
        return {...acc}
    }, {})
}

const HigherLower = ({
    rowIndex,
    currentGuessIndex,
    guessFrameData,
    answerFrameData,
    checkValue
} : {
    rowIndex : number,
    currentGuessIndex : number
    guessFrameData : FrameValue | null | undefined,
    answerFrameData: FrameValue,
    checkValue: string
} ) : any  => {

    // IM JANK I DONT CARE
    if (checkValue !== "l" && checkValue !== "h") return <FaCaretDown style={{visibility:"hidden"}}/>

    if (rowIndex < currentGuessIndex && guessFrameData && isHigherLower(guessFrameData, answerFrameData, checkValue)) {
        if (checkValue === "l"){
            return <FaCaretDown/>
        }

        else {
            return <FaCaretUp/>
        }
    }

    return <FaCaretDown style={{visibility:"hidden"}}/>
    
}



export default function BoardRow({
    rowState,
    currentGuess,
    answer,
    currentGuessIndex,
    rowIndex,
    // Reveal from which index for which rowIndex
    revealPropertyFromIndex
}: { 
    rowState: FrameData | null,
    answer:  FrameData,
    currentGuess:  FrameData | null,
    currentGuessIndex: number,
    rowIndex: number,
    revealPropertyFromIndex : {
      [K in keyof Partial<FrameData>]: number | null
    }
}) {

    // The state that will be rendered
    const [renderState, setRenderState] = useState<Partial<FrameData> | null>(null)

    useEffect(() => {
        // This is the current guess
        if (rowIndex === currentGuessIndex) {
            if (!currentGuess) setRenderState(getRevealedPropertyFrameData(revealPropertyFromIndex, currentGuessIndex, answer))
            else setRenderState({
                character: currentGuess.character,
                moveButton: currentGuess.moveButton,
                moveMotion: currentGuess.moveMotion
            })
        }
        // This is an already submitted guess
        else if (rowIndex < currentGuessIndex) {
            setRenderState(rowState)
        }
        // This is a futureGuess
        else if (rowIndex > currentGuessIndex) {
            // Check if properties should be revealed.
            setRenderState(getRevealedPropertyFrameData(revealPropertyFromIndex, currentGuessIndex, answer))
        }
        
    }, [rowIndex, currentGuessIndex, revealPropertyFromIndex, answer])
    

    return (
        <>
            <div className = "board-row-item" style = {getRenderStyle("simple", answer.character, renderState?.character ?? null, !!currentGuess && rowIndex === currentGuessIndex)}>
                {renderState?.character ?? "?"}
            </div>
            <div className = "board-row-item" style = {getRenderStyle("simple", answer.moveMotion, renderState?.moveMotion ?? null, !!currentGuess && rowIndex === currentGuessIndex)}>
                {renderState?.moveMotion ?? "?"}
            </div>
            <div className = "board-row-item" style = {getRenderStyle("simple", answer.moveButton, renderState?.moveButton ?? null, !!currentGuess && rowIndex === currentGuessIndex)}>
                {renderState?.moveButton?? "?"}
            </div>
            <div className = "board-row-item" style = {getRenderStyle("frameData", answer.startUp, renderState?.startUp ?? null, !!currentGuess && rowIndex === currentGuessIndex)}>
                <HigherLower 
                    rowIndex = {rowIndex}
                    currentGuessIndex = {currentGuessIndex}
                    guessFrameData = {renderState?.startUp}
                    answerFrameData = {answer.startUp}
                    checkValue = {"h"}
                />
                {renderState?.startUp?.rawValue ?? "?"}
                <HigherLower 
                    rowIndex = {rowIndex}
                    currentGuessIndex = {currentGuessIndex}
                    guessFrameData = {renderState?.startUp}
                    answerFrameData = {answer.startUp}
                    checkValue = {"l"}
                />
            </div>
            <div className = "board-row-item" style = {getRenderStyle("frameData", answer.onBlock, renderState?.onBlock ?? null, !!currentGuess && rowIndex === currentGuessIndex)} >
                <HigherLower 
                    rowIndex = {rowIndex}
                    currentGuessIndex = {currentGuessIndex}
                    guessFrameData = {renderState?.onBlock}
                    answerFrameData = {answer.onBlock}
                    checkValue = {"h"}
                />
                {renderState?.onBlock?.rawValue ?? "?"}
                <HigherLower 
                    rowIndex = {rowIndex}
                    currentGuessIndex = {currentGuessIndex}
                    guessFrameData = {renderState?.onBlock}
                    answerFrameData = {answer.onBlock}
                    checkValue = {"l"}
                />
            </div>
            <div className = "board-row-item" style = {getRenderStyle("frameData", answer.onHit, renderState?.onHit ?? null, !!currentGuess && rowIndex === currentGuessIndex)}>
                <HigherLower 
                    rowIndex = {rowIndex}
                    currentGuessIndex = {currentGuessIndex}
                    guessFrameData = {renderState?.onHit}
                    answerFrameData = {answer.onHit}
                    checkValue = {"h"}
                />
                {renderState?.onHit?.rawValue ?? "?"}
                <HigherLower 
                    rowIndex = {rowIndex}
                    currentGuessIndex = {currentGuessIndex}
                    guessFrameData = {renderState?.onHit}
                    answerFrameData = {answer.onHit}
                    checkValue = {"l"}
                />
            </div>
        </>
        


    )

}