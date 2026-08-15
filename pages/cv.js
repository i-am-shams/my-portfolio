import Head from "next/head";
import Image from "next/image";
import JsonLd from "../components/JsonLd";
import Layout from "../components/Layout";
import Section from "../components/Section";
import SkillCategory from "../components/SkillCategory";
import resumeData from "../data/resume.json";
import { absoluteUrl, profilePageJsonLd, siteProfile, yearsOfExperience } from "../data/profile";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  CubeIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

const roleTargets = [
  "Senior Software Engineer",
  "Technical Lead",
  "Solution Architect",
  "Enterprise Application Specialist",
  "Reporting Systems Engineer",
];

const proofMetrics = [
  `${yearsOfExperience()}+ years enterprise software engineering`,
  "30+ member cross-functional delivery leadership",
  "100k+ utility users supported",
  "1M+ monthly transactions architected",
  "65% manual reporting effort reduction",
];

const enterpriseDomains = [
  "Utility Management",
  "ERP and Industrial Operations",
  "Reporting and Analytics",
  "Financial Systems",
  "OCR and Document Automation",
  "Operational Dashboards",
];

const selectedProjects = [
  {
    name: "DentalPMS",
    blurb:
      "Multi-tenant SaaS practice management system for dental clinics. Clean Architecture on ASP.NET Core and Blazor Server, with tenant isolation enforced by EF Core global query filters. Designed, built, deployed, and operated in production.",
    url: "https://demo.dentflowbd.com/login",
    linkLabel: "Live demo",
    tech: "ASP.NET Core 8 · Blazor Server · PostgreSQL · EF Core · Docker · nginx",
  },
  {
    name: "AI Job-Search Copilot",
    blurb:
      "Event-driven résumé-to-job matching pipeline. An ASP.NET Core API queues work to RabbitMQ, a background worker calls an AI model and persists results, and completions are pushed back to the browser over SignalR. Containerized, with CI/CD deploying on push.",
    url: "https://jobcopilot.dentflowbd.com",
    linkLabel: "Live app",
    tech: "ASP.NET Core 8 · RabbitMQ · SignalR · PostgreSQL · React · Docker · GitHub Actions",
  },
];

