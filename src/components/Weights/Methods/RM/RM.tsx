import react, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField
} from '@material-ui/core';

interface Criteria {
    id: number
    name: string
}

interface CriteriaArray {
    criteria: Criteria[]
}

const WEIGHTS_MESSAGE = {
    0: 'Ranking jest zdefiniowany poprawnie',
    1: 'Ranking nie może zawierać pozycji remisowych',
    2: 'Ranking powinien być zdefiniowany za pomocą kolejnych liczb od 1 do 10 i nie pomijać żadnych wartości',
    3: ''
}

export default function RM({ criteria }: CriteriaArray) {
    const [weights, setWeights] = useState<number[] | []>([])
    const [message, setMessage] = useState<string>('')
    const [targetSum, setTargetSum] = useState<number>(0)

    useEffect(() => {
        setWeights(Array(Object.keys(criteria).length).fill(0))
        setTargetSum(sumWeights(Array.from({ length: Object.keys(criteria).length }, (_, i) => i+1)))
    }, [])

    useEffect(() => {
        const status = validateInputWeights(weights)
        setMessage(WEIGHTS_MESSAGE[status])
    }, [weights])

    const onChangeWeight = (e: react.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        setWeights(weights.map((w, idx) => idx === index ? parseInt(e.target.value) : w))
    }

    const sumWeights = (arr: number[]) => {
        if (arr.length === 0) return 0
        const sum = (arr as number[]).reduce(function(sum: number, value: number) { return sum + value})
        return isNaN(sum) ? 0 : sum
    }

    const isValueRepeated = (arr: number[]) => {
        return arr.length !== new Set(arr).size
    }

    const validateInputWeights = (weights: number[]) => {
        if (weights.some(weight => weight === 0)) return 3

        if (isValueRepeated(weights)) return 1

        const sum = sumWeights(weights)
        return sum === targetSum ? 0 : 2
    }

    return (
        <Box style={{padding: '20px 0'}}>
            <Typography style={{padding: '10px 0'}}>Ranking Method metoda input</Typography>
            <Typography style={{padding: '10px 0'}}>{message}</Typography>
            {Object.keys(criteria).map((key, index) => {
              return (
                <Box style={{display: 'flex', alignItems: 'center', width: '100%'}} key={index}>
                    <Typography style={{width: '70%', paddingRight: '20px'}}>{criteria[parseInt(key)].name}</Typography>
                    <TextField
                      type="number"
                      variant="outlined"
                      style={{width: '100px'}}
                      value={weights[index] || ''}
                      onChange={(e) => onChangeWeight(e, index)}
                    />
                </Box>
              )
            })}
        </Box>
    )
}
