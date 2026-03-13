import { isCorrect, isHigherLower, isPartial } from "@/utils/frameDataCompare";



export const testPartial = () => {

    const testCases = [
        // Standard compare
        {
            testCaseF : {value:1, valueType:"standard", rawValue: ""},
            testCaseS : {value:null, valueType:"none", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value:1, valueType:"standard", rawValue: ""},
            testCaseS : {value:2, valueType:"standard", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value:1, valueType:"standard", rawValue: ""},
            testCaseS : {value:[2,10], valueType:"multiOption", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value:5, valueType:"standard", rawValue: ""},
            testCaseS : {value:[1,3], valueType:"multiOption", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value:1, valueType:"standard", rawValue: ""},
            testCaseS : {value:[1,3], valueType:"multiOption", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:3, valueType:"standard", rawValue: ""},
            testCaseS : {value:[1,3], valueType:"multiOption", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:1, valueType:"standard", rawValue: ""},
            testCaseS : {value:[2,10], valueType:"variableCharge", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value:11, valueType:"standard", rawValue: ""},
            testCaseS : {value:[1,10], valueType:"variableCharge", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value:1, valueType:"standard", rawValue: ""},
            testCaseS : {value:[1,10], valueType:"variableCharge", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:3, valueType:"standard", rawValue: ""},
            testCaseS : {value:[1,10], valueType:"variableCharge", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:10, valueType:"standard", rawValue: ""},
            testCaseS : {value:[1,10], valueType:"variableCharge", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:1, valueType:"standard", rawValue: ""},
            testCaseS : {value:2, valueType:"infiniteAfter", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value:3, valueType:"standard", rawValue: ""},
            testCaseS : {value:2, valueType:"infiniteAfter", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:3, valueType:"standard", rawValue: ""},
            testCaseS : {value:2, valueType:"infiniteAfter", rawValue: ""},
            res : true
        },
        
        // multiOption
        {
            testCaseF : {value:[1,2,3], valueType:"multiOption", rawValue: ""},
            testCaseS : {value:1, valueType:"standard", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[1,2,3], valueType:"multiOption", rawValue: ""},
            testCaseS : {value:2, valueType:"standard", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[1,2,3], valueType:"multiOption", rawValue: ""},
            testCaseS : {value:3, valueType:"standard", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[1,2,3], valueType:"multiOption", rawValue: ""},
            testCaseS : {value:4, valueType:"standard", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value:[2,3,5], valueType:"multiOption", rawValue: ""},
            testCaseS : {value:1, valueType:"standard", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value:[2,3,5], valueType:"multiOption", rawValue: ""},
            testCaseS : {value:[1,2], valueType:"multiOption", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[2,3,5], valueType:"multiOption", rawValue: ""},
            testCaseS : {value:[6,7,8], valueType:"multiOption", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value:[2,3,5], valueType:"multiOption", rawValue: ""},
            testCaseS : {value:[2,3], valueType:"multiOption", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[2,3,5], valueType:"multiOption", rawValue: ""},
            testCaseS : {value:[3,5], valueType:"multiOption", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[2,3,5], valueType:"multiOption", rawValue: ""},
            testCaseS : {value:[1,6], valueType:"multiOption", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value:[2,3,5], valueType:"multiOption", rawValue: ""},
            testCaseS : {value:[1,6], valueType:"variableCharge", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[7,8], valueType:"multiOption", rawValue: ""},
            testCaseS : {value:[1,6], valueType:"variableCharge", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value:[4,3,5], valueType:"multiOption", rawValue: ""},
            testCaseS : {value:[1,2], valueType:"variableCharge", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value:[3,4], valueType:"multiOption", rawValue: ""},
            testCaseS : {value:[5,8], valueType:"variableCharge", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value:[2,4], valueType:"multiOption", rawValue: ""},
            testCaseS : {value:[1,3], valueType:"variableCharge", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[2,4], valueType:"multiOption", rawValue: ""},
            testCaseS : {value:[2,3], valueType:"variableCharge", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[2,4], valueType:"multiOption", rawValue: ""},
            testCaseS : {value:[3,5], valueType:"variableCharge", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[2,4], valueType:"multiOption", rawValue: ""},
            testCaseS : {value:[3,4], valueType:"variableCharge", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[2,4], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: 2, valueType:"infiniteAfter", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[2,4], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[2,4], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: 1, valueType:"infiniteAfter", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[2,4], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: 5, valueType:"infiniteAfter", rawValue: ""},
            res : false
        },

        // variableCharge
        {
            testCaseF : {value:[1,3], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: 1, valueType:"standard", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[1,3], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: 2, valueType:"standard", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[1,3], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: 3, valueType:"standard", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[2,6], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: 1, valueType:"standard", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value:[1,3], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: 4, valueType:"standard", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value:[1,3], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [2,3], valueType:"multiOption", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[1,3], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [1,3], valueType:"multiOption", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[1,3], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,4], valueType:"multiOption", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[1,3], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [4,5], valueType:"multiOption", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value:[3,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [1,2], valueType:"multiOption", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value:[1,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [1,2], valueType:"variableCharge", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[1,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [2,3], valueType:"variableCharge", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[1,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,4], valueType:"variableCharge", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[1,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [2,5], valueType:"variableCharge", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[2,5], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [1,3], valueType:"variableCharge", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[2,3], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [1,5], valueType:"variableCharge", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[3,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [1,2], valueType:"variableCharge", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value:[3,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [5,6], valueType:"variableCharge", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value:[2,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: 1, valueType:"infiniteAfter", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[2,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: 2, valueType:"infiniteAfter", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[2,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[2,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: 4, valueType:"infiniteAfter", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value:[3,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: 5, valueType:"infiniteAfter", rawValue: ""},
            res : false
        },

        //infiniteAfter
        {
            testCaseF : {value: 2, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: 2, valueType:"standard", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value: 2, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: 3, valueType:"standard", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value: 2, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: 1, valueType:"standard", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [4,5], valueType:"multiOption", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [3,5], valueType:"multiOption", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [5,7], valueType:"multiOption", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [1,4], valueType:"multiOption", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [1,3], valueType:"multiOption", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [1,2], valueType:"multiOption", rawValue: ""},
            res : false
        },
        //
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [4,5], valueType:"variableCharge", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [3,5], valueType:"variableCharge", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [5,7], valueType:"variableCharge", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [1,4], valueType:"variableCharge", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [1,3], valueType:"variableCharge", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [1,2], valueType:"multiOption", rawValue: ""},
            res : false
        },
        //
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: 4, valueType:"infiniteAfter", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: 1, valueType:"infiniteAfter", rawValue: ""},
            res : true
        },

      
    ]

    for (const test of testCases) {
        const {testCaseF, testCaseS, res} = test

        if (isPartial(testCaseF, testCaseS) !== res) {
            console.error("Failed test\n", testCaseF, testCaseS, "\nExpected: " , res, "Got: ", isPartial(testCaseF, testCaseS))
        }
    }
}

export const testCorrect = () => {
    const testCases = [
        //standard
        {
            testCaseF : {value: 1, valueType:"standard", rawValue: ""},
            testCaseS : {value: 1, valueType:"standard", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value: 2, valueType:"standard", rawValue: ""},
            testCaseS : {value: 3, valueType:"standard", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value: 2, valueType:"standard", rawValue: ""},
            testCaseS : {value: 1, valueType:"standard", rawValue: ""},
            res : false
        },

        //multiOption
        {
            testCaseF : {value: [1,2], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [1,2], valueType:"multiOption", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value: [1,2], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [2,3], valueType:"multiOption", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value: [1,2], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [3,4], valueType:"multiOption", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value: [2,3], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [1,2], valueType:"multiOption", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value: [3,4], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [1,2], valueType:"multiOption", rawValue: ""},
            res : false
        },
        //variableCharge
        {
            testCaseF : {value: [3,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,4], valueType:"variableCharge", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value: [3,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [1,2], valueType:"variableCharge", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value: [2,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,4], valueType:"variableCharge", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value: [2,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [2,3], valueType:"variableCharge", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value: [3,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [1,2], valueType:"variableCharge", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value: [3,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [4,5], valueType:"variableCharge", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value: [3,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [5,6], valueType:"variableCharge", rawValue: ""},
            res : false
        },


        //infiniteAfter
        {
            testCaseF : {value: 1, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: 1, valueType:"infiniteAfter", rawValue: ""},
            res : true
        },
        {
            testCaseF : {value: 1, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: 2, valueType:"infiniteAfter", rawValue: ""},
            res : false
        },
        {
            testCaseF : {value: 2, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: 1, valueType:"infiniteAfter", rawValue: ""},
            res : false
        },

      
    ]

    for (const test of testCases) {
        const {testCaseF, testCaseS, res} = test

        if (isCorrect(testCaseF, testCaseS) !== res) {
            console.error("Failed test\n", testCaseF, testCaseS, "\nExpected: " , res, "Got: ", isCorrect(testCaseF, testCaseS))
        }
    }
}



export const testHigherLower = () => {
    const testCases = [
        //stamdard
        {
            testCaseF : {value: 1, valueType:"standard", rawValue: ""},
            testCaseS : {value: 1, valueType:"standard", rawValue: ""},
            hRes: false,
            lRes: false
        },
        {
            testCaseF : {value: 2, valueType:"standard", rawValue: ""},
            testCaseS : {value: 3, valueType:"standard", rawValue: ""},
            hRes: true,
            lRes: false
        },
        {
            testCaseF : {value: 2, valueType:"standard", rawValue: ""},
            testCaseS : {value: 1, valueType:"standard", rawValue: ""},
            hRes: false,
            lRes: true
        },
        {
            testCaseF : {value: 1, valueType:"standard", rawValue: ""},
            testCaseS : {value: [3,4], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: false
        },
        {
            testCaseF : {value: 5, valueType:"standard", rawValue: ""},
            testCaseS : {value: [3,4], valueType:"multiOption", rawValue: ""},
            hRes: false,
            lRes: true
        },
        {
            testCaseF : {value: 3, valueType:"standard", rawValue: ""},
            testCaseS : {value: [3,4], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: false
        },
        {
            testCaseF : {value: 4, valueType:"standard", rawValue: ""},
            testCaseS : {value: [3,4], valueType:"multiOption", rawValue: ""},
            hRes: false,
            lRes: true
        },
        {
            testCaseF : {value: 4, valueType:"standard", rawValue: ""},
            testCaseS : {value: [3,5], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: true
        },
        {
            testCaseF : {value: 2, valueType:"standard", rawValue: ""},
            testCaseS : {value: [3,5], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: false
        },
        {
            testCaseF : {value: 6, valueType:"standard", rawValue: ""},
            testCaseS : {value: [3,5], valueType:"variableCharge", rawValue: ""},
            hRes: false,
            lRes: true
        },
        {
            testCaseF : {value: 4, valueType:"standard", rawValue: ""},
            testCaseS : {value: [3,5], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: true
        },
        {
            testCaseF : {value: 3, valueType:"standard", rawValue: ""},
            testCaseS : {value: [3,5], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: false
        },
        {
            testCaseF : {value: 5, valueType:"standard", rawValue: ""},
            testCaseS : {value: [3,5], valueType:"variableCharge", rawValue: ""},
            hRes: false,
            lRes: true
        },
        {
            testCaseF : {value: 1, valueType:"standard", rawValue: ""},
            testCaseS : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            hRes: true,
            lRes: false
        },
        {
            testCaseF : {value: 4, valueType:"standard", rawValue: ""},
            testCaseS : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            hRes: true,
            lRes: true
        },


        //multiOption
        {
            testCaseF : {value: [3,5], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: 1, valueType:"standard", rawValue: ""},
            hRes: false,
            lRes: true
        },
        {
            testCaseF : {value: [3,5], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: 6, valueType:"standard", rawValue: ""},
            hRes: true,
            lRes: false
        },
        {
            testCaseF : {value: [3,5], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: 3, valueType:"standard", rawValue: ""},
            hRes: false,
            lRes: true
        },
         {
            testCaseF : {value: [3,5], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: 5, valueType:"standard", rawValue: ""},
            hRes: true,
            lRes: false
        },
        {
            testCaseF : {value: [3,5], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: 4, valueType:"standard", rawValue: ""},
            hRes: true,
            lRes: true
        },
        {
            testCaseF : {value: [3,6], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [1,2], valueType:"multiOption", rawValue: ""},
            hRes: false,
            lRes: true
        },
        {
            testCaseF : {value: [3,6], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [7,8], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: false
        },
        {
            testCaseF : {value: [3,6], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [6,8], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: false
        },
        {
            testCaseF : {value: [3,6], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [1,3], valueType:"multiOption", rawValue: ""},
            hRes: false,
            lRes: true
        },
        {
            testCaseF : {value: [3,6], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [4,5], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: true
        },
        {
            testCaseF : {value: [3,6], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [4,7], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: true
        },
        {
            testCaseF : {value: [3,6], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [2,4], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: true
        },
        {
            testCaseF : {value: [3,6], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [2,6], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: true
        },
        
        //
        {
            testCaseF : {value: [3,6], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [1,2], valueType:"variableCharge", rawValue: ""},
            hRes: false,
            lRes: true
        },
        {
            testCaseF : {value: [3,6], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [7,8], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: false
        },
        {
            testCaseF : {value: [3,6], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [6,8], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: false
        },
        {
            testCaseF : {value: [3,6], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [1,3], valueType:"variableCharge", rawValue: ""},
            hRes: false,
            lRes: true
        },
        {
            testCaseF : {value: [3,6], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [4,5], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: true
        },
        {
            testCaseF : {value: [3,6], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [4,7], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: true
        },
        {
            testCaseF : {value: [3,6], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [2,4], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: true
        },
        {
            testCaseF : {value: [3,6], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: [2,6], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: true
        },

        {
            testCaseF : {value: [3,6], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: 1, valueType:"infiniteAfter", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: [1,6], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: 1, valueType:"infiniteAfter", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: [1,2], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: 5, valueType:"infiniteAfter", rawValue: ""},
            hRes: true,
            lRes: false,
        },
        {
            testCaseF : {value: [1,5], valueType:"multiOption", rawValue: ""},
            testCaseS : {value: 5, valueType:"infiniteAfter", rawValue: ""},
            hRes: true,
            lRes: false,
        },
        //variableCharge
        {
            testCaseF : {value: [2,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: 1, valueType:"standard", rawValue: ""},
            hRes: false,
            lRes: true,
        },
        {
            testCaseF : {value: [2,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: 5, valueType:"standard", rawValue: ""},
            hRes: true,
            lRes: false,
        },
        {
            testCaseF : {value: [2,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: 2, valueType:"standard", rawValue: ""},
            hRes: false,
            lRes: true,
        },
        {
            testCaseF : {value: [2,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: 4, valueType:"standard", rawValue: ""},
            hRes: true,
            lRes: false,
        },
        {
            testCaseF : {value: [2,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: 3, valueType:"standard", rawValue: ""},
            hRes: true,
            lRes: true,
        },

        {
            testCaseF : {value: [1,2], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,5], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: false,
        },
        {
            testCaseF : {value: [1,3], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,5], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: false,
        },
        {
            testCaseF : {value: [6,7], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,5], valueType:"multiOption", rawValue: ""},
            hRes: false,
            lRes: true,
        },
        {
            testCaseF : {value: [6,7], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,6], valueType:"multiOption", rawValue: ""},
            hRes: false,
            lRes: true,
        },
        {
            testCaseF : {value: [4,5], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,6], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: [3,5], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,6], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: [2,5], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,6], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: [4,6], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,6], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: [4,7], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,6], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: true,
        },

        //
        {
            testCaseF : {value: [1,2], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,5], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: false,
        },
        {
            testCaseF : {value: [1,3], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,5], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: false,
        },
        {
            testCaseF : {value: [6,7], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,5], valueType:"variableCharge", rawValue: ""},
            hRes: false,
            lRes: true,
        },
        {
            testCaseF : {value: [6,7], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,6], valueType:"variableCharge", rawValue: ""},
            hRes: false,
            lRes: true,
        },
        {
            testCaseF : {value: [4,5], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,6], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: [3,5], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,6], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: [2,5], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,6], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: [4,6], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,6], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: [4,7], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: [3,6], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: [1,2], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            hRes: true,
            lRes: false,
        },
        {
            testCaseF : {value: [1,3], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            hRes: true,
            lRes: false,
        },
        {
            testCaseF : {value: [1,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: [3,4], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: [4,5], valueType:"variableCharge", rawValue: ""},
            testCaseS : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        //infiniteAfter
        {
            testCaseF : {value: 1, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: 3, valueType:"standard", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: 3, valueType:"standard", rawValue: ""},
            hRes: true,
            lRes: false,
        },
        {
            testCaseF : {value: 4, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: 3, valueType:"standard", rawValue: ""},
            hRes: true,
            lRes: false,
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [1,2], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [1,3], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [1,4], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [3,4], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: false,
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [4,5], valueType:"multiOption", rawValue: ""},
            hRes: true,
            lRes: false,
        },
        
        //
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [1,2], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [1,3], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [1,4], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [3,4], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: false,
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: [4,5], valueType:"variableCharge", rawValue: ""},
            hRes: true,
            lRes: false,
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: 1, valueType:"infiniteAfter", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            hRes: true,
            lRes: true,
        },
        {
            testCaseF : {value: 3, valueType:"infiniteAfter", rawValue: ""},
            testCaseS : {value: 4, valueType:"infiniteAfter", rawValue: ""},
            hRes: true,
            lRes: true,
        }
    
    ]

    for (const test of testCases) {
        const {testCaseF, testCaseS, hRes, lRes} = test
 
        if (isHigherLower(testCaseF, testCaseS, "h") !== hRes) {
            console.error("Failed test for higher\n", testCaseF, testCaseS, "\nExpected: " , hRes, "Got: ", isHigherLower(testCaseF, testCaseS, "h"))
        }
        if (isHigherLower(testCaseF, testCaseS, "l") !== lRes) {
            console.error("Failed test for lower\n", testCaseF, testCaseS, "\nExpected: " , lRes, "Got: ", isHigherLower(testCaseF, testCaseS, "l"))
        }
    }
}