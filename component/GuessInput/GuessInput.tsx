
'use client'
import { uniqBy, values } from "lodash"
import { useEffect, useState } from "react"
import Select, { SingleValue } from "react-select"
import frameData from "../../data/frameData.json"

import { FrameData } from "@/types/frameData"

export default function GuessInput({
    onGuess,
    value
}: {
    onGuess: (guess:FrameData | null) => void,
    value: FrameData | null
})
 {

    const [char, setChar] = useState({label: frameData[0].character, value: frameData[0].character})
    const [selectedGuess, setSelectedGuess] = useState<{label: string, value: FrameData} | null>(null)


    const handleSelect = (newVal: any) => {
        setSelectedGuess(newVal)
    }

    const handleCharSelect = (newVal: any) => {
        setChar(newVal)
    }

    useEffect(() => {
        if (value === null) {
            
            setSelectedGuess(null)
        }
    }, [value])

    useEffect(() => {
        const d = selectedGuess?.value
        let guess;
        if (!d) guess = null
        else {
            guess = d
        }
        onGuess(guess)
    }, [selectedGuess])

    return (
        <div className = "guess-input-container">
            <Select
                options = {
                    uniqBy(frameData, "character").map(({character})=> ({
                        value: character,
                        label: character
                    })) 
                }
                onChange = {handleCharSelect}
                className = "selector"
                value = {char}
            />

            <Select
                options = {
                    [
                        ...frameData.filter((({character}) => character === char.value)).map((f) => {
                            return {
                                value: f,
                                label: `${f.character} - ${f.moveMotion}`
                            }
                        })
                    ]
                    
                }
                onChange = {handleSelect}
                value = {selectedGuess}
                className = "selector selector-move"
            />

        </div>
    )

}