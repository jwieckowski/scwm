import react, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField
} from '@material-ui/core';

import { useRWM } from '../../../../subscribers/RWM'
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
    0: 'Wagi są zdefiniowane poprawnie',
    1: 'Najmniejsza wartość powinna wynosić 10',
    2: 'Wagi powininy być zdefiniowane za pomocą kolejnych wielokrotności 10',
    3: 'Wagi nie powinny sie powtarzać',
    4: '',
}

export default function RWM({ criteria, description }: Props) {
    const [{ weights }, {changeWeights, validateInput }] = useRWM()
    const [, { changeWeightsCorrectness }] = useWeightsState()
    const [message, setMessage] = useState<string>('')


    useEffect(() => {
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
