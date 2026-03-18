"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { UserIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function CreateAccountPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ✅ This runs when session changes (after Google login)
    useEffect(() => {
        if (status === "authenticated" && session) {
            console.log("✅ User is authenticated:", session.user);
            console.log("✅ Access Token:", (session as any).accessToken);  // Fixed!
            console.log("✅ ID Token:", (session as any).idToken);  
            
            // Send token to your backend
            const sendTokenToBackend = async () => {
                try {
                    const response = await fetch("https://ai-shoutly-backend.onrender.com/api/auth/google/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            idToken: (session as any).idToken,  // Send ID token to backend
                        }),
                    });
                    
                    const data = await response.json();
                    console.log("✅ Backend response:", data);
                    
                    // Store backend token if needed
                    if (data.token) {
                        localStorage.setItem("backendToken", data.token);
                    }
                    
                    // Redirect to home or dashboard
                    router.push("/");
                } catch (error) {
                    console.error("Backend error:", error);
                }
            };
            
            sendTokenToBackend();
        }
    }, [status, session, router]);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError("");
        try {
            // This will redirect to Google and come back
            await signIn("google", { 
                callbackUrl: "/",  // Where to go after sign in
            });
        } catch (err) {
            console.error("Google sign-in error:", err);
            setError("Something went wrong with Google sign-in. Please try again.");
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        setError("");
        if (!name || !email) {
            setError("Please fill in all fields");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch("https://ai-shoutly-backend.onrender.com/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    role: "USER"
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Something went wrong");
                setLoading(false);
                return;
            }

            // Success: OTP sent
            alert(`OTP sent to ${data.email}`);
            router.push("/verification?email=" + encodeURIComponent(email));
        } catch (err) {
            console.error(err);
            setError("Failed to register. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">

            {/* Logo */}
            <div className="mb-5">
                <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={180}
                    height={120}
                    priority
                    className="mx-auto"
                />
            </div>

            {/* Card */}
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8">

                <h1 className="text-2xl text-center text-black mb-2" style={{ fontFamily: "Arial", fontWeight: 400 }}>
                    Create Account
                </h1>

                {/* Google Sign Up Button */}
                <button 
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 h-14 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 hover:bg-gray-50 transition-all mb-8 shadow-sm disabled:opacity-70"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.16H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.84l3.66-2.75z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.16l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
                    </svg>
                    {loading ? "Signing in..." : "Sign up with Google"}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-sm text-gray-500">or</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                {/* Full Name */}
                <label className="block text-sm text-gray-700 mb-1" style={{ fontFamily: "Arial", fontWeight: 400 }}>
                    Full Name
                </label>
                <div className="relative mb-4">
                    <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400"
                        style={{ fontFamily: "Arial", fontWeight: 400 }}
                    />
                </div>

                {/* Email */}
                <label className="block text-sm text-gray-700 mb-1" style={{ fontFamily: "Arial", fontWeight: 400 }}>
                    Email Address
                </label>
                <div className="relative mb-4">
                    <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400"
                        style={{ fontFamily: "Arial", fontWeight: 400 }}
                    />
                </div>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="w-full h-12 bg-[#000000] text-white rounded-xl hover:opacity-90 transition mb-4"
                    style={{ fontFamily: "Arial", fontWeight: 400 }}
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

                <p className="text-center text-sm text-gray-600 mb-4" style={{ fontFamily: "Arial", fontWeight: 400 }}>
                    Already have an account?{" "}
                    <Link href="/sign-in" className="font-semibold text-[#000000] hover:underline">
                        Sign in
                    </Link>
                </p>

                <p className="text-center text-xs text-gray-500" style={{ fontFamily: "Arial", fontWeight: 400 }}>
                    By creating an account, you agree to our{" "}
                    <span className="underline cursor-pointer">Terms of Service</span> and{" "}
                    <span className="underline cursor-pointer">Privacy Policy</span>
                </p>
            </div>
        </div>
    );
}