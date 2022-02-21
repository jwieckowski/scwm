import React from 'react'
import {
  Grid,
  Typography
} from '@material-ui/core';

import MyContainer from '../MyContainer'

export default function Dashboard() {
    return (
        <MyContainer>
            <Grid style={{width: '80%', margin: 'auto', paddingTop: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant='h4' style={{textAlign: 'center'}}>
                    Subiektywne metody wyznaczania wag kryteriów
                </Typography>
                <Typography variant='h5' style={{textAlign: 'center', paddingTop: '50px', lineHeight: '25px'}}>
                    Strona została poświęcona ankietom do badań nad moją pracą magisterską.
                </Typography>
                <Typography style={{textAlign: 'center', paddingTop: '50px', lineHeight: '25px'}}>
                    Pierwsza ankieta dotyczy wyboru kryteriów, które osoba badana brałaby pod uwagę przy wybieraniu lokalizacji mieszkania w Szczecinie.
                </Typography>
                <Typography style={{textAlign: 'center', paddingTop: '50px', lineHeight: '25px'}}>
                    Druga ankieta zawiera 5 kroków, a każdy z nich polega na ustaleniu istotności kryteriów w problemie postępując według instrukcji dla każdej z metod zawartej w kolejnych krokach.
                </Typography>
                <Typography style={{textAlign: 'center', paddingTop: '50px', lineHeight: '40px'}}>
                    Otrzymane wyniki mają zostać wykorzystane do wyznaczania wag kryteriów w problemie. Uwzględnione są dwa przypadki badawcze.
                    Jeden z nich dotyczy wyznaczenia atrakcyjności lokalizacji mieszkalnych dla wag obliczonych dla każdego eksperta z osobna. Następnie wyniki te są uśredniane i na tej podstawie obliczany jest końcowy ranking atrakcyjności miejsc.
                    Drugi przypadek to podejście, w którym najpierw uśredniane są wagi dla kryteriów, po czym wykonywana jest ocena miejsc. <br/>
                </Typography>
                <Typography style={{textAlign: 'center', paddingTop: '40px', lineHeight: '40px'}}>
                    Badanie ma na celu pokazać różnice wynikające z użycia różnych metod do wyznaczania wag kryteriów na podstawie subiektywnych odczuć.
                </Typography>
            </Grid>
        </MyContainer>
    )
}
