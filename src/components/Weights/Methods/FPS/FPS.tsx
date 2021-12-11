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
    0: 'Suma wag jest poprawna',
    1: 'Suma wag jest mniejsza niż 100',
    2: 'Suma wag jest większa niż 100',
    3: ''
}

export default function FPS({ criteria }: CriteriaArray) {
    const [weights, setWeights] = useState<number[] | []>([])
    const [message, setMessage] = useState<string>('')
    const [sum, setSum] = useState<number>(0)

    useEffect(() => {
        setWeights(Array(Object.keys(criteria).length).fill(0))
    }, [])

    useEffect(() => {
        const currentSum = sumWeights(weights)
        setSum(currentSum)

        const status = checkSumWeights(currentSum, weights)
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

    const checkSumWeights = (sum: number, weights: number[]) => {
        if (weights.some(weight => weight === 0)) return 3

        // 0 - equal 100
        // 1 - too low
        // 2 - too much
        return sum === 100 ? 0 : sum < 100 ? 1 : 2
    }

    return (
        <Box style={{padding: '20px 0'}}>
            <Typography style={{padding: '10px 0'}}>Fixed Point Scoring metoda input - Suma wag: {sum} </Typography>
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
