export type FrameValue = {
      "valueType": string,
      "value": number | null | number[],
      "rawValue": string
    }

export type FrameData = {
    "character": string,
    "moveMotion": string,
    "moveButton": string,
    "moveName": string,
    "startUp": FrameValue ,
    "onBlock": FrameValue ,
    "onHit": FrameValue ,
  }

