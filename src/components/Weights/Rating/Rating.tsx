import react, { Dispatch, SetStateAction } from 'react';
import {
    Box,
    Rating,
    Typography
 } from '@mui/material';

interface Props {
    activeIndex: number
    ratings: number[]
    setRating: Dispatch<SetStateAction<[] | number[]>>
}

export default function MyRating({ activeIndex, ratings, setRating }: Props) {

  const handleChange = (event: react.SyntheticEvent<Element, Event>, newRating: number | null) => {
    event.preventDefault();

    if (!newRating) return

    let copy = [...ratings]
    copy[activeIndex] = newRating
    setRating(copy)
  }

  return (
    <Box>
      <Typography component="legend">Ocena wygody korzystania z metody</Typography>
      <Typography>1 gwiazdka - trudna, 5 gwiazdek - łatwa</Typography>
      <Rating
        name="method-rating"
        value={ratings[activeIndex]}
        onChange={handleChange}
      />
    </Box>
  );
}
