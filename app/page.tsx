import Game from "@/component/Game/Game";

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

export default function Home() {
  return (
    <div className = "main">
      <h1>SF6 Framedle</h1>

      <Game/>

      <footer>
        Made by Whale with no AI and with {footerValues[Math.floor(Math.random() * footerValues.length)]+ " "}
        Support ya locals
      </footer>
    </div>
  );
}