export default function CV() {
  const profileTitle = `${siteProfile.uppercaseName} | ${siteProfile.title}`;
  const description = siteProfile.summary;

  return (
    <>
      <Head>
        <title>{profileTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={siteProfile.keywords.join(", ")} />
        <meta name="author" content={siteProfile.name} />
        <link rel="canonical" href={absoluteUrl("/cv")} />
        <meta property="og:title" content={profileTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={absoluteUrl("/cv")} />
        <meta property="og:image" content={absoluteUrl(resumeData.personalInfo.photo)} />
        <meta property="og:image:alt" content={`${siteProfile.name} professional profile photo`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={profileTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={absoluteUrl(resumeData.personalInfo.photo)} />
        <JsonLd data={profilePageJsonLd("/cv", description)} />
      </Head>
      <Layout>
        <main className="container mx-auto max-w-6xl px-4 py-12">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-10 print:border-0 print:p-0 print:shadow-none">
            <div className="grid gap-8 print:gap-4 md:grid-cols-[auto_1fr] md:items-center print:grid-cols-[auto_1fr] print:items-center">
              <Image
                src={resumeData.personalInfo.photo}
                alt={resumeData.personalInfo.name}
                width={144}
                height={144}
                priority
                className="h-36 w-36 rounded-2xl object-cover shadow-sm print:h-20 print:w-20 print:shadow-none"
              />
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-blue-700 dark:text-blue-300">
                  Enterprise Software Engineering Leader
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight text-slate-950 dark:text-white md:text-5xl">
                  {resumeData.personalInfo.name}
                </h1>
                <p className="mb-5 max-w-4xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                  {resumeData.careerObjective.replace("{{YEARS}}", yearsOfExperience())}
                </p>
                <div className="flex flex-wrap gap-3 text-sm font-medium">
                  <a
                    href={`mailto:${resumeData.personalInfo.email}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-slate-800 transition-colors hover:border-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-600 dark:text-slate-100"
                  >
                    <EnvelopeIcon className="h-4 w-4" aria-hidden="true" />
                    {resumeData.personalInfo.email}
                  </a>
                  <a
                    href={`tel:${resumeData.personalInfo.phone}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-slate-800 transition-colors hover:border-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-600 dark:text-slate-100"
                  >
                    <PhoneIcon className="h-4 w-4" aria-hidden="true" />
                    {resumeData.personalInfo.phone}
                  </a>
                  <a
                    href={siteProfile.resume}
                    download
                    className="inline-flex items-center rounded-xl bg-slate-950 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100 print:hidden"
                  >
                    Download Resume PDF
                  </a>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2 text-slate-800 transition-colors hover:border-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-600 dark:text-slate-100 dark:hover:border-blue-300 dark:hover:text-blue-200 print:hidden"
                  >
                    Save as PDF
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section
            aria-label="Resume proof points"
            className="my-8 print:my-3 grid gap-4 print:gap-2 md:grid-cols-5 print:grid-cols-5"
          >
            {proofMetrics.map((metric) => (
              <div
                key={metric}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-semibold leading-6 text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 print:rounded-none print:border-0 print:bg-transparent print:shadow-none print:p-0"
              >
                {metric}
              </div>
            ))}
          </section>

          <Section title="Target Roles">
            <div className="flex flex-wrap gap-2">
              {roleTargets.map((role) => (
                <span
                  key={role}
                  className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800 dark:bg-blue-950 dark:text-blue-200 print:rounded-none print:bg-transparent print:px-0 print:py-0 print:text-xs print:font-normal"
                >
                  {role}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Enterprise Domains">
            <div className="grid gap-4 print:gap-2 md:grid-cols-3 print:grid-cols-3">
              {enterpriseDomains.map((domain) => (
                <div
                  key={domain}
                  className="rounded-2xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 print:rounded-none print:border-0 print:bg-transparent print:shadow-none print:p-0"
                >
                  {domain}
                </div>
              ))}
            </div>
          </Section>

          <Section title="Selected Projects">
            <div className="space-y-6 print:space-y-2">
              {selectedProjects.map((project) => (
                <article
                  key={project.name}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 print:rounded-none print:border-0 print:bg-transparent print:shadow-none print:p-0"
                >
                  <h3 className="text-xl font-semibold text-slate-950 dark:text-white mb-3">
                    {project.name}
                  </h3>
                  <p className="mb-3 text-slate-600 dark:text-slate-300">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} — ${project.linkLabel}`}
                      className="font-medium text-blue-700 hover:underline dark:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950 rounded"
                    >
                      {project.linkLabel}
                    </a>
                  </p>
                  <p className="mb-3 text-slate-600 dark:text-slate-300">
                    {project.blurb}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {project.tech}
                  </p>
                </article>
              ))}
            </div>
          </Section>

          <Section title="Professional Experience">
            <div className="space-y-6 print:space-y-2">
              {resumeData.experience.map((exp) => (
                <article
                  key={`${exp.position}-${exp.company}-${exp.duration}`}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 print:rounded-none print:border-0 print:bg-transparent print:shadow-none print:p-0"
                >
                  <div className="mb-4 flex items-start gap-4">
                    <BriefcaseIcon
                      className="mt-1 h-6 w-6 shrink-0 text-blue-700 dark:text-blue-300 print:hidden"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
                        {exp.position}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-blue-700 hover:underline dark:text-blue-300"
                          >
                            {exp.company}
                          </a>
                        ) : (
                          <span>{exp.company}</span>
                        )}{" "}
                        • {exp.duration}
                      </p>
                    </div>
                  </div>
                  <ul className="ml-10 list-disc space-y-2 text-slate-600 dark:text-slate-300 print:ml-4 print:space-y-0.5">
                    {exp.responsibilities.map((resp) => (
                      <li key={`${exp.company}-${resp}`} className="leading-7">
                        {resp}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Section>

          <Section title="Technical Proficiency">
            <div className="grid grid-cols-1 gap-6 print:gap-2 md:grid-cols-2 print:grid-cols-2">
              {resumeData.technicalSkills.map((skillGroup) => (
                <SkillCategory
                  key={skillGroup.category}
                  category={skillGroup.category}
                  items={skillGroup.items}
                />
              ))}
            </div>
          </Section>

          <Section title="Education">
            <div className="grid gap-4 print:gap-2 md:grid-cols-3 print:grid-cols-3">
              {resumeData.education.map((edu) => (
                <article
                  key={edu.degree}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 print:rounded-none print:border-0 print:bg-transparent print:shadow-none print:p-0"
                >
                  <AcademicCapIcon
                    className="mb-3 h-6 w-6 text-blue-700 dark:text-blue-300 print:hidden"
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                    {edu.degree}
                  </h3>
                  <p className="mt-1 text-slate-600 dark:text-slate-300">{edu.institution}</p>
                  {edu.year ? (
                    <p className="mt-1 text-slate-500 dark:text-slate-400">{edu.year}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </Section>

          <Section title="Certifications">
            <div className="grid gap-4 print:gap-2 md:grid-cols-2 print:grid-cols-2">
              {resumeData.certifications.map((certification) => (
                <article
                  key={certification.name}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 print:rounded-none print:border-0 print:bg-transparent print:shadow-none print:p-0"
                >
                  <CubeIcon
                    className="mb-3 h-6 w-6 text-blue-700 dark:text-blue-300 print:hidden"
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                    {certification.name}
                  </h3>
                  <p className="mt-1 text-slate-600 dark:text-slate-300">
                    {certification.issuer}
                  </p>
                  <p className="mt-1 text-slate-500 dark:text-slate-400">
                    {certification.validity}
                  </p>
                </article>
              ))}
            </div>
          </Section>
        </main>
      </Layout>
    </>
  );
}
