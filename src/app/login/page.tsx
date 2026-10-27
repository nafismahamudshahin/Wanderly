"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, LockKeyhole } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { signIn } from "@/lib/auth-client";

const SignInPage = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        const form = e.currentTarget;
        const formData = new FormData(form);
        const { email, password } = Object.fromEntries(
            formData.entries()
        ) as { email: string; password: string };

        setSubmitting(true);
        const { data, error } = await signIn.email({
            email,
            password,
            rememberMe,
            callbackURL: "/",
        });
        setSubmitting(false);

        if (data) {
            toast.success("Welcome back!");
            router.push("/");
        } else {
            setError(error?.message ?? "Could not sign in. Please try again.");
        }
    };

    return (
        <main className="flex  flex-col items-center justify-center bg-[#f7f8fa] px-4 py-8">
            <div className="w-full max-w-84.5 sm:max-w-100">
                <header className="mb-5 text-center">
                    <h1 className="font-serif text-[27px] leading-tight tracking-tight text-[#171717]">
                        Welcome Back
                    </h1>
                    <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
                        Resume your adventure with Wanderlust
                    </p>
                </header>

                <Card className="rounded-none border border-gray-100 bg-white py-0 shadow-md">
                    <CardContent className="p-5 sm:p-5.5">
                        <form onSubmit={handleSubmit} className="space-y-3">
                            {/* email */}
                            <div className="space-y-1">
                                <Label htmlFor="email" className="text-[11px] font-normal">
                                    Email Address
                                </Label>

                                <div className="relative">
                                    <Mail className="absolute left-2.5 top-1/2 size-3 -translate-y-1/2 text-gray-500" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        autoComplete="email"
                                        required
                                        className="h-7 rounded-none border-gray-100 bg-[#f7f8fa] pl-6 text-[11px] shadow-none placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-cyan-500"
                                    />
                                </div>
                            </div>

                            {/* password */}
                            <div className="space-y-1">
                                <Label htmlFor="password" className="text-[11px] font-normal">
                                    Password
                                </Label>

                                <div className="relative">
                                    <LockKeyhole className="absolute left-2.5 top-1/2 size-3 -translate-y-1/2 text-gray-500" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        required
                                        className="h-7 rounded-none border-gray-100 bg-[#f7f8fa] pl-6 text-[11px] shadow-none placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-cyan-500"
                                    />
                                </div>
                            </div>

                            {/* remember me / forgot password */}
                            <div className="flex items-center justify-between">
                                <label className="flex cursor-pointer items-center gap-1.5 text-[11px] text-gray-600">
                                    <Checkbox
                                        checked={rememberMe}
                                        onCheckedChange={(checked) =>
                                            setRememberMe(checked === true)
                                        }
                                    />
                                    Remember me
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-[11px] font-medium text-[#079fbd] hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {error && (
                                <p role="alert" className="text-xs text-red-600">
                                    {error}
                                </p>
                            )}

                            <Button
                                type="submit"
                                disabled={submitting}
                                className="h-8 w-full rounded-none bg-[#16a3bd] text-[11px] font-normal text-white hover:bg-[#128ca4]"
                            >
                                {submitting ? "Signing in..." : "Sign In"}
                            </Button>

                            <div className="flex items-center gap-2 py-0.5">
                                <div className="h-px flex-1 bg-gray-100" />
                                <span className="text-[10px] text-gray-500">
                                    Or continue with
                                </span>
                                <div className="h-px flex-1 bg-gray-100" />
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                className="h-8 w-full rounded-none border-gray-100 text-[11px] font-normal hover:bg-gray-50"
                                onClick={() => {
                                    // Connect Google OAuth here.
                                }}
                            >
                                <svg
                                    viewBox="0 0 48 48"
                                    className="size-3"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill="#4285F4"
                                        d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5h6.6c3.9-3.6 6.1-8.8 6.1-14.9Z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.1A20 20 0 0 0 24 44Z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M12.6 27.7a12 12 0 0 1 0-7.4v-5.1H5.8a20 20 0 0 0 0 17.6l6.8-5.1Z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8A19.4 19.4 0 0 0 24 4 20 20 0 0 0 5.8 15.2l6.8 5.1c1.6-4.8 6.1-8.2 11.4-8.2Z"
                                    />
                                </svg>
                                Sign Up With Google
                            </Button>

                            <p className="pt-1 text-center text-[10px] text-gray-500 sm:text-[11px]">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/signup"
                                    className="font-medium text-[#079fbd] hover:underline"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default SignInPage;
