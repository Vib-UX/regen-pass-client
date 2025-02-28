import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { MapPin, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/navbar';
import { Button } from '../../components/ui/button';
import StarWarsButton from '../../components/ui/startwar-btn';
import { Card, CardContent } from '../../components/ui/cards';
import Chatbot from '../../components/Chatbot';

interface Host {
    name: string;
    avatar: string;
}

interface Event {
    slug: string;
    date: string;
    dayOfWeek: string;
    time: string;
    title: string;
    isLive?: boolean;
    hosts: Host[];
    location?: string;
    platform?: string;
    status?: string;
    thumbnail: string;
    description: string;
}

export const events: Event[] = [
    {
        slug: 'eth-denver-2025',
        date: 'Feb 23',
        dayOfWeek: 'Sunday',
        time: '20:00 PM',
        title: 'ETH Denver',
        isLive: true,
        hosts: [{ name: 'ETH Global', avatar: '/placeholder.svg' }],
        platform: 'Zoom',
        description:
            'ETHDenver is a world renowned gathering place where developers, creators, and visionaries come together to address critical challenges and bring groundbreaking ideas to life in the fields of blockchain and distributed computing',
        thumbnail:
            'https://cdn.prod.website-files.com/669aeedffebb61f45e26347a/67ba12c2f7767b3983b2da54_ETHDEN2025_venue_event_map_stagelocations%20(1)-p-2600.jpg',
    },
    {
        slug: 'builders-house-at-ibw',
        date: 'Dec 3',
        dayOfWeek: 'Tuesday',
        time: '10:00 AM',
        title: 'ETH Taipei',
        hosts: [
            { name: 'Sanket', avatar: '/placeholder.svg' },
            { name: 'QuillAI Network', avatar: '/placeholder.svg' },
            { name: 'Parth', avatar: '/placeholder.svg' },
        ],
        location: '87, 11th Cross Rd, near Vintage Haven',
        status: 'Pending',
        description:
            '🌟 Welcome to the Builders House: Where BUIDLERs Takes Center Stage! 🚀 Join us for an unforgettable 2-day Builders House experience during India Blockchain Week (IBW) in the heart of Bangalore! This isn’t just an event—its your creative playground, designed for builders, by builders.',
        thumbnail:
            'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/7p/54abbeb5-85a9-4e1a-ba51-21b1fd576a2d',
    },
];

export default function EventsListing() {
    const navigate = useNavigate();
    const handleCheckoutEvent = (eventId: string) => {
        navigate(`/events/${eventId}`);
    };

    return (
        <div className="relative">
            <img
                src="https://cdn.prod.website-files.com/669aeedffebb61f45e26347a/678eb7c9f8fcb0d17dbdaf48_ETHDEN2025_web_background_nopaper_header.webp"
                alt="g"
                className="h-full absolute top-0 opacity-10"
            />
            <Navbar />
            <div className="min-h-screen bg-white text-black p-4 sm:p-8">
                <Chatbot />
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-0">
                            Events
                        </h1>
                        <div className="bg-zinc-800 rounded-lg p-1 w-full sm:w-auto">
                            <Button
                                variant="ghost"
                                className="bg-zinc-700 text-white rounded-md w-1/2 sm:w-auto"
                            >
                                Upcoming
                            </Button>
                            <Button
                                variant="ghost"
                                className="text-white w-1/2 sm:w-auto"
                            >
                                Past
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-6 sm:space-y-8">
                        {events.map((event, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row gap-4 sm:gap-8"
                            >
                                {/* Date Column */}
                                <div className="flex sm:flex-col items-center sm:items-start sm:w-24">
                                    <div className="text-lg font-medium mr-2 sm:mr-0">
                                        {event.date}
                                    </div>
                                    <div className="text-sm text-zinc-600">
                                        {event.dayOfWeek}
                                    </div>
                                </div>
                                <div className="relative hidden sm:block">
                                    <div className="absolute top-3 w-3 h-3 rounded-full bg-zinc-700" />
                                    <div
                                        className="absolute top-3 left-1.5 bottom-0 w-px bg-zinc-800"
                                        style={{ height: 'calc(100% + 2rem)' }}
                                    />
                                </div>
                                <Card className="flex-1 border-zinc-800">
                                    <CardContent className="p-4 sm:p-6">
                                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                            <div className="flex-1">
                                                {/* Time and Status */}
                                                <div className="flex items-center gap-2 mb-2">
                                                    {event.isLive && (
                                                        <span className="text-[#9640ff] text-sm font-medium">
                                                            LIVE
                                                        </span>
                                                    )}
                                                    <span className="text-black">
                                                        {event.time}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-black">
                                                    {event.title}
                                                </h3>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-black text-sm">
                                                        By
                                                    </span>
                                                    <div className="flex -space-x-2">
                                                        {event.hosts.map(
                                                            (host, i) => (
                                                                <Avatar
                                                                    key={i}
                                                                    className="border-2 border-zinc-900 w-6 h-6"
                                                                >
                                                                    <AvatarImage
                                                                        src={
                                                                            host.avatar
                                                                        }
                                                                    />
                                                                    <AvatarFallback>
                                                                        {
                                                                            host
                                                                                .name[0]
                                                                        }
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                            )
                                                        )}
                                                    </div>
                                                    <span className="text-black text-sm">
                                                        {event.hosts
                                                            .map((h) => h.name)
                                                            .join(', ')}
                                                    </span>
                                                </div>
                                                {event.location && (
                                                    <div className="flex items-center gap-2 text-black text-sm">
                                                        <MapPin className="w-4 h-4" />
                                                        {event.location}
                                                    </div>
                                                )}
                                                {event.platform && (
                                                    <div className="flex items-center gap-2 text-black text-sm">
                                                        <Video className="w-4 h-4" />
                                                        {event.platform}
                                                    </div>
                                                )}
                                                <div className="mt-4">
                                                    {event.status ? (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-500/10 text-[#9640ff]">
                                                            {event.status}
                                                        </span>
                                                    ) : (
                                                        <StarWarsButton
                                                            title={
                                                                'Checkout event'
                                                            }
                                                            onClick={() =>
                                                                handleCheckoutEvent(
                                                                    event.slug
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="w-full h-full sm:size-32">
                                                <img
                                                    src={event.thumbnail}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
