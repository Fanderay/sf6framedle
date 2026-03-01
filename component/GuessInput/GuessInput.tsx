
'use client'
import { uniqBy, values } from "lodash"
import { useEffect, useState } from "react"
import Select, { SingleValue } from "react-select"
import frameData from "../../data/frameData.json"


export default function GuessInput({
    onGuess,
    onSubmit,
    disabled = false
}: {
    onGuess: (guess:any[]) => void,
    onSubmit: () => void,
    disabled: boolean
})
 {

    const [char, setChar] = useState({label: frameData[0].character, value: frameData[0].character})
    const [selectedGuess, setSelectedGuess] = useState<any>(null)


    const handleSelect = (newVal: any) => {
        setSelectedGuess(newVal)
    }

    const handleCharSelect = (newVal: any) => {
        setChar(newVal)
        setSelectedGuess(null)
    }

    useEffect(() => {
        const d = selectedGuess?.value
        let guess;
        if (!d) guess = [null, null, null, null, null, null]
        else {
            guess = [
                d.character,
                d.moveMotion,
                d.moveButton,
                d.startUp,
                d.onBlock,
                d.onHit
            ]
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