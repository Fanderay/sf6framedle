import { FrameData, FrameValue } from "@/types/frameData"

export const isCorrect = (first: FrameValue, second: FrameValue) : boolean => {

    const firstValueType = first.valueType
    const firstValue = first.value

    const secondValueType = second.valueType
    const secondValue = second.value

    // This handles both none for first and second, since they only match exactly anyway.
    if (firstValueType === "none" || secondValueType === "none") {
        if (secondValueType === "none" && firstValueType === "none") {
            return true
        }
        return false
    }

    if (firstValueType === "standard") {

        if (secondValueType === "standard") {
            return (firstValue as number) === (secondValue as number)
        }

        return false
    }

    if (firstValueType === "multiOption") {
        if (secondValueType === "multiOption") {
            return (firstValue as number[]).every((val, idx) => {
                return val === (secondValue as number[])[idx]
            })
        }

        return false
    }

    if (firstValueType === "variableCharge") {
        if (secondValueType === "variableCharge") {
            return (firstValue as number[]).every((val, idx) => {
                return val === (secondValue as number[])[idx]
            })
        }

        return false
    }

    if (firstValueType === "infiniteAfter") {
        if (secondValueType === "infiniteAfter") {
            return (firstValue as number) === (secondValue as number)
        }

    }

    return false 
}


// In range or not - Whether the first is partial to second
export const isPartial = (first: FrameValue, second: FrameValue) : boolean => {
    const firstValueType = first.valueType
    const firstValue = first.value

    const secondValueType = second.valueType
    const secondValue = second.value

   
    // This handles both none for first and second, since they only match exactly anyway.
    if (firstValueType === "none" || secondValueType === "none") {
        return false
    }

    if (firstValueType === "standard") {
        if (secondValueType === "multiOption") {
            return (secondValue as number[]).includes((firstValue as number))
        }

        if (secondValueType === "variableCharge") {
            return (firstValue as number) >= Math.min(...(secondValue as number[])) && (firstValue as number) <= Math.max(...(secondValue as number[]))
        }

        if ( secondValueType === "infiniteAfter") {
            return (firstValue as number) >= (secondValue as number)
        }

        return false
    }

    if (firstValueType === "multiOption") {
        if (secondValueType === "standard") {
            return (firstValue as number[]).includes((secondValue as number))
        }
        if (secondValueType === "multiOption") {
            return (firstValue as number[]).some(f => (secondValue as number[]).includes(f))
        }

        if (secondValueType === "variableCharge") {
            return (firstValue as number[]).some(f => f >= Math.min(...(secondValue as number[])) && f <= Math.max(...(secondValue as number[])))
        }

        if ( secondValueType === "infiniteAfter") {
            return (firstValue as number[]).some(f => f >= (secondValue as number))
        }

        return false

    }

    if (firstValueType === "variableCharge") {
        if (secondValueType === "standard") {
            return (secondValue as number) >= Math.min(...(firstValue as number[])) && (secondValue as number) <= Math.max(...(firstValue as number[]))
        }
        if (secondValueType === "multiOption") {

            // One of them are within
            return (
                (Math.min(...(secondValue as number[])) >= Math.min(...(firstValue as number[])) && Math.min(...(secondValue as number[])) <= Math.max(...(firstValue as number[])))
                ||
                (Math.max(...(secondValue as number[])) >= Math.min(...(firstValue as number[])) && Math.max(...(secondValue as number[])) <= Math.max(...(firstValue as number[])))
            )
        }

        if (secondValueType === "variableCharge") {
            // Any intersection.
            return (
                Math.min(...(secondValue as number[])) <= Math.min(...(firstValue as number[])) &&
                Math.max(...(secondValue as number[])) >= Math.max(...(firstValue as number[])) 
            ) ||
            (
                Math.min(...(secondValue as number[])) <= Math.max(...(firstValue as number[])) &&
                Math.max(...(secondValue as number[])) >= Math.min(...(firstValue as number[]))
            )
            
        }

        if ( secondValueType === "infiniteAfter") {
            return Math.max(...(firstValue as number[])) >= (secondValue as number)
        }

        return false

    }

    if (firstValueType === "infiniteAfter") {

        if (secondValueType === "standard") {
            return (secondValue as number) >= (firstValue as number)
        }
        if (secondValueType === "multiOption") {
            return Math.max(...(secondValue as number[])) >= (firstValue as number) //|| Math.max(...(secondValue as number[])) <= (firstValue as number)
        }

        if (secondValueType === "variableCharge") {
            return Math.max(...(secondValue as number[])) >= (firstValue as number) 
        }

        if ( secondValueType === "infiniteAfter") {
            return true // always true, brain hurty
        }

        return false


    }
    return false
}


