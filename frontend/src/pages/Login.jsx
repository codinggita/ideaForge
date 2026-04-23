import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SwapForm from "../components/auth/SwapForm";

const loginFeatures = [
  { label: "Workspace Switching", value: "Live" },
  { label: "AI Operations", value: "Built-in" },
  { label: "Team Roles", value: "Scoped" },
];

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const [isSignIn, setIsSignIn] = useState(true);
  const [authMode, setAuthMode] = useState("idle");
  const message = searchParams.get("message") || undefined;

  const handleGoogleLogin = async () => {
    setAuthMode("google");
    setTimeout(() => {
      setAuthMode("idle");
      alert("Mock: Google Login Initiated");
    }, 1500);
  };

  const handleEmailSubmit = async (payload) => {
    setAuthMode(payload.mode);
    setTimeout(() => {
      setAuthMode("idle");
      alert(`Mock: ${payload.mode} successful for ${payload.email}`);
    }, 1500);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f6f3ee] px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(78,104,148,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(174,197,206,0.22),transparent_28%),linear-gradient(180deg,#fbfaf7_0%,#f3efe7_100%)]" />
        <div className="absolute right-[-8rem] top-[5rem] h-[24rem] w-[24rem] rounded-full bg-[#d7deec]/45 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-[-8rem] h-[24rem] w-[24rem] rounded-full bg-[#dbe6e8]/50 blur-3xl" />
      </div>

      <div className="relative z-10 grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.1fr)_420px] lg:items-center">
        <div className="hidden lg:block">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7b8794]">
              Role-Aware Startup Workspace
            </p>
            <h1 className="mt-6 text-6xl font-semibold tracking-[-0.07em] text-[#243041]">
              Run ideas, teams, and execution from one calmer operating layer.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#667085]">
              Sign in to access your workspace, move between teams, draft with AI, and keep operations visible from
              planning to execution.
            </p>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              {loginFeatures.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.5rem] border border-[#d8e0e8] bg-white/75 px-5 py-5 shadow-[0_18px_40px_rgba(36,48,65,0.05)]"
                >
                  <p className="text-2xl font-semibold tracking-[-0.05em] text-[#243041]">{item.value}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#98a2b3]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <SwapForm
            isSignIn={isSignIn}
            onModeChange={setIsSignIn}
            onGoogleLogin={handleGoogleLogin}
            onEmailSubmit={handleEmailSubmit}
            message={message}
            isGoogleLoading={authMode === "google"}
            isEmailLoading={authMode === "signin" || authMode === "signup"}
            texts={{
              signInTitle: "Welcome back",
              signUpTitle: "Create your account",
              signInSubtitle: "Access your workspace, team dashboard, and operations hub.",
              signUpSubtitle: "Start with one account, then grow into teams, workspaces, and AI execution.",
              signInButton: "Sign In",
              signUpButton: "Create Account",
            }}
          />
        </div>
      </div>
    </div>
  );
}
