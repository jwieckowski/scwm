import React, { ReactChildren, ReactChild, ReactFragment } from 'react'

import { Container } from '@material-ui/core'

interface ContainerChildren {
    children: ReactChildren | ReactChild | ReactChildren[] | ReactChild[] | ReactFragment
}


export default function MyContainer({ children }: ContainerChildren) {
    return (
        <Container maxWidth='lg' style={{width: '100%', height: '90%', overflow: 'auto'}}>
            { children }
        </Container>
    )
}
