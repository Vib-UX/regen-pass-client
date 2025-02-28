import { Loader2, MessageCircle, Send, X } from 'lucide-react';
import React, { useState } from 'react';

type Message = {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    options?: string[];
};

type UserDetails = {
    name: string;
    age: string;
};

const events = ['ETHDenver', 'ETHTaipei', 'ETHPrague'];

const initialMessage: Message = {
    id: 1,
    text: 'Welcome! Which upcoming event are you interested in?',
    sender: 'ai',
    options: events,
};

export default function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([initialMessage]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [userDetails, setUserDetails] = useState<UserDetails>({
        name: '',
        age: '',
    });
    const [selectedEvent, setSelectedEvent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() || (currentStep === 0 && selectedEvent)) {
            const userMessage = currentStep === 0 ? selectedEvent : input;
            setMessages((prev) => [
                ...prev,
                { id: prev.length + 1, text: userMessage, sender: 'user' },
            ]);
            setInput('');
            setIsLoading(true);

            // Simulate AI response after 5 seconds
            setTimeout(() => {
                setIsLoading(false);
                let aiResponse: Message = { id: 0, text: '', sender: 'ai' };

                switch (currentStep) {
                    case 0:
                        aiResponse = {
                            id: messages.length + 2,
                            text: 'Great! Please enter your name:',
                            sender: 'ai',
                        };
                        setCurrentStep(1);
                        break;
                    case 1:
                        setUserDetails((prev) => ({
                            ...prev,
                            name: userMessage,
                        }));
                        aiResponse = {
                            id: messages.length + 2,
                            text: 'Thank you! Now, please enter your age:',
                            sender: 'ai',
                        };
                        setCurrentStep(2);
                        break;
                    case 2:
                        setUserDetails((prev) => ({
                            ...prev,
                            age: userMessage,
                        }));
                        aiResponse = {
                            id: messages.length + 2,
                            text: `Thank you for providing your details. For the ${selectedEvent} event, you need to stake 10 USDT. Would you like to proceed?`,
                            sender: 'ai',
                            options: ['Yes', 'No'],
                        };
                        setCurrentStep(3);
                        break;
                    case 3:
                        aiResponse = {
                            id: messages.length + 2,
                            text:
                                userMessage === 'Yes'
                                    ? "Great! We'll guide you through the staking process. (Staking logic to be implemented)"
                                    : "No problem. Is there anything else you'd like to know about the event?",
                            sender: 'ai',
                        };
                        setCurrentStep(4);
                        break;
                    default:
                        aiResponse = {
                            id: messages.length + 2,
                            text: 'Is there anything else I can help you with?',
                            sender: 'ai',
                        };
                }

                setMessages((prev) => [...prev, aiResponse]);
            }, 5000);
        }
    };

    const handleOptionClick = (option: string) => {
        if (currentStep === 0) {
            setSelectedEvent(option);
        }
        setInput(option);
        const syntheticEvent = {
            preventDefault: () => {},
        } as React.FormEvent<HTMLFormElement>;
        handleSubmit(syntheticEvent);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-[#0c162c] text-white p-4 rounded-full shadow-lg transition-colors"
                >
                    <MessageCircle size={24} />
                </button>
            )}
            {isOpen && (
                <div className="bg-[#0c162c] rounded-lg shadow-xl flex flex-col w-[340px] h-[500px] max-h-[calc(100vh-2rem)]">
                    <div className="flex justify-between items-center p-4 border-b border-zinc-700">
                        <h2 className="font-semibold text-white">Event Chat</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${
                                    message.sender === 'user'
                                        ? 'justify-end'
                                        : 'justify-start'
                                }`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-lg p-3 ${
                                        message.sender === 'user'
                                            ? 'bg-[#9640ff] text-white'
                                            : 'bg-zinc-800 text-zinc-100'
                                    }`}
                                >
                                    {message.text}
                                    {message.options && (
                                        <div className="mt-2 space-y-2">
                                            {message.options.map(
                                                (option, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() =>
                                                            handleOptionClick(
                                                                option
                                                            )
                                                        }
                                                        className="block w-full text-left px-2 py-1 rounded bg-zinc-700 hover:bg-zinc-600 transition-colors"
                                                    >
                                                        {option}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-center">
                                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                            </div>
                        )}
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="p-4 border-t border-zinc-700"
                    >
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 p-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                            />
                            <button
                                type="submit"
                                className="p-2 bg-[#9640ff] text-white rounded-lg hover:bg-[#9640ff] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
