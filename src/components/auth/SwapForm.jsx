import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaGoogle } from "react-icons/fa";
import { Lightbulb, Loader2 } from "lucide-react";

const DEFAULT_LOGIN_TEXTS = {
  signInTitle: "Sign In",
  signUpTitle: "Create Account",
  signInSubtitle: "Access your workspace, teams, and operations cockpit.",
  signUpSubtitle: "Set up your account and step into your startup workspace.",
  signInButton: "Sign In",
  signUpButton: "Create Account",
  footerSignIn: "Don't have an account?",
  footerSignUp: "Already have an account?",
  footerSignInCta: "Create Account",
  footerSignUpCta: "Sign In",
};

export default function SwapForm({
  isSignIn,
  onModeChange,
  onGoogleLogin,
  onEmailSubmit,
  message,
  isGoogleLoading = false,
  isEmailLoading = false,
  texts = {},
}) {
  const mergedTexts = { ...DEFAULT_LOGIN_TEXTS, ...texts };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const variants = {
    initial: { opacity: 0, y: -24, scale: 0.98, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, y: -24, scale: 0.98, filter: "blur(4px)" },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim() || isEmailLoading) return;
    await onEmailSubmit({
      mode: isSignIn ? "signin" : "signup",
      email: email.trim(),
      password,
    });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isSignIn ? "signin" : "signup"}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ ease: "easeInOut", duration: 0.28 }}
        className="w-full max-w-sm overflow-hidden rounded-[2rem] border border-[#d8e0e8] bg-[#eef2f4] shadow-[0_20px_50px_rgba(20,34,52,0.12)]"
      >
        <div className="rounded-[1.7rem] border-b border-[#d8e0e8] bg-white px-6 pb-9 pt-8 sm:px-8 sm:pb-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#35527d] text-white shadow-[0_14px_28px_rgba(53,82,125,0.18)]">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-[-0.04em] text-[#243041]">IdeaForge</h1>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#7b8794]">
                Operations Intelligence
              </p>
            </div>
          </div>

          <h2 className="text-center text-3xl font-bold tracking-[-0.05em] text-[#243041] sm:text-left">
            {isSignIn ? mergedTexts.signInTitle : mergedTexts.signUpTitle}
          </h2>

          <p className="mb-6 mt-2 text-center text-[15px] leading-7 text-[#6b7280] sm:text-left sm:text-[16px]">
            {isSignIn ? mergedTexts.signInSubtitle : mergedTexts.signUpSubtitle}
          </p>

          {message && (
            <div className="mb-5 rounded-2xl border border-[#dbe7f0] bg-[#f4f8fb] px-4 py-3 text-sm font-medium text-[#35527d]">
              {message}
            </div>
          )}

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => void onGoogleLogin()}
              disabled={isGoogleLoading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#d8e0e8] bg-white px-4 py-3 text-[15px] font-medium text-[#243041] shadow-sm transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGoogleLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FaGoogle className="text-lg" />}
              {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d8e0e8] to-transparent" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-[#98a2b3]">or</span>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#243041]" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-3 text-[15px] text-[#243041] shadow-sm outline-none transition focus:border-[#35527d] focus:ring-1 focus:ring-[#35527d]/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#243041]" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete={isSignIn ? "current-password" : "new-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="********"
                className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-3 text-[15px] text-[#243041] shadow-sm outline-none transition focus:border-[#35527d] focus:ring-1 focus:ring-[#35527d]/20"
              />
            </div>

            <motion.button
              whileHover={{ scale: isEmailLoading ? 1 : 1.012 }}
              whileTap={{ scale: isEmailLoading ? 1 : 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
              disabled={isEmailLoading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#35527d] px-4 py-3.5 text-[15px] font-semibold text-white shadow-[0_18px_36px_rgba(53,82,125,0.18)] transition hover:bg-[#2c4567] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isEmailLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSignIn ? mergedTexts.signInButton : mergedTexts.signUpButton}
            </motion.button>
          </form>
        </div>

        <div className="bg-[#eef2f4] px-6 py-4 text-center sm:px-8">
          <p className="text-[13px] text-[#7b8794] sm:text-[14px]">
            {isSignIn ? mergedTexts.footerSignIn : mergedTexts.footerSignUp}
            <button
               type="button"
               onClick={() => onModeChange(!isSignIn)}
               className="ml-1 font-medium text-[#243041]"
            >
              {isSignIn ? mergedTexts.footerSignInCta : mergedTexts.footerSignUpCta}
            </button>
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
