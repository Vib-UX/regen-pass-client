import { createTheme, ThemeProvider } from '@mui/material/styles';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import '@coinbase/onchainkit/styles.css';
import { Toaster } from 'react-hot-toast';
import { baseSepolia } from 'wagmi/chains';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
const wagmiConfig = createConfig({
    chains: [baseSepolia],
    connectors: [
        coinbaseWallet({
            appName: 'onchainkit',
        }),
    ],
    ssr: true,
    transports: {
        [baseSepolia.id]: http(),
    },
});
const queryClient = new QueryClient();
const Provider = ({ children }: { children: any }) => {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    // Default options for specific types
                    success: {
                        duration: 3000,
                    },
                }}
            />
            <GoogleOAuthProvider
                clientId={
                    '1083898684952-op7cr4bf49mvsp0q4j7pbltofkctjksv.apps.googleusercontent.com'
                }
            >
                <WagmiProvider config={wagmiConfig}>
                    <QueryClientProvider client={queryClient}>
                        <OnchainKitProvider
                            apiKey={'yDaZynZGies9vtB5ZQDIVgRkFaM9IwXe'}
                            chain={baseSepolia}
                        >
                            {children}
                        </OnchainKitProvider>
                    </QueryClientProvider>
                </WagmiProvider>
            </GoogleOAuthProvider>
        </ThemeProvider>
    );
};

export default Provider;
