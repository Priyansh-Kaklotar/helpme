'use client';

import { usePathname } from 'next/navigation';
import ChatLogo from '@/components/chatLogo/ChatLogo';

export default function RoutesLayout({ children }) {
    const pathname = usePathname();

    // Add any other paths for OTP pages if they are different
    const excludedPaths = [
        '/chat',
        '/login/customer',
        '/login/provider',
        '/signin/customer',
        '/signin/provider',
        '/verify-otp' // Assuming a generic /otp route, add more if needed
    ];

    const showChatLogo = !excludedPaths.includes(pathname);

    return (
        <>
            {children}
            {showChatLogo && <ChatLogo />}
        </>
    );
}
