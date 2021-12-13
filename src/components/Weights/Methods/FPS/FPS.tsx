import react, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField
} from '@material-ui/core';

import { useFPS } from '../../../../subscribers/FPS'
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
    0: 'Suma wag jest poprawna',
    1: 'Suma wag jest mniejsza niż 100',
    2: 'Suma wag jest większa niż 100',
    3: ''
}

export default function FPS({ criteria, description }: Props) {
    const [{ weights, sum }, { changeWeights, calculateSum, validateInput }] = useFPS()
    const [, { changeWeightsCorrectness }] = useWeightsState()
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        calculateSum()

        const status = validateInput()
        setMessage(WEIGHTS_MESSAGE[status])
        changeWeightsCorrectness(status)
    }, [weights])

    const onChangeWeight = (e: react.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        changeWeights(e.target.value, index)
    }


    return (
        <Box style={{padding: '20px 0'}}>
            <Typography style={{padding: '10px 0'}}>{description}</Typography>
            <Typography style={{padding: '10px 0'}}>Suma wag: {sum} </Typography>
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
