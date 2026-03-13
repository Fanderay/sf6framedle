import { FrameData } from "./frameData"

export type Setting = {
    revealPropertyFromIndex : {
      [K in keyof Partial<FrameData>]: number | null
    }
    allowedCharacters: string[] | null
  
}