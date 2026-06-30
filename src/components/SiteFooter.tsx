import { SOCIAL_LINKS } from "@/lib/links";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 md:hidden">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Davin Win Kyi
        </p>
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
