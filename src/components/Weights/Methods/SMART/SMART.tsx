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
    0: 'Wagi są zdefiniowane poprawnie',
    1: 'Najmniejsza wartość powinna wynosić 10',
    2: 'Wagi nie powinny sie powtarzać',
    3: ''
}

export default function SMART({ criteria }: CriteriaArray) {
    const [weights, setWeights] = useState<number[] | []>([])
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        setWeights(Array(Object.keys(criteria).length).fill(0))
    }, [])

    useEffect(() => {
        const status = validateInputWeights(weights)
        setMessage(WEIGHTS_MESSAGE[status])
    }, [weights])

    const onChangeWeight = (e: react.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        setWeights(weights.map((w, idx) => idx === index ? parseInt(e.target.value) : w))
    }

    const isValueRepeated = (arr: number[]) => {
        return arr.length !== new Set(arr).size
    }

    const validateInputWeights = (weights: number[]) => {
        if (weights.some(weight => weight === 0)) return 3
        if (isValueRepeated(weights)) return 2
        if (weights.some(weight => weight < 10)) return 1

        return 0
    }

    return (
        <Box style={{padding: '20px 0'}}>
            <Typography style={{padding: '10px 0'}}>SMART metoda input</Typography>
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
