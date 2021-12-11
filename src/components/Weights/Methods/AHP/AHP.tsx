import react, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button
} from '@material-ui/core';

import Matrix from './Matrix'

interface Criteria {
    id: number
    name: string
}

interface CriteriaArray {
    criteria: Criteria[]
}

const WEIGHTS_MESSAGE = {
    0: 'Wartość opisująca relację pomiędzy kryteriami musi być zdefiniowana',
    1: 'Wartość opisująca relację powinna mieścić się pomiedzy 1 a 9',
    2: ''
}

export default function AHP({ criteria }: CriteriaArray) {
    const [message, setMessage] = useState<string>('')
    const [criteriaAmount, setCriteriaAmount] = useState<number>(0)
    const [matrix, setMatrix] = useState<number[][] | [][]>([])
    const [pairs, setPairs] = useState<number[][] | [][]>([[],[]])
    const [currentPair, setCurrentPair] = useState<number>(0)
    const [compareValue, setCompareValue] = useState<number>(0)

    useEffect(() => {
        setCriteriaAmount(Object.keys(criteria).length)
        setPairs(createPairs(Object.keys(criteria).length))
        setMatrix(Array(Object.keys(criteria).length).fill(0).map(() => new Array(Object.keys(criteria).length).fill(0)))
    }, [])

    useEffect(() => {
        if (matrix.length === 0) return
        if (matrix[0][0] === 1) return

        let copy = [...matrix]
        for (let i=0; i < criteriaAmount; i++) {
            copy[i][i] = 1
        }
        setMatrix(copy)
    },[matrix])

    const createPairs = (criteriaAmount: number) => {
        const pairs = []
        for (let i = 0; i < criteriaAmount; i++) {
            for (let j = 0; j < criteriaAmount; j++) {
                if (j > i) {
                    pairs.push([i, j])
                }
            }
        }
        return pairs
    }

    const handlePairComparison = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        if (!compareValue) {
            setMessage(WEIGHTS_MESSAGE[0])
            return
        } else if (compareValue > 9) {
            setMessage(WEIGHTS_MESSAGE[1])
            return
        }

        let copy = [...matrix]
        copy[pairs[currentPair][0]][pairs[currentPair][1]] = compareValue
        copy[pairs[currentPair][1]][pairs[currentPair][0]] = +(1/compareValue).toFixed(3)
        setMatrix(copy)

        setCurrentPair(currentPair + 1)
        setCompareValue(0)
    }

    const handleChange = (e: react.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        if (e.target.value !== '') setMessage(WEIGHTS_MESSAGE[2])
        setCompareValue(+e.target.value ?? 0)
    }

    return (
        <Box style={{padding: '20px 0'}}>
            <Typography style={{padding: '10px 0'}}>AHP metoda input</Typography>
            <Typography style={{padding: '10px 0'}}>{message}</Typography>
            <Typography style={{padding: '10px 0'}}>Kryteria</Typography>
            {Object.keys(criteria).map((key, index) => {
                return (
                    <Box style={{display: 'flex', alignItems: 'center', width: '100%'}} key={index}>
                        <Typography style={{width: '70%', paddingRight: '20px'}}>C{index+1} - {criteria[parseInt(key)].name}</Typography>
                    </Box>
                )
            })}
            <Matrix
              criteriaAmount={criteriaAmount}
              matrix={matrix}
            />
            <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                <Typography style={{paddingRight: '20px'}}>C{pairs[currentPair][0]+1} do C{pairs[currentPair][1]+1}</Typography>
                <TextField
                    type="number"
                    variant="outlined"
                    style={{width: '100px'}}
                    value={compareValue || ''}
                    onChange={handleChange}
                    InputProps={{ inputProps: { min: 1, max: 9 } }}
                />
                 <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    style={{margin: '0 10px', padding: '10px 5px'}}
                    onClick={handlePairComparison}
                >
                    DALEJ
                </Button>
            </Box>
        </Box>
    )
}
