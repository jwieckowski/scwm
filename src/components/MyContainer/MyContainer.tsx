import React, { ReactChildren, ReactChild } from 'react'

import { Container } from '@material-ui/core'

interface ContainerChildren {
    children: ReactChildren | ReactChild | ReactChildren[] | ReactChild[]
}


export default function MyContainer({ children }: ContainerChildren) {
    return (
        <Container maxWidth='lg' style={{width: '100%', height: '90%'}}>
            { children }
        </Container>
    )
}
