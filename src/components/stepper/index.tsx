import {
    Transaction,
    TransactionButton,
    TransactionSponsor,
    TransactionStatus,
    TransactionStatusAction,
    TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
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
import { baseSepolia } from 'viem/chains';
import { ABI } from '../../abi';
import s from '../../assets/s.png';
import { calculateDistance, getUserLocation } from '../../lib/helper';
import Ar from '../Ar/index';
import type { LifecycleStatus } from '@coinbase/onchainkit/transaction';
import { useAccount } from 'wagmi';
const steps = [
    { label: 'Email verification' },
    {
        label: 'You need to be within 500m of the event location to be able to verify',
    },
    {
        label: 'NFT collected successfully from booth',
    },
    {
        label: 'All set!',
    },
];

export default function VerticalLinearStepper({
    event,
    isUserInRange,
    activeStep,
    setActiveStep,
    setIsUserInRange,
    em,
}: {
    event: any;
    isUserInRange: boolean;
    activeStep: number;
    setActiveStep: React.Dispatch<React.SetStateAction<number>>;
    setIsUserInRange: React.Dispatch<React.SetStateAction<boolean>>;
    em: boolean;
}) {
    const [image, setImage] = React.useState<string | null>(null);
    const [hash, setHash] = React.useState<any>('');
    const [location, setLocation] = React.useState<any>({
        latitude: 0,
        longitude: 0,
    });
    const { address } = useAccount();

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
    const validateUserCoordinates = async () => {
        toast.dismiss();
        toast.loading('Verifying user location...');
        const location = await getUserLocation();

        if (location) {
            const distance = calculateDistance({
                lat1: location.latitude, //event
                lon1: location.longitude, //event
                lat2: location.latitude,
                lon2: location.longitude,
            });
            if (distance <= 500) {
                toast.dismiss();
                toast.success('You are in range of the event location');
                setIsUserInRange(true);
                handleNext();
            } else {
                toast.dismiss();
                toast.error('You are not in range of the event location');
                setIsUserInRange(false);
            }
        }
    };
    const handleReset = () => {
        setActiveStep(0);
    };
    const handleARInvokation = () => {
        setShowAR(true);
    };

    React.useEffect(() => {
        if (activeStep == 1) {
            validateUserCoordinates();
        }
        if (activeStep === 2) {
            handleARInvokation();
        }
    }, [isUserInRange, activeStep]);

    const calls = [
        {
            address: `0x2d2b9bf62b0143a8d68ed4a7063e5f50244dfc81`,
            abi: ABI,
            functionName: 'crossChainMint',
            args: [address, 'ipfs://testPOAPEth', '16015286601757825753', 1],
        },
    ];
    const handleOnStatus = React.useCallback((status: LifecycleStatus) => {
        if (status?.statusName === 'success') {
            setHash(
                status?.statusData?.transactionReceipts[0]?.transactionHash
            );
        }
    }, []);
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
                            src={s}
                            alt="Overlay"
                            className="absolute top-0 right-1"
                            height={150}
                            width={150}
                        />
                    </div>
                ) : null}
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step
                            key={step.label}
                            completed={
                                (isUserInRange && index === 1) ||
                                (em && index === 0)
                            }
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
                {activeStep === 2 && (
                    <>
                        <Transaction
                            chainId={baseSepolia.id}
                            calls={calls}
                            isSponsored
                            onStatus={handleOnStatus}
                        >
                            <TransactionButton />
                            <TransactionSponsor />
                            <TransactionStatus>
                                <TransactionStatusLabel />
                                <TransactionStatusAction />
                            </TransactionStatus>
                        </Transaction>
                        {hash && (
                            <div className="font-semibold text-lg">
                                Transaction success 🎉{' '}
                                <a
                                    href={`https://ccip.chain.link/tx/${hash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline"
                                >
                                    (View on Chain)
                                </a>
                            </div>
                        )}
                    </>
                )}

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
