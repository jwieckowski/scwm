import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MyContainer from '../MyContainer'
import {
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
    TextField,
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

const SERVER_URL = 'https://infinite-dusk-14350.herokuapp.com'
// const SERVER_URL = 'http://localhost:5000'

export default function CriteriaSelection() {
    const [criteria, setCriteria] = useState<CriteriaDescription[] | []>([])
    const [name, setName] = useState<string>('')

    useEffect(() => {
        setCriteria(criteriaAll.criteria.map(crit => {
            const obj = { ...crit, status: false}
            return obj
        }))
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        setCriteria(criteria.map(crit => crit.id === id ? {...crit, status: !crit.status } : crit))
    };

    const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        if (name === '') {
            window.alert('Pole "imię" musi być wypełnione');
            return
        }

        const body = {
            name,
            ...criteria.map(crit => ({ id: crit.id, status: crit.status}))
        }

        axios.post(`${SERVER_URL}/add-prestudy`, body)
            .then((res) => {
                window.alert(`Dane zostały ${res.status === 201 ? 'zapisane': 'zaktualizowane'}`)
            })
            .catch((err: Error) => {
                window.alert('Wystąpił błąd przy zapisywaniu danych')
            })
    }

    return (
        <MyContainer>
            <Typography variant='h5' style={{margin: '50px 10%'}}>{criteriaAll.description}</Typography>
             <FormControl component="fieldset" style={{padding: '40px', width: '100%'}}>
                <FormGroup style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
                    <TextField variant="outlined" label="Imię" onChange={handleInputChange} style={{ marginBottom: '20px'}}/>
                    {
                        criteria?.map(crit => {
                            return (
                                <Grid container style={{ margin: '10px 0'}} key={crit.id}>
                                    <FormControlLabel
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
