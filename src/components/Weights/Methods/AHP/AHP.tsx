import react, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button
} from '@material-ui/core';

import Matrix from './Matrix'
import { useAHP } from '../../../../subscribers/AHP'
import { useWeightsState } from '../../../../subscribers/weights'

interface Criteria {
    id: number
    name: string
}

interface Props {
    criteria: Criteria[]
    description: string
}

const WEIGHTS_MESSAGE = {
    0: 'Wartość opisująca relację pomiędzy kryteriami musi być zdefiniowana',
    1: 'Wartość opisująca relację powinna mieścić się pomiedzy 1 a 9',
    2: ''
}

export default function AHP({ criteria, description }: Props) {
    const [{ criteriaAmount, matrix, pairs, compareValue, currentPair }, { comparePair, setCompareValue }] = useAHP()
    const [, { changeWeightsCorrectness }] = useWeightsState()
    const [message, setMessage] = useState<string>('')

    const handlePairComparison = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        if (!compareValue) {
            setMessage(WEIGHTS_MESSAGE[0])
            return
        } else if (compareValue > 9) {
            setMessage(WEIGHTS_MESSAGE[1])
            return
        }

        comparePair()
        if (currentPair === 44) {
            changeWeightsCorrectness(0)
        }
    }

    const handleChange = (e: react.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        if (e.target.value !== '') setMessage(WEIGHTS_MESSAGE[2])
        setCompareValue(+e.target.value ?? 0)
    }

    return (
        <Box style={{padding: '20px 0'}}>
            <Typography style={{padding: '10px 0'}}>{description}</Typography>
            <Typography style={{padding: '10px 0'}}>Kryteria</Typography>
            {Object.keys(criteria).map((key, index) => {
                return (
                    <Box style={{display: 'flex', alignItems: 'center', width: '100%'}} key={index}>
                        <Typography style={{width: '70%', paddingRight: '20px'}}>C{index+1} - {criteria[parseInt(key)].name}</Typography>
                    </Box>
                )
            })}
            <Typography style={{padding: '10px 0'}}>{message}</Typography>
            <Matrix
              criteriaAmount={criteriaAmount}
              matrix={matrix}
            />
            {
                currentPair !== 45 &&
                (<Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
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
                </Box>)
            }
        </Box>
    )
}
