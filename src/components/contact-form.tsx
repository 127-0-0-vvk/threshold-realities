"use client";

import { useState } from "react";
import { practices } from "@/lib/content";

/**
 * No backend yet. On submit this shows a confirmation and logs the payload.
 * Wire to a form endpoint (Resend, Formspark, or an API route) before launch —
 * see README.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="border p-10" style={{ borderColor: "var(--color-stable)" }}>
        <p className="mono text-[0.6875rem] tracking-[0.16em] uppercase" style={{ color: "var(--color-stable)" }}>
          Received
        </p>
        <h2 className="display mt-5 text-3xl">Thank you.</h2>
        <p className="mt-4 text-[var(--text-dim)]">
          An analyst will come back to you within one working day with an initial
          read on your exposure.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mono link-underline mt-8 text-[0.625rem] tracking-[0.16em] uppercase text-[var(--color-watch)]"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-8"
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Work email" name="email" type="email" required />
        <Field label="Organisation" name="org" required />
        <Field label="Role" name="role" />
      </div>

      <fieldset>
        <legend className="eyebrow">Where do you operate?</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {practices.map((p) => (
            <label
              key={p.code}
              className="mono cursor-pointer border border-[var(--rule)] px-3 py-2 text-[0.625rem] tracking-[0.12em] uppercase text-[var(--text-dim)] transition-colors has-[:checked]:border-[var(--color-watch)] has-[:checked]:text-[var(--color-watch)] hover:border-[var(--text-faint)]"
            >
              <input type="checkbox" name="interest" value={p.title} className="sr-only" />
              {p.title}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="eyebrow">
          What are you trying to decide?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Markets you operate in, what you move, and the decision in front of you."
          className="mt-3 w-full border border-[var(--rule)] bg-transparent px-4 py-3 text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[var(--color-watch)]"
        />
      </div>

      <button
        type="submit"
        className="mono inline-flex items-center gap-2.5 bg-[var(--color-watch)] px-7 py-4 text-[0.6875rem] tracking-[0.16em] uppercase text-[#14181c] transition-colors hover:bg-[var(--color-high)] hover:text-white"
      >
        Send enquiry
        <span aria-hidden>&rarr;</span>
      </button>

      <p className="mono text-[0.625rem] leading-relaxed tracking-[0.06em] text-[var(--text-faint)]">
        This form is not yet connected to a backend. Submissions are not stored or
        sent.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow">
        {label}
        {required ? <span className="text-[var(--color-critical)]"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-3 w-full border-b border-[var(--rule)] bg-transparent py-2.5 text-[var(--text)] outline-none transition-colors focus:border-[var(--color-watch)]"
      />
    </div>
  );
}
