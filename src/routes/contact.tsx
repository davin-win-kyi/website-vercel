import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Github, Linkedin, GraduationCap, Send } from "lucide-react";
import { z } from "zod";
import { EMAIL } from "@/lib/links";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Davin Win Kyi" },
      {
        name: "description",
        content: "Get in touch with Davin Win Kyi by email or on LinkedIn, GitHub, and Google Scholar.",
      },
      { property: "og:title", content: "Contact — Davin Win Kyi" },
      { property: "og:description", content: "Get in touch with Davin Win Kyi." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const channels = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, icon: Mail },
  {
    label: "LinkedIn",
    value: "in/davin-kyi",
    href: "https://www.linkedin.com/in/davin-kyi/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "davin-win-kyi",
    href: "https://github.com/davin-win-kyi",
    icon: Github,
  },
  {
    label: "Google Scholar",
    value: "Davin Win Kyi",
    href: "https://scholar.google.com/citations?user=oS2UUosAAAAJ&hl=en",
    icon: GraduationCap,
  },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(1, "Please enter a message").max(1000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    const subject = encodeURIComponent(`Website message from ${result.data.name}`);
    const body = encodeURIComponent(
      `${result.data.message}\n\n— ${result.data.name} (${result.data.email})`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <p className="inline-block rounded-md bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Contact
      </p>
      <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Get in Touch
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-12 space-y-5" noValidate>
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full rounded-lg border border-input bg-background px-5 py-4 text-base text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring"
            placeholder="Name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-sm text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full rounded-lg border border-input bg-background px-5 py-4 text-base text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring"
            placeholder="Email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-sm text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            rows={6}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className="w-full resize-y rounded-lg border border-input bg-background px-5 py-4 text-base text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring"
            placeholder="Message"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-sm text-destructive">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Send className="h-4 w-4" aria-hidden />
          Send Message
        </button>
      </form>

      {/* Contact info — fallback channels */}
      <div className="mt-16 border-t border-border pt-10">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Or reach me directly
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {channels.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-secondary text-foreground">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground">{c.label}</span>
                  <span className="block truncate text-sm text-muted-foreground">{c.value}</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
