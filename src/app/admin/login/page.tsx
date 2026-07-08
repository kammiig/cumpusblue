"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { loginAction } from "../actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary w-full" disabled={pending}>
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

function LoginForm() {
  const params = useSearchParams();
  const [state, action] = useFormState(loginAction, undefined);

  return (
    <form action={action} className="card w-full max-w-sm p-8">
      <p className="font-display text-2xl font-bold lowercase tracking-tight">
        <span className="text-ink">compu</span>
        <span className="text-brand-500">blue</span>
      </p>
      <h1 className="h-display mt-1 text-lg">Admin sign in</h1>

      <input type="hidden" name="next" value={params.get("next") || "/admin"} />

      <div className="mt-6">
        <label htmlFor="login-email" className="label">Email</label>
        <input id="login-email" name="email" type="email" required autoComplete="username" className="field" />
      </div>
      <div className="mt-4">
        <label htmlFor="login-password" className="label">Password</label>
        <input id="login-password" name="password" type="password" required autoComplete="current-password" className="field" />
      </div>

      {state?.error && (
        <p role="alert" className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {state.error}
        </p>
      )}

      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
