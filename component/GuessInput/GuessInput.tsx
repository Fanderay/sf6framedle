
'use client'
import {useEffect, useState} from "react"
import frameData from "../../data/frameData.json"
import { uniqBy } from "lodash"


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

    const [char, setChar] = useState(frameData[0].character)


    const handleSubmit = () => {
        onSubmit()
    }

    const handleSelect = (e:any) => {
        const d = frameData.filter((({character}) => character === char))[e.target.value]

        onGuess([
            d.character,
            d.moveMotion,
            d.moveButton,
            d.startUp,
            d.onBlock,
            d.onHit
        ])
    }

    const handleCharSelect = (e:any) => {
        setChar(e.target.value)
        onGuess([null,null,null,null,null,null])
    }

    return (
        <div className = "guess-input-container">
            <select onChange = {handleCharSelect} defaultValue={"a.k.i"} className = "selector">
                {
                    uniqBy(frameData, "character").map(({character}, index)=> {
                        return <option key = {index} value = {character}>{character}</option>
                    })
                }
            </select>
            <select onChange={handleSelect} className = "selector">
                {
                    frameData.filter((({character}) => character === char)).map((f, index) => {
                        return (
                            <option key = {index} value = {index}>{f.character} - {f.moveMotion}</option>
                        )
                    })
                }

            </select>
            <button onClick = {handleSubmit} disabled={disabled} className = "select-button">Submit</button>
        </div>
    )

}