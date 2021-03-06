import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import MyContainer from '../MyContainer'
import {
    Typography,
    Grid,
    CircularProgress
} from '@material-ui/core/'

import criteriaAll from '../../criteria_description.json'

interface Criterion {
    id: number
    status: boolean
}

interface CriteriaResults {
    _id: string
    data: Criterion[]
    name: string
}

interface CriteriaDescription {
    id: number
    name: string
}


const SERVER_URL = 'https://infinite-dusk-14350.herokuapp.com'
// const SERVER_URL = 'http://localhost:5000'


export default function Statistics() {
    const [results, setResults] = useState<{} | any>({});
    const [criteria, setCriteria] = useState<CriteriaDescription[] | []>([])

    const countVotes = (data: CriteriaResults[] | []) => {
        const counter: { [name: string]: number} = {};
        data.forEach(d => {
            for (const [key, crit] of Object.entries(d.data)) {
                if (key === 'name') continue

                if (Object.keys(counter).includes(key)) {
                    counter[key] += crit.status === true ? 1 : 0
                } else {
                    counter[key] = crit.status === true ? 1 : 0
                }
            }
        })
        return counter
    }

    useEffect(() => {
        setCriteria(criteriaAll.criteria.map(crit => {
            return { id: crit.id, name: crit.name }
        }))

        axios.get(`${SERVER_URL}/criteria-selection`)
        .then((res: AxiosResponse) => {
            setResults(countVotes(res.data))
        })
        .catch((err: Error) => {
            console.log(err)
        })
    }, [])

    return (
        <MyContainer>
            {
                Object.keys(results).length === 0 ?
                    <Grid style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CircularProgress size='40px' />
                    </Grid>
                :
                    <>
                        <Grid style={{width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '50px'}}>
                            <Typography variant='h5'>Wyniki wyboru kryteri??w</Typography>
                        </Grid>
                        <Grid style={{display: 'flex', flexDirection: 'column', width: '100%', padding: "2% 10%"}}>
                            {
                                criteria?.map(crit => {
                                    return (
                                        <Grid style={{display: 'flex', width: '100%', justifyContent: 'center', padding: "4px 0"}}>
                                            <Typography style={{width: '70%', marginRight: '10px'}}>{crit.name}</Typography>
                                            <Typography>{results[crit.id]}</Typography>
                                        </Grid>
                                )
                            })}
                        </Grid>
                    </>
            }
        </MyContainer>
    )
}
