"use client";

import { useState } from "react";

export function ConsoleLogin({ configured }: { configured: boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!configured) {
    return (
      <div className="mx-auto max-w-lg border border-[var(--rule)] bg-[var(--surface-raised)] p-8">
        <span className="eyebrow">Console</span>
        <h1 className="display mt-4 text-3xl">Not configured.</h1>
        <p className="mt-4 text-[var(--text-dim)]">
          Set <code className="mono text-[var(--text)]">ADMIN_PASSWORD</code> and{" "}
          <code className="mono text-[var(--text)]">ADMIN_SECRET</code> in{" "}
          <code className="mono text-[var(--text)]">.env.local</code>, then restart
          the server. See the README.
        </p>
      </div>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/console/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      window.location.reload();
      return;
    }
    const data = await res.json().catch(() => ({}));
    setError(data.error ?? "Could not sign in.");
    setBusy(false);
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto max-w-md border border-[var(--rule)] bg-[var(--surface-raised)] p-8"
    >
      <span className="eyebrow">Console</span>
      <h1 className="display mt-4 text-3xl">Sign in.</h1>

      <label htmlFor="password" className="eyebrow mt-8 block">
        Password
      </label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mt-3 w-full border-b border-[var(--rule)] bg-transparent py-2.5 text-[var(--text)] outline-none focus:border-[var(--color-watch)]"
      />

      {error ? (
        <p
          className="mono mt-5 text-[0.6875rem] leading-relaxed"
          style={{ color: "var(--color-critical)" }}
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="mono mt-8 w-full bg-[var(--color-brand)] px-6 py-3.5 text-[0.6875rem] tracking-[0.16em] uppercase text-[var(--color-on-brand)] transition-colors hover:bg-[var(--color-brand-strong)] disabled:opacity-50"
      >
        {busy ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}
