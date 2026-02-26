'use client'

import Game from "@/component/Game/Game";
import { useState } from "react";
import Image from 'next/image'


export default function Home() {

  const footerValues = [
    "Psi doing TK tatsu over my head.",
    "Zonate complaining about Lily in my ear.",
    "Tony downplaying Rashid and Viper.",
    "Joshy posting hitbox photos on Twitter.",
    "Proffesso throwing OD tiger shot.",
    "Suzu mashing on wake up.",
    "Chill setting up Blanka doll.",
    "OscarChamp kicking donkeys.",
    "Snowpoint collecting cards.",
    "TuggJohnson dodging the FT1000.",
    "Dezza playing Resident Evil.",
    "Coffee fireball drive rushing.",
    "Dano hitting the delay round wave",
    "Vollian collecting medals",
    "Freeser butting heads",
    "June taking selfies",
    "Chun fun burning out",
    "Bibek demon flipping",
    "LordP walking up and jabbing",
    "Grove posting Elena tech on Twitter",
    "RoF switching charactersm",
    "Fangrear dooming in #match-making",
    "Alter looking for sets",
    "Genja banning bots"
  ]

  const [randIndex, setRandIndex] = useState(Math.floor(Math.random() * footerValues.length))
  const [showJoshy, setShowJoshy] = useState(false)

  const handleClick = () => {
    setRandIndex(Math.floor(Math.random() * footerValues.length))
  }

  return (
    <div className = "main">
      <h1>SF6 Framedle</h1>

      <Game/>

      <footer>
        <span>Made by Whale with <span onClick = {() => setShowJoshy(j => !j)}>no AI</span> and with {footerValues[randIndex]+ " "}</span>
        <span onClick={handleClick}>Support ya locals</span>
      </footer>
      {
        showJoshy ? <Image style ={{position:"absolute"}} height={"500"} width={"500"} src = {"/Screenshot 2026-02-26 194635.png"} alt = "JOSHY"/> : null
      }
      
    </div>
  );
}
