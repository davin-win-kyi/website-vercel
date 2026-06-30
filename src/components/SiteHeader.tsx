import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/publications", label: "Publications" },
  { to: "/teaching", label: "Teaching" },
  { to: "/hobbies", label: "Hobbies" },
  { to: "/contact", label: "Contact" },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Main navigation" className="flex flex-col gap-1">
      {links.map((l) => (
        <Link
          key={l.to}
          to={l.to}
          activeOptions={{ exact: l.to === "/" }}
          onClick={onNavigate}
          className="rounded-md py-1.5 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
          activeProps={{ className: "text-foreground" }}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col justify-between border-r border-border/60 px-8 py-10 md:flex">
        <div>
          <Link
            to="/"
            className="text-2xl font-bold leading-tight tracking-tight text-foreground"
          >
            Davin Win Kyi
          </Link>
          <div className="mt-12">
            <NavLinks />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Davin Win Kyi
          </p>
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border/60 bg-background/80 px-5 py-4 backdrop-blur-md md:hidden">
        <Link to="/" className="text-lg font-bold tracking-tight text-foreground">
          Davin Win Kyi
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <div
        className={cn(
          "sticky top-[57px] z-40 border-b border-border/60 bg-background/95 px-5 py-2 backdrop-blur-md md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <NavLinks onNavigate={() => setOpen(false)} />
      </div>
    </>
  );
}
