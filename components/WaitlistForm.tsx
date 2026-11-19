"use client";

import { useEffect, useRef, useState } from "react";

const SUPABASE_URL = "https://sqiubgeanzowpgkaqcmz.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxaXViZ2Vhbnpvd3Bna2FxY216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MTQ5ODYsImV4cCI6MjA5MzA5MDk4Nn0.A7NCoRSsXoDtM4r5Ltx14_h1smUKO88V6Gz67RHnbeU";

type State = "idle" | "loading" | "success" | "error";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [hood, setHood] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState<string>("");
  const [count, setCount] = useState<number | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/waitlist_count?select=total`,
          {
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
              Accept: "application/json",
            },
          },
        );
        if (!res.ok) return;
        const data = (await res.json()) as { total: number }[];
        if (cancelled) return;
        const total = data?.[0]?.total;
        if (typeof total === "number") setCount(total);
      } catch {
        // silent
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function validEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading" || state === "success") return;

    const clean = email.trim().toLowerCase();
    if (!validEmail(clean)) {
      setState("error");
      setMessage("Ingresá un email válido (ej. nombre@dominio.com).");
      emailRef.current?.focus();
      return;
    }

    setState("loading");
    setMessage("");

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          email: clean,
          neighborhood: hood.trim() || null,
          source: "website",
          user_agent:
            typeof navigator !== "undefined"
              ? navigator.userAgent.slice(0, 180)
              : null,
        }),
      });

      if (res.ok) {
        setState("success");
        setMessage(
          "Entraste a la lista. Te avisamos en cuanto podamos arrancar en tu zona.",
        );
        if (count !== null) setCount(count + 1);
        return;
      }

      let body: { code?: string; message?: string } = {};
      try {
        body = (await res.json()) as { code?: string; message?: string };
      } catch {
        // ignore
      }

      if (body.code === "23505") {
        setState("success");
        setMessage("Ya estabas en la lista. Te avisamos primero.");
        return;
      }

      setState("error");
      setMessage(
        "No pudimos sumar tu email ahora. Probá de nuevo en unos minutos.",
      );
    } catch {
      setState("error");
      setMessage("Hay un problema de conexión. Volvé a intentar.");
    }
  }

  const disabled = state === "loading" || state === "success";

  return (
    <div className="waitlist-wrap">
      <form className="waitlist-form" onSubmit={onSubmit} noValidate>
        <div
          className={`waitlist-row ${state === "error" ? "is-invalid" : ""} ${
            state === "success" ? "is-success" : ""
          }`}
        >
          <input
            ref={emailRef}
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            autoCapitalize="none"
            disabled={disabled}
            required
            aria-label="Email"
          />
          <input
            type="text"
            name="neighborhood"
            value={hood}
            onChange={(e) => setHood(e.target.value)}
            placeholder="Barrio (opcional)"
            autoComplete="address-level3"
            maxLength={60}
            disabled={disabled}
            aria-label="Barrio (opcional)"
          />
          <button
            type="submit"
            className="waitlist-submit"
            disabled={disabled}
            data-state={state}
          >
            <span className="submit-label">
              {state === "loading"
                ? "Enviando..."
                : state === "success"
                  ? "✓ Listo"
                  : "Entrar a la lista"}
            </span>
            {state !== "success" && state !== "loading" && (
              <span className="submit-arrow" aria-hidden>
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            )}
          </button>
        </div>

        {message && (
          <p
            className={`waitlist-status ${
              state === "error" ? "is-error" : state === "success" ? "is-success" : ""
            }`}
            role="status"
            aria-live="polite"
          >
            {message}
          </p>
        )}

        <p className="waitlist-fine">
          Al enviar aceptás la{" "}
          <a href="/privacy">Política de privacidad</a>. Nunca vamos a
          compartir tu email con terceros.
        </p>
      </form>

      {count !== null && count > 0 && (
        <div className="waitlist-counter" aria-live="polite">
          <span className="counter-dot" aria-hidden />
          <span className="counter-num">{count}</span>
          <span className="counter-label">vecinos ya en la lista</span>
        </div>
      )}
    </div>
  );
}
