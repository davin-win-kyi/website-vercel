import { createFileRoute } from "@tanstack/react-router";
import {
  FileText,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import portrait from "@/assets/about-portrait.jpg";
import amazonLogo from "@/assets/amazon-logo.png";
import uwLogo from "@/assets/uw-logo.png";
import makeabilityLogo from "@/assets/makeability-logo.png";
import dubLogo from "@/assets/dub-logo.png";
import capitalOneLogo from "@/assets/capitalone-logo.png";
import ansysLogo from "@/assets/ansys-logo.png";
import pennymacLogo from "@/assets/pennymac-logo.png";
import { RESUME_URL } from "@/lib/links";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Davin Win Kyi" },
      {
        name: "description",
        content:
          "Davin Win Kyi's education at the University of Washington and experience at the Makeability Lab, DUB Group, Amazon, and Capital One.",
      },
      { property: "og:title", content: "About — Davin Win Kyi" },
      { property: "og:description", content: "Education and experience of Davin Win Kyi." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

type TimelineItem = {
  period: string;
  title: string;
  subtitle: string;
  location?: string;
  points?: string[];
  logo?: string;
  initials?: string;
  bg?: string;
};

const education: TimelineItem[] = [
  {
    period: "2024 – 2027",
    title: "University of Washington",
    subtitle: "M.S. in Computer Science & Engineering · GPA 3.87",
    location: "Seattle, WA · Expected Dec 2027",
    points: [
      "Coursework: Machine Learning, Deep Learning, Computer Vision, Artificial Intelligence, Robotics, AR/VR, Databases.",
    ],
    logo: uwLogo,
  },
  {
    period: "2021 – 2024",
    title: "University of Washington",
    subtitle: "B.S. in Computer Science",
    location: "Seattle, WA",
    points: [
      "Built a strong foundation in algorithms, systems, and human-computer interaction.",
    ],
    logo: uwLogo,
  },
];

const experience: TimelineItem[] = [
  {
    period: "Mar 2025 – Present",
    title: "Makeability Lab",
    subtitle: "Project Lead",
    location: "Seattle, WA",
    points: [
      "Developed a real-time AR translation system with font/background awareness, training an SVM on 1,500+ English fonts.",
      "Fine-tuning and benchmarking models using QLoRA on a synthetic SFT dataset of 1,000 accessibility examples.",
      "Built a spatially aware AR system for previewing online products in 3D via segmentation, inpainting, and 3D generation.",
    ],
    logo: makeabilityLogo,
  },
  {
    period: "2024 – Present",
    title: "DUB Group",
    subtitle: "Software Lead",
    location: "University of Washington",
    points: [
      "Curated a dataset of 100+ LLM-generated websites with annotated accessibility errors for benchmarking and evaluation.",
      "Building a real-time personalization plugin enabling adaptive behavior across 50+ applications, used by 250+ users.",
    ],
    logo: dubLogo,
  },
  {
    period: "Jun 2024 – Sep 2024",
    title: "Amazon",
    subtitle: "Software Development Engineer Intern",
    location: "Seattle, WA",
    points: [
      "Designed a test application letting Amazon developers explore design variations through an LLM human-feedback loop.",
      "Prototyped a full-stack tool to test thousands of designs for Amazon.com, improving click-rate across many users.",
    ],
    logo: amazonLogo,
  },
  {
    period: "Jun 2023 – Aug 2023",
    title: "Capital One",
    subtitle: "Software Engineer Intern",
    location: "San Francisco, CA",
    points: [
      "Built a large-scale Python application for 5M+ users, reducing processing time by 73%.",
      "Containerized and deployed services on Capital One infrastructure with Docker and Kubernetes.",
    ],
    logo: capitalOneLogo,
  },
  {
    period: "Jan 2023 – Mar 2023",
    title: "Ansys",
    subtitle: "Software Engineer Intern",
    location: "Canonsburg, PA · Remote",
    points: [
      "Crafted and engineered 25+ batch files, optimizing daily installations for 20+ software engineers and cutting runtime by 20%.",
      "Collaborated with 3 developers to boost the Discovery product's test coverage by writing 50+ C# tests, reducing bugs by 15%.",
      "Resolved 100+ critical C# test failures in the Discovery product, reducing bugs by a further 10%.",
    ],
    logo: ansysLogo,
  },
  {
    period: "Jun 2022 – Aug 2022",
    title: "PennyMac",
    subtitle: "Software Engineer Intern",
    location: "Agoura Hills, CA",
    points: [
      "Created customer campaigns with Salesforce and CSS/HTML/JS to convert thousands of potential leads.",
      "Partnered with the product team to boost lead acquisition by 20% via automated Salesforce Marketing Cloud features.",
      "Programmed a secure login system letting hundreds of PennyMac employees safely retrieve data using AMPScript, HTML, CSS, and JavaScript.",
    ],
    logo: pennymacLogo,
  },
];

function OrgAvatar({ item }: { item: TimelineItem }) {
  if (item.logo) {
    return (
      <span className="flex h-9 w-9 flex-none items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm">
        <img
          src={item.logo}
          alt={`${item.title} logo`}
          className="h-full w-full object-contain p-0.5"
          loading="lazy"
        />
      </span>
    );
  }
  if (item.initials && item.bg) {
    return (
      <span
        className="flex h-9 w-9 flex-none items-center justify-center rounded-lg text-xs font-bold text-white shadow-sm"
        style={{ backgroundColor: item.bg }}
        aria-hidden
      >
        {item.initials}
      </span>
    );
  }
  return null;
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative mt-6 pl-8">
      <span className="absolute left-[7px] top-2 bottom-2 w-px bg-border" aria-hidden />
      <ol className="space-y-8">
        {items.map((item) => (
          <li key={item.period + item.title} className="relative">
            <span
              className="absolute -left-[29px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-primary ring-1 ring-border"
              aria-hidden
            />
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {item.period}
            </p>
            <div className="mt-2 rounded-xl border border-border bg-card p-6 shadow-soft">
              <div className="flex flex-wrap items-center gap-3">
                <OrgAvatar item={item} />
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              </div>
              <p className="mt-0.5 text-sm font-medium text-foreground">{item.subtitle}</p>
              {item.location && (
                <p className="text-sm text-muted-foreground">{item.location}</p>
              )}
              {item.points && (
                <ul className="mt-3 space-y-2">
                  {item.points.map((p, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 md:py-20">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <div className="md:sticky md:top-24 md:self-start">
          <div className="relative mx-auto w-full max-w-xs">
            <div className="blob blob-animated absolute -inset-4 -z-10 bg-secondary" />
            <img
              src={portrait}
              alt="Portrait of Davin Win Kyi"
              width={600}
              height={600}
              loading="lazy"
              className="blob blob-animated aspect-square w-full object-cover shadow-lift"
              style={{ objectPosition: "50% 12%" }}
            />
          </div>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <FileText className="h-4 w-4" />
            Download Resume
          </a>
        </div>

        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">About</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            I'm a computer scientist applying machine learning and artificial
            intelligence in the space of augmented reality, accessibility, and
            human-computer interaction. I enjoy making systems that help bring
            the best out of anyone, whoever they are!
          </p>

          <section className="mt-12">
            <h2 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-foreground">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-secondary text-foreground">
                <GraduationCap className="h-4 w-4" aria-hidden />
              </span>
              Education
            </h2>
            <Timeline items={education} />
          </section>

          <section className="mt-12">
            <h2 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-foreground">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-secondary text-foreground">
                <Briefcase className="h-4 w-4" aria-hidden />
              </span>
              Experience
            </h2>
            <Timeline items={experience} />
          </section>
        </div>
      </div>
    </div>
  );
}
