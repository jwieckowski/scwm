import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Link } from 'react-router-dom'

interface URL {
  [index: string]: number
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function Menu() {
  const classes = useStyles();
  const location = useLocation();
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    const urls: URL = {
      '/': 0,
      '/prestudy': 1,
      '/weights': 2,
      '/statistics': 3
    }
    setValue(urls[location.pathname] || 0)
  }, [location.pathname])

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Link
          to='/'
          style={{textDecoration: 'none', color: 'inherit'}}
        >
            <Tab label="Strona główna" />
        </Link>
        <Link
          to='/prestudy'
          style={{textDecoration: 'none', color: 'inherit'}}
        >
            <Tab label="Wybór kryteriów" />
        </Link>
        <Link
          to='/weights'
          style={{textDecoration: 'none', color: 'inherit'}}
        >
            <Tab label="Istotność kryteriów" />
        </Link>
        <Link
          to='/statistics'
          style={{textDecoration: 'none', color: 'inherit'}}
        >
            <Tab label="Statystyki" />
        </Link>
      </Tabs>
    </Paper>
  );
}
