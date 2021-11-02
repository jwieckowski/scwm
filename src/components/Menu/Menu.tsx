import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function Menu() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Link
          to='/'
          style={{textDecoration: 'none', color: 'inherit'}}
          onClick={(e) => handleChange(e, 0)}
        >
            <Tab label="Strona główna" />
        </Link>
        <Link
          to='/prestudy'
          style={{textDecoration: 'none', color: 'inherit'}}
          onClick={(e) => handleChange(e, 1)}
        >
            <Tab label="Wybór kryteriów" />
        </Link>
        <Link
          to='/weights'
          style={{textDecoration: 'none', color: 'inherit'}}
          onClick={(e) => handleChange(e, 2)}
        >
            <Tab label="Istoność kryteriów" />
        </Link>
      </Tabs>
    </Paper>
  );
}
