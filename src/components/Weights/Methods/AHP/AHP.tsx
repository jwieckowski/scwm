import react, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    MenuItem,
    FormControl
} from '@material-ui/core';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Matrix from './Matrix'
import { useAHP } from '../../../../subscribers/AHP'
import { useWeightsState } from '../../../../subscribers/weights'

interface DICT {
    [key: number]: string
}

interface Criteria {
    id: number
    name: string
}

interface Props {
    criteria: Criteria[]
    description: string
}

const WEIGHTS_MESSAGE = {
    0: 'Można porównać parę',
    1: 'Ważniejsze kryterium powinno być wybrane',
    2: 'Relacja pomiędzy kryteriami powinna być wybrana',
    3: ''
}

const WEIGHTS_DICT: DICT = {
    1: 'Równoważne',
    2: 'Pomiędzy słabo a równoważne',
    3: 'Słabo preferowane',
    4: 'Pomiędzy słabo a silnie',
    5: 'Silnie preferowane',
    6: 'Pomiędzy silnie a bardzo silnie',
    7: 'Bardzo silnie preferowane',
    8: 'Pomiędzy bardzo silnie a ekstremalnie',
    9: 'Ekstremalnie preferowane'
}

export default function AHP({ criteria, description }: Props) {
    const [{ criteriaAmount, matrix, pairs, compareValue, currentPair, betterCriterion }, { comparePair, setCompareValue, setBetterCriterion }] = useAHP()
    const [, { changeWeightsCorrectness }] = useWeightsState()
    const [message, setMessage] = useState<string>('')

    const handlePairComparison = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        if (compareValue === "") {
            setMessage(WEIGHTS_MESSAGE[2])
            return
        }

        comparePair()
        if (currentPair === 44) {
            changeWeightsCorrectness(0)
        }
        setMessage(WEIGHTS_MESSAGE[3])
    }

    const handleCriteriaChange = (event: SelectChangeEvent) => {
        setMessage(WEIGHTS_MESSAGE[3])
        setBetterCriterion(+event.target.value);
    };

    const handleValueChange = (event: SelectChangeEvent) => {
        if (betterCriterion === "") {
            setMessage(WEIGHTS_MESSAGE[1])
            return
        }
        setMessage(WEIGHTS_MESSAGE[0])
        setCompareValue(+event.target.value);
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
            <Matrix
              criteriaAmount={criteriaAmount}
              matrix={matrix}
            />
            {
                currentPair !== 45 &&
                (<Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    <Typography style={{paddingRight: '20px', borderRight: '2px solid grey'}}>C{pairs[currentPair][0]+1} i C{pairs[currentPair][1]+1}</Typography>
                    <Typography style={{padding: '0 20px'}}>Ważniejsze kryterium</Typography>
                    <FormControl style={{width: '100px', marginRight: '10px'}}>
                        <Select
                            id="criteria-AHP-value"
                            value={betterCriterion}
                            onChange={handleCriteriaChange}
                        >
                            <MenuItem value={0}>C{pairs[currentPair][0]+1}</MenuItem>
                            <MenuItem value={1}>C{pairs[currentPair][1]+1}</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography style={{padding: '0 20px', borderLeft: '2px solid grey'}}>Relacja</Typography>
                    <FormControl style={{width: '200px'}}>
                        <Select
                            id="criteria-AHP-value"
                            value={compareValue}
                            onChange={handleValueChange}
                        >
                            {
                                Object.keys(WEIGHTS_DICT).map((key: string, idx: number) => {
                                    return (
                                        <MenuItem key={idx} value={+key}>{WEIGHTS_DICT[+key]}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                    </FormControl>
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
            <Typography style={{padding: '10px 0', fontWeight: 'bold', color: (betterCriterion === "" || compareValue === "") ? 'red' : 'inherit'}}>{message}</Typography>
        </Box>
    )
}
