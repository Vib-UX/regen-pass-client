import {
    Award,
    Bot,
    MapPin,
    Shield,
    Sparkles,
    Trophy,
    Users,
} from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import useGlobalStorage from '../../store';
import { BackgroundLinesDemo } from '../../components/ui/background-lines';
import { NavbarDemo } from '../../components/navbar/navbar-menu';
const HomePage = () => {
    const navigate = useNavigate();
    const { setEmail, setName } = useGlobalStorage();
    const handleGoogleLogin = async (credentialResponse: any) => {
        const idToken = credentialResponse.credential;
        const userInfo = await fetchUserDetails(idToken);
        console.log(userInfo);
        setEmail(userInfo.email);
        setName(userInfo.given_name);
        navigate('/events');
    };
    const fetchUserDetails = async (idToken: string) => {
        try {
            const response = await fetch(
                `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`
            );
            const userData = await response.json();

            return userData;
        } catch (error) {
            console.error('Error fetching user details:', error);
            return null;
        }
    };
    return (
        <div className="min-h-screen bg-white text-black font-sans">
            {/* Navigation */}
            <NavbarDemo/>
            {/* <div className="bg-[#0c162c]">
                <nav className="container mx-auto  px-6 py-6 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Sparkles className="h-6 w-6 text-purple-400" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                            RegenPass
                        </span>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <a
                            href="#features"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Features
                        </a>
                        <a
                            href="#about"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            About
                        </a>
                        <a
                            href="#contact"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Contact
                        </a>
                    </div>
                    <button className="bg-[#0847f7] cursor-pointer relative text-white px-5 py-2.5 rounded-sm font-medium transition-all duration-300 shadow-lg shadow-purple-500/20">
                        Get Started{' '}
                        <div className="opacity-0 absolute top-2 w-full left-0">
                            <GoogleLogin onSuccess={handleGoogleLogin} />
                        </div>
                    </button>
                </nav>
            </div> */}
<BackgroundLinesDemo/>
            {/* Hero Section - Added top padding for mobile */}
            {/* <section className="container mx-auto px-6 pt-24 sm:pt-32 pb-16 z-10 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block mb-4 px-6 py-2 bg-[#0847f7] rounded-sm text-sm font-medium text-white backdrop-blur-sm">
                        Introducing RegenPass
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 leading-tight">
                        Your Gateway to Regenerative Event Experiences
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-black max-w-3xl mx-auto px-4">
                        RegenPass transforms traditional event attendance into
                        an immersive, interactive adventure that celebrates
                        regeneration and innovation.
                    </p>
                    <div className="flex flex-col  justify-center gap-5">
                        <button className="relative bg-[#0847f7] text-white px-5 py-2 rounded-sm font-medium transition-all duration-300 shadow-lg shadow-purple-500/20 text-lg">
                            Join RegenPass{' '}
                            <div className="opacity-0 absolute top-2 w-full left-0">
                                <GoogleLogin onSuccess={handleGoogleLogin} />
                            </div>
                        </button>

                        <button className="bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-full font-medium transition-all duration-300 text-lg">
                            Learn More
                        </button>
                    </div>
                </div>
            </section> */}
            <img
                className="absolute top-0 opacity-10"
                src="https://cdn.prod.website-files.com/669aeedffebb61f45e26347a/678eb7c9f8fcb0d17dbdaf48_ETHDEN2025_web_background_nopaper_header.webp"
                alt="bg"
            />

            {/* Description */}
            <section className="container mx-auto px-6 py-16 md:py-24 relative">
                <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-900/40 to-pink-900/40 p-8 md:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-xl shadow-purple-500/5">
                    <p className="text-lg md:text-xl text-black leading-relaxed">
                        Designed for the Eth Denver community, RegenPass
                        combines cutting-edge technologies—geo-fencing,
                        augmented reality, artificial intelligence, and
                        blockchain—with eco-conscious values to deliver a
                        dynamic Proof of Attendance Protocol (POAP) experience.
                        Whether you're exploring interactive event zones or
                        earning exclusive on-chain rewards, RegenPass redefines
                        how you engage with events.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section
                id="features"
                className="container mx-auto px-6 py-16  relative"
            >
                <div className="text-center mb-20">
                    <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-full text-sm font-medium text-black backdrop-blur-sm">
                        What We Offer
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                        Key Features
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-8 rounded-3xl backdrop-blur-md border border-white/10 shadow-xl shadow-purple-500/5 hover:shadow-purple-500/10 hover:border-white/20 transition-all duration-300 group">
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl mr-5 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-all duration-300">
                                <Users className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-bold">
                                1. Seamless User Onboarding
                            </h3>
                        </div>
                        <ul className="space-y-4 ml-4">
                            <li className="flex items-start">
                                <span className="text-purple-400 mr-3 text-xl">
                                    •
                                </span>
                                <span>
                                    <strong className="text-black">
                                        Effortless Sign-Up:
                                    </strong>{' '}
                                    <span className="text-black">
                                        Register quickly using your favorite
                                        social media platforms.
                                    </span>
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-400 mr-3 text-xl">
                                    •
                                </span>
                                <span>
                                    <strong className="text-black">
                                        Automatic On-Chain Wallet Creation:
                                    </strong>{' '}
                                    <span className="text-black">
                                        Get an on-chain wallet set up instantly
                                        to store your unique rewards—NFTs,
                                        tokens, and more.
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-8 rounded-3xl backdrop-blur-md border border-white/10 shadow-xl shadow-purple-500/5 hover:shadow-purple-500/10 hover:border-white/20 transition-all duration-300 group">
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl mr-5 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-all duration-300">
                                <MapPin className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-bold">
                                2. Geo-Located AR Experiences
                            </h3>
                        </div>
                        <ul className="space-y-4 ml-4">
                            <li className="flex items-start">
                                <span className="text-purple-400 mr-3 text-xl">
                                    •
                                </span>
                                <span>
                                    <strong className="text-black">
                                        Smart GPS Navigation:
                                    </strong>{' '}
                                    <span className="text-black">
                                        Use geo-fencing to guide you to
                                        designated event zones, ensuring you
                                        never miss a key interaction.
                                    </span>
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-400 mr-3 text-xl">
                                    •
                                </span>
                                <span>
                                    <strong className="text-black">
                                        Immersive AR Triggers:
                                    </strong>{' '}
                                    <span className="text-black">
                                        Activate your camera to scan banners,
                                        logos, and other visual cues, unlocking
                                        augmented reality experiences that bring
                                        events to life.
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-8 rounded-3xl backdrop-blur-md border border-white/10 shadow-xl shadow-purple-500/5 hover:shadow-purple-500/10 hover:border-white/20 transition-all duration-300 group">
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl mr-5 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-all duration-300">
                                <Bot className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-bold">
                                3. AI-Powered Engagement
                            </h3>
                        </div>
                        <ul className="space-y-4 ml-4">
                            <li className="flex items-start">
                                <span className="text-purple-400 mr-3 text-xl">
                                    •
                                </span>
                                <span>
                                    <strong className="text-black">
                                        Interactive AI Agents:
                                    </strong>{' '}
                                    <span className="text-black">
                                        Receive personalized recommendations and
                                        real-time assistance from intelligent AI
                                        agents, enhancing your overall event
                                        experience.
                                    </span>
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-400 mr-3 text-xl">
                                    •
                                </span>
                                <span>
                                    <strong className="text-black">
                                        Dynamic Visual Recognition:
                                    </strong>{' '}
                                    <span className="text-black">
                                        Leverage AI to instantly recognize and
                                        process event-specific triggers,
                                        ensuring you capture every moment and
                                        reward.
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-8 rounded-3xl backdrop-blur-md border border-white/10 shadow-xl shadow-purple-500/5 hover:shadow-purple-500/10 hover:border-white/20 transition-all duration-300 group">
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl mr-5 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-all duration-300">
                                <Award className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-bold">
                                4. Cross-Chain On-Chain Rewards
                            </h3>
                        </div>
                        <ul className="space-y-4 ml-4">
                            <li className="flex items-start">
                                <span className="text-purple-400 mr-3 text-xl">
                                    •
                                </span>
                                <span>
                                    <strong className="text-black">
                                        Dynamic POAP Assets:
                                    </strong>{' '}
                                    <span className="text-black">
                                        Earn exclusive digital mementos that
                                        serve as verifiable proof of your
                                        participation.
                                    </span>
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-400 mr-3 text-xl">
                                    •
                                </span>
                                <span>
                                    <strong className="text-black">
                                        On-Chain Coupons & Perks:
                                    </strong>{' '}
                                    <span className="text-black">
                                        Unlock special discounts, early access,
                                        and exclusive benefits.
                                    </span>
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-400 mr-3 text-xl">
                                    •
                                </span>
                                <span>
                                    <strong className="text-black">
                                        Unique NFTs:
                                    </strong>{' '}
                                    <span className="text-black">
                                        Collect one-of-a-kind digital assets
                                        that commemorate your experience.
                                    </span>
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-400 mr-3 text-xl">
                                    •
                                </span>
                                <span>
                                    <strong className="text-black">
                                        Cross-Chain Minting:
                                    </strong>{' '}
                                    <span className="text-black">
                                        Seamlessly mint and transfer your
                                        rewards across multiple blockchain
                                        networks with CCIP & Chainlink
                                        Functions.
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-8 rounded-3xl backdrop-blur-md border border-white/10 shadow-xl shadow-purple-500/5 hover:shadow-purple-500/10 hover:border-white/20 transition-all duration-300 group">
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl mr-5 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-all duration-300">
                                <Shield className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-bold">
                                5. Secure and Transparent Reward Distribution
                            </h3>
                        </div>
                        <ul className="space-y-4 ml-4">
                            <li className="flex items-start">
                                <span className="text-purple-400 mr-3 text-xl">
                                    •
                                </span>
                                <span>
                                    <strong className="text-black">
                                        Chainlink VRF Integration:
                                    </strong>{' '}
                                    <span className="text-black">
                                        Utilize Chainlink's Verifiable Random
                                        Function (VRF) to guarantee that all
                                        random reward distributions are secure,
                                        fair, and tamper-proof.
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-8 rounded-3xl backdrop-blur-md border border-white/10 shadow-xl shadow-purple-500/5 hover:shadow-purple-500/10 hover:border-white/20 transition-all duration-300 group">
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl mr-5 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-all duration-300">
                                <Trophy className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-bold">
                                6. Social Engagement and Competitive Fun
                            </h3>
                        </div>
                        <ul className="space-y-4 ml-4">
                            <li className="flex items-start">
                                <span className="text-purple-400 mr-3 text-xl">
                                    •
                                </span>
                                <span>
                                    <strong className="text-black">
                                        Event and Global Leaderboards:
                                    </strong>{' '}
                                    <span className="text-black">
                                        Track your performance and compare with
                                        fellow participants, fostering a sense
                                        of community and healthy competition.
                                    </span>
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-400 mr-3 text-xl">
                                    •
                                </span>
                                <span>
                                    <strong className="text-black">
                                        Interactive Community Challenges:
                                    </strong>{' '}
                                    <span className="text-black">
                                        Participate in event challenges and
                                        referrals that enhance the social aspect
                                        of RegenPass, driving further engagement
                                        and shared experiences.
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-6 py-16 md:py-24 relative">
                <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-900/40 to-pink-900/40 p-10 md:p-16 rounded-3xl backdrop-blur-md border border-white/10 shadow-xl shadow-purple-500/5 overflow-hidden relative">
                    {/* Decorative elements */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500 rounded-full filter blur-[80px] opacity-30"></div>
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-pink-500 rounded-full filter blur-[80px] opacity-30"></div>

                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                        Ready to Transform Your Event Experience?
                    </h2>
                    <p className="text-lg md:text-xl mb-10 text-black max-w-2xl mx-auto">
                        Join RegenPass today and discover a new way to engage
                        with events, earn rewards, and connect with the
                        community.
                    </p>
                    <button
                        onClick={() => navigate('/events')}
                        className="bg-[#0847f7] px-10 py-5 rounded-sm text-white font-medium text-lg transition-all duration-300 shadow-lg shadow-purple-500/20 transform hover:scale-105"
                    >
                        Get Started Now
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0c162c] backdrop-blur-sm py-16 border-t border-white/10">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-8 md:mb-0">
                            <Sparkles className="h-6 w-6 text-purple-400" />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                                RegenPass
                            </span>
                        </div>
                        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0  text-center">
                            <div>
                                <h4 className="font-bold mb-4 text-white">
                                    Company
                                </h4>
                                <ul className="space-y-3">
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            Team
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            Careers
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4 text-white">
                                    Resources
                                </h4>
                                <ul className="space-y-3">
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            Documentation
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            Blog
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            Support
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4 text-white">
                                    Legal
                                </h4>
                                <ul className="space-y-3">
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            Terms of Service
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            Cookie Policy
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
                        <p>
                            &copy; {new Date().getFullYear()} RegenPass. All
                            rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
