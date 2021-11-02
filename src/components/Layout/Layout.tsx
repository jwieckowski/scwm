import React, { ReactChildren, ReactChild } from 'react';
import { Container } from '@material-ui/core';
import Menu from '../Menu';

interface LayoutChildren {
    children: ReactChildren | ReactChild
}

export default function Layout({ children }: LayoutChildren) {
    return (
        <Container maxWidth='lg' style={{backgroundColor: '#dcdcdc', width: '100%', height: '100vh'}}>
            <Menu />
            { children }
        </Container>
    )
}
