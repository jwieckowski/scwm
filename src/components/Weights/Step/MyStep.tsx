import react, { ReactChildren, ReactChild, ReactFragment } from 'react';
import {
    Box,
    Step,
    StepLabel,
    StepContent,
    Button,
    Typography
} from '@material-ui/core';
import { ContactSupportOutlined } from '@material-ui/icons';


interface MethodProps {
    id: number
    name: string
    description: string
    index: number
    last: boolean
    method: ReactChildren | ReactChild | ReactChildren[] | ReactChild[] | ReactFragment
}

export default function MyStep(props: MethodProps) {
    const { index, id, name, description, last, method } = props;
    // const { id } = props;

    console.log(props)
    return (
        <Step key={id} >
            <StepLabel
                optional={
                    last ? (
                    <Typography variant="caption">Last step</Typography>
                    ) : null
                }
            >
                {name}
            </StepLabel>
            <StepContent>
            <Typography>{description}</Typography>
            {method}
            <Box style={{ marginBottom: 2 }}>
                <div>
                <Button
                    variant="contained"
                    // onClick={handleNext}
                    style={{ marginTop: 1, marginRight: 1 }}
                >
                    {last ? 'Finish' : 'Continue'}
                </Button>
                <Button
                    disabled={index === 0}
                    // onClick={handleBack}
                    style={{ marginTop: 1, marginRight: 1 }}
                >
                    Back
                </Button>
                </div>
            </Box>
            </StepContent>
        </Step>
    )
}
