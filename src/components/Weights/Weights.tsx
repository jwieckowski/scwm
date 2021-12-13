import react, { useEffect } from 'react';
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
import Modal from './Modal'

import { useWeightsState } from '../../subscribers/weights';
import { useFPS } from '../../subscribers/FPS';
import { useRM } from '../../subscribers/RM';
import { useSMART } from '../../subscribers/SMART';
import { useRWM } from '../../subscribers/RWM';
import { useAHP } from '../../subscribers/AHP';
import weightsDescription from '../../weights_description.json'

interface methodsComponents {
  [key: number]: JSX.Element
}

const methods: methodsComponents = {
  0: <FPS criteria={weightsDescription.criteria} description={weightsDescription.methods[0].description}/>,
  1: <RM criteria={weightsDescription.criteria} description={weightsDescription.methods[1].description}/>,
  2: <SMART criteria={weightsDescription.criteria} description={weightsDescription.methods[2].description}/>,
  3: <RWM criteria={weightsDescription.criteria} description={weightsDescription.methods[3].description}/>,
  4: <AHP criteria={weightsDescription.criteria} description={weightsDescription.methods[4].description}/>
}

export default function Weights() {
  const [{ activeStep, methodsRatings, weightsCorrect, message }, { nextStep, prevStep, changeRatings, setModalVisibility, postFormData }] = useWeightsState()

  const [fps, ] = useFPS()
  const [rm, ] = useRM()
  const [smart, ] = useSMART()
  const [rwm, ] = useRWM()
  const [ahp, ] = useAHP()

  useEffect(() => {
    setModalVisibility(true)
  }, [])

  const handleNext = () => {
    if (methodsRatings[activeStep] === 0 || !weightsCorrect[activeStep]) return
    nextStep()

    if (activeStep === weightsDescription.methods.length - 1) {

      const body = {
        'fps': fps.weights,
        'rm': rm.weights,
        'smart': smart.weights,
        'rwm': rwm.weights,
        'ahp': ahp.matrix,
        'rating': methodsRatings
      }

      postFormData(body)
    }
  };

  const handleBack = () => {
    prevStep()
  };

  return (
    <Box style={{ width: '100%', height: '100%', paddingTop: '15px', overflow: 'auto' }}>
      <Modal description={weightsDescription.description} />
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
        <Box style={{ width: '60%', margin: '0 auto', paddingTop: '20px'}}>
          <Typography>{message}</Typography>
          <Typography style={{ marginTop: 2, marginBottom: 1 }}>
            Wszystkie kroki wypełnione. Dziękuje Wam serdecznie za pomoc. Mam nadzieję,
            że to wszystko, czego będę od Was potrzebował. Jeszcze raz dziękuję, jak obliczę wyniki
            to na pewno się z Wami podzielę.
          </Typography>
        </Box>
      ) : (
        <Box style={{width: '90%', margin: '0 5%', marginBottom: '100px'}}>
          {methods[activeStep]}
          <Box style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Rating
              activeIndex={activeStep}
              ratings={methodsRatings}
              setRating={changeRatings}
            />
          </Box>
          <Box>
            {
              methodsRatings[activeStep] === 0 && !weightsCorrect[activeStep]
                ? 'Należy wypełnić wagi i ocenić metodę'
                : methodsRatings[activeStep] === 0
                  ? 'Należy ocenić metodę'
                  : !weightsCorrect[activeStep]
                    ? 'Należy wypełnić wagi'
                    : 'Można przejść do nastepnego kroku'
            }
            </Box>
          <Box style={{ display: 'flex', flexDirection: 'row', paddingTop: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              style={{ marginRight: 1 }}
            >
              Wstecz
            </Button>
            <Box style={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
                {activeStep === weightsDescription.methods.length - 1 ? 'Prześlij' : 'Dalej'}
              </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
