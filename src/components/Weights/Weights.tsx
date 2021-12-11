import react, { useState } from 'react';
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography
} from '@material-ui/core';

import FPS from './Methods/FPS'
import RM from './Methods/RM'
import SMART from './Methods/SMART'
import RWM from './Methods/RWM'
import AHP from './Methods/AHP'
import Rating from './Rating'

import weightsDescription from '../../weights_description.json'

interface methodsComponents {
  [key: number]: JSX.Element
}

const methods: methodsComponents = {
  0: <FPS criteria={weightsDescription.criteria} />,
  1: <RM criteria={weightsDescription.criteria} />,
  2: <SMART criteria={weightsDescription.criteria} />,
  3: <RWM criteria={weightsDescription.criteria} />,
  4: <AHP criteria={weightsDescription.criteria} />
}

export default function Weights() {
  const [activeStep, setActiveStep] = useState(0);
  const [methodsRatings, setMethodsRatings] = useState<number[] | []>(Array(weightsDescription.methods.length).fill(0))

  const handleNext = () => {
    if (methodsRatings[activeStep] === 0) return
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box style={{ width: '100%', height: '100%', paddingTop: '15px', overflow: 'auto' }}>
      <Stepper activeStep={activeStep}>
        {weightsDescription.methods.map((method, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={method.id} {...stepProps}>
              <StepLabel {...labelProps}>{index+1}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === weightsDescription.methods.length ? (
        <Box>
          <Typography style={{ marginTop: 2, marginBottom: 1 }}>
            Wszystkie kroki wypełnione
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </Box>
      ) : (
        <Box style={{width: '90%', margin: '0 5%', marginBottom: '100px'}}>
          {methods[activeStep]}
          <Box style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Rating
              activeIndex={activeStep}
              ratings={methodsRatings}
              setRating={setMethodsRatings}
            />
          </Box>
          <Box style={{ display: 'flex', flexDirection: 'row', paddingTop: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              style={{ marginRight: 1 }}
            >
              Back
            </Button>
            <Box style={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
                {activeStep === weightsDescription.methods.length - 1 ? 'Finish' : 'Next'}
              </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
