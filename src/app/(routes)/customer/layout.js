import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/src/components/ui/theme-provider";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import Main_navbar from "@/src/components/main-navbar/page";

export const metadata = {
    title: "Helping You Find the Best Service Providers", // Title for the page
    description: "Discover, compare, and hire trusted professionals for any service you need. Fast, reliable, and tailored to your requirements.",
};

export default function CustomerLayout({ children }) {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                draggable
                theme="light"
                transition={Bounce}
            />
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Main_navbar />
                {children}
            </ThemeProvider>
        </>
    );
}
