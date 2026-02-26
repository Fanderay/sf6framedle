'use client'

import Game from "@/component/Game/Game";
import { useState } from "react";

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
    "Dezza playing Resident Evil."
  ]

  const [randIndex] = useState(Math.floor(Math.random() * footerValues.length))


  return (
    <div className = "main">
      <h1>SF6 Framedle</h1>

      <Game/>

      <footer>
        Made by Whale with no AI and with {footerValues[randIndex]+ " "}
        Support ya locals
      </footer>
    </div>
  );
}
