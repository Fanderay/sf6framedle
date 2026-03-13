'use client'
import { Setting } from "@/types/general";
import { cloneDeep, uniqBy } from "lodash";
import { useState } from "react";
import Select from "react-select";
import frameData from "../../data/frameData.json";


const revealOptions = (maxRow: number) => {
    return [...Array.from(Array(maxRow).keys().map(s => s+1)), null].map(n => getOptionsValue(n))
}

const getOptionsValue = (v:number|null) => {
    return {
            label: v ?? "Don't reveal",
            value: v
        }
}

const allCharacters = uniqBy(frameData, "character").map(({character})=> character)


export default function SettingModal({
    settings,
    isVisible,
    onSave,
    onClose,
    maxRow,
    getDefaultSetting
} : {
    settings: any
    isVisible: boolean
    onSave: (setting: any) => any
    onClose: () => any,
    maxRow: number,
    getDefaultSetting: () => Setting
}) {

    const [curSetting, setCurSetting] = useState<Setting>(cloneDeep(settings))

    const handleRevealSelect= (key: string) => ({value}:any)=>{
        setCurSetting((curSettings: any) => {
            return {
                ...curSettings,
                revealPropertyFromIndex: {
                    ...(curSetting.revealPropertyFromIndex),
                    [key] : value
                }
            }
        })
    }

    const handleCharacterCheck = (e: any) => {
        setCurSetting((curSettings: any) => {
            const {allowedCharacters} = curSetting
            let newAllowedCharacters : string[] | null = allowedCharacters ?? allCharacters

            if (e.target.checked) {
                newAllowedCharacters = [...(newAllowedCharacters ?? []), e.target.value]
            }
            else {
                newAllowedCharacters = [...(newAllowedCharacters ?? allCharacters)].filter(c => c !== e.target.value)
            }

            if (allCharacters.every(c => newAllowedCharacters?.includes(c))) {
                newAllowedCharacters = null
            }

            return {
                ...curSettings,
                allowedCharacters: newAllowedCharacters
            }
        })
    }

    const handleAllCharCheck = (e:any) =>{ 
        if (e.target.checked) {
            setCurSetting(c => ({...c, allowedCharacters: null}))
        }
        else {
            setCurSetting(c => ({...c, allowedCharacters: []}))
        }
    }


    return <div className = "setting-modal" style ={{visibility: isVisible? "visible" : "hidden" }}>
        
        <div>
            <button onClick = {() => {onSave(curSetting);onClose();}}>Save</button>
            <button onClick = {onClose}>Close</button>
        </div>

        <button onClick = {() => setCurSetting(getDefaultSetting())}>Restore default</button>

        <h3>Show hints</h3>
        <div className="settings-reveal-select">
            <label>Character</label>
            <Select className="setting-select" options={revealOptions(maxRow)} value = {getOptionsValue(curSetting.revealPropertyFromIndex?.character ?? null)} onChange = {handleRevealSelect("character")}/>
            <label>Motion</label>
            <Select className="setting-select" options={revealOptions(maxRow)} value = {getOptionsValue(curSetting.revealPropertyFromIndex?.moveMotion ?? null)} onChange = {handleRevealSelect("moveMotion")}/>
            <label>Button</label>
            <Select className="setting-select" options={revealOptions(maxRow)} value = {getOptionsValue(curSetting.revealPropertyFromIndex?.moveButton ?? null)} onChange = {handleRevealSelect("moveButton")}/>
            <label>Start up</label>
            <Select className="setting-select" options={revealOptions(maxRow)} value = {getOptionsValue(curSetting.revealPropertyFromIndex?.startUp ?? null)} onChange = {handleRevealSelect("startUp")}/>
            <label>On block</label>
            <Select className="setting-select" options={revealOptions(maxRow)} value = {getOptionsValue(curSetting.revealPropertyFromIndex?.onBlock ?? null)} onChange = {handleRevealSelect("onBlock")}/>
            <label>On hit</label>
            <Select className="setting-select" options={revealOptions(maxRow)} value = {getOptionsValue(curSetting.revealPropertyFromIndex?.onHit ?? null)} onChange = {handleRevealSelect("onHit")}/>
        </div>
        <label>Characters allowed</label>
        <div className="settings-char-select">  
            <div>
                <input type = "checkbox" checked = {curSetting?.allowedCharacters === null} onChange={handleAllCharCheck} />
                <label>Allow all</label>
            </div>
 
            {
                allCharacters.map((character) => {
                    return (
                        <div>
                            <input type = "checkbox" value={character} checked ={(curSetting?.allowedCharacters?.includes(character) ?? true)} onChange={handleCharacterCheck} />
                             <label>{character}</label>
                        </div>
                    )
})
            }
        </div>

        
    </div>


}