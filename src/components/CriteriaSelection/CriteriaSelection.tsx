import React, { useState, useEffect } from 'react'

import MyContainer from '../MyContainer'
import {
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Typography,
    Grid,
    Button
} from '@material-ui/core/'

import criteriaAll from '../../criteria_description.json'

interface CriteriaDescription {
    id: number
    name: string
    description: string
    status: boolean
}

export default function CriteriaSelection() {
    const [criteria, setCriteria] = useState<CriteriaDescription[] | []>([])

    useEffect(() => {
        setCriteria(criteriaAll.criteria.map(crit => {
            const obj = { ...crit, status: false}
            return obj
        }))
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        setCriteria(criteria.map(crit => crit.id === id ? {...crit, status: !crit.status } : crit))
    };

    const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
    }

    return (
        <MyContainer>
            <Typography variant='h5' style={{margin: '50px 10%'}}>{criteriaAll.description}</Typography>
             <FormControl component="fieldset" style={{padding: '40px', width: '100%'}}>
                <FormGroup style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', height: '400px', overflow: 'auto'}}>
                    {
                        criteria?.map(crit => {
                            return (
                                <Grid container>
                                    <FormControlLabel
                                        key={crit.id}
                                        control={
                                            <Checkbox checked={crit.status} onChange={(e) => handleChange(e, crit.id)} name={crit.name} color={'primary'}/>
                                        }
                                        label={crit.name}
                                        style={{width: '100%'}}
                                    />
                                    <Typography variant='body2' style={{color: '#494949'}}>{crit.description}</Typography>
                                </Grid>
                            )
                        })
                    }
                </FormGroup>
                <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    style={{marginTop: '20px', padding: '10px 5px'}}
                    onClick={handleSubmit}
                >
                    PRZEŚLIJ
                </Button>
            </FormControl>
        </MyContainer>
    )
}
