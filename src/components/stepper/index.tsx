import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import toast from 'react-hot-toast';

import { getUserLocation } from '../../lib/helper';
import Ar from '../Ar/index';

const steps = [
    {
        label: 'You need to be within 500m of the event location to be able to verify',
    },
    {
        label: 'NFT collected successfully from booth',
    },
    {
        label: 'Getting user details',
    },
    {
        label: 'All set!',
    },
];

export default function VerticalLinearStepper({
    event,
    isUserInRange,
}: {
    event: any;
    isUserInRange: boolean;
}) {
    const [image, setImage] = React.useState<string | null>(null);
    const [location, setLocation] = React.useState<any>({
        latitude: 0,
        longitude: 0,
    });
    const [activeStep, setActiveStep] = React.useState(0);
    const [showAR, setShowAR] = React.useState(false);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleRedeem = async () => {
        toast.dismiss();
        toast.loading('Redeeming perks...');
        const location = await getUserLocation();
        console.log(location);
        if (!localStorage.getItem('userUsed')) {
            localStorage.setItem('userUsed', 'true');
        }
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const handleARInvokation = () => {
        setShowAR(true);
    };

    React.useEffect(() => {
        if (isUserInRange && activeStep === 0) {
            handleNext();
        }
        if (activeStep === 1) {
            handleARInvokation();
        }
    }, [isUserInRange, activeStep]);
    return (
        <>
            <Box sx={{ maxWidth: 400 }}>
                {showAR ? (
                    <Ar
                        location={location}
                        setIsArOpen={setShowAR}
                        setImage={setImage}
                    />
                ) : image ? (
                    <div className="relative">
                        <img src={image} alt="Captured Screenshot" />
                        <img
                            src={''}
                            alt="Overlay"
                            className="absolute top-0 right-1"
                            height={120}
                            width={120}
                        />
                    </div>
                ) : null}
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step
                            key={step.label}
                            completed={isUserInRange && index === 0}
                        >
                            <StepLabel
                                optional={
                                    index === steps.length - 1 ? (
                                        <Typography variant="caption">
                                            Last step
                                        </Typography>
                                    ) : null
                                }
                            >
                                <div className="text-black">{step.label}</div>
                            </StepLabel>
                            <StepContent>
                                {activeStep === 3 && (
                                    <Box sx={{ mb: 2 }}>
                                        <Button
                                            onClick={handleRedeem}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {`Redeem`}
                                        </Button>
                                    </Box>
                                )}
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </Box>
        </>
    );
}
