'use client';

import Link from 'next/link';

// A simple chat icon for the button
const ChatIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72 3.72a.75.75 0 0 1-1.06 0l-3.72-3.72H6.31c-1.136 0-2.1-.847-2.193-1.98l-.284-.884A2.25 2.25 0 0 1 3.75 12.25v-4.5a2.25 2.25 0 0 1 2.25-2.25h10.5a2.25 2.25 0 0 1 2.25 2.25Z" />
    </svg>
);


export default function ChatLogo() {
    return (
        <Link href="/chat" className="fixed bottom-8 right-8 z-50">
            <button className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                <ChatIcon className="w-8 h-8" />
            </button>
        </Link>
    );
}