const calc = (checkValue:string, f: any, s:any) => {
    if (checkValue === "h") return s > f
    else return f > s
}

// Check if second value is higher/lower than first
// checkValue is "h" or "l"
export const isHigherLower = (first: FrameValue, second: FrameValue, checkValue: string ) => {
    const firstValueType = first.valueType
    const firstValue = first.value

    const secondValueType = second.valueType
    const secondValue = second.value

    if (checkValue !== "h" && checkValue !== "l") {
        console.error("What the fuck, isHigherLower", checkValue)
    }
   
    // This handles both none for first and second, since they only match exactly anyway.
    if (firstValueType === "none" || secondValueType === "none") {
        return false
    }

    if (firstValueType === "standard") {
        if (secondValueType === "standard") {
            return calc(checkValue, (firstValue as number), (secondValue as number))
        }

        if (secondValueType === "multiOption") {
            return (secondValue as number[]).some(s => calc(checkValue, (firstValue as number), s))
        }

        if (secondValueType === "variableCharge") {
            return (secondValue as number[]).some(s => calc(checkValue, (firstValue as number), s))
        }

        if ( secondValueType === "infiniteAfter") {
            if (checkValue == "h") return true
            return calc(checkValue, (firstValue as number), (secondValue as number) )
        }

        return false
    }

    if (firstValueType === "multiOption") {
        if (secondValueType === "standard") {
            return (firstValue as number[]).some(f => calc(checkValue, f, (secondValue as number)))
        }
        if (secondValueType === "multiOption") {
            if (checkValue === "h") {
                return Math.min(...(firstValue as number[])) < Math.max(...(secondValue as number[]))
            }
            else return Math.max(...(firstValue as number[])) > Math.min(...(secondValue as number[]))
        }

        if (secondValueType === "variableCharge") {
            if (checkValue === "h") {
                return Math.min(...(firstValue as number[])) < Math.max(...(secondValue as number[]))
            }
            else return Math.max(...(firstValue as number[])) > Math.min(...(secondValue as number[]))
        }

        if ( secondValueType === "infiniteAfter") {
            // always higher
            if (checkValue === "h") {
                return true
            }
            else {
                return Math.max(...(firstValue as number[])) > (secondValue as number)
            }
        }

        return false

    }

    if (firstValueType === "variableCharge") {
        if (secondValueType === "standard") {
            if (checkValue === "h") {
                return Math.min(...(firstValue as number[])) < (secondValue as number)
            }
            else {
                return Math.max(...(firstValue as number[])) > (secondValue as number)
            }
        }
        if (secondValueType === "multiOption") {
            if (checkValue === "h") {
                return Math.min(...(firstValue as number[])) < Math.max(...(secondValue as number[]))
            }
            else return Math.max(...(firstValue as number[])) > Math.min(...(secondValue as number[]))
        }

        if (secondValueType === "variableCharge") {
            if (checkValue === "h") {
                return Math.min(...(firstValue as number[])) < Math.max(...(secondValue as number[]))
            }
            else return Math.max(...(firstValue as number[])) > Math.min(...(secondValue as number[]))
        }

        if ( secondValueType === "infiniteAfter") {
            // always higher
            if (checkValue === "h") {
                return true
            }
            else {
                return Math.max(...(firstValue as number[])) > (secondValue as number)
            }
        }

        return false

    }

    if (firstValueType === "infiniteAfter") {
        if (checkValue === "h") {
            return true
        }


        if (secondValueType === "standard") {
            return (secondValue as number) > (firstValue as number)
        }
        if (secondValueType === "multiOption") {
            return Math.min(...(secondValue as number[])) < (firstValue as number) 
        }

        if (secondValueType === "variableCharge") {
            return Math.min(...(secondValue as number[])) < (firstValue as number) 
        }

        if ( secondValueType === "infiniteAfter") {
            return true
        }

        return false


    }
    return false

}





    