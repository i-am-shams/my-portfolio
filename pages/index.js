import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import Layout from "../components/Layout";
import Availability from "../components/Availability";
import Section from "../components/Section";
import BuildProject from "../components/BuildProject";
import { buildProjects } from "../data/buildProjects";
import { absoluteUrl, personJsonLd, siteProfile, websiteJsonLd, yearsOfExperience } from "../data/profile";

const proofMetrics = [
  { value: `${yearsOfExperience()}+`, label: "Years in enterprise software" },
  { value: "30+", label: "Engineers and QA led" },
  { value: "100k+", label: "Utility users supported" },
  { value: "1M+", label: "Monthly transactions architected" },
  { value: "65%", label: "Reduction in manual reporting time" },
];

// The three that survive a ten-second scan. proofMetrics keeps all five for the
// band below the hero.
const heroMetrics = [
  { value: `${yearsOfExperience()}+`, label: "years in enterprise software" },
  { value: "100k+", label: "utility users supported" },
  { value: "1M+", label: "monthly transactions" },
];

const capabilityPillars = [
  {
    title: "Enterprise Application Architecture",
    description:
      "Designing modular, maintainable platforms across billing, ERP, financial, OCR, and operational domains.",
  },
  {
    title: "Reporting and Analytics Platforms",
    description:
      "Building data-driven reporting workflows, executive dashboards, and decision-support systems for management teams.",
  },
  {
    title: "Operational Dashboards and Monitoring",
    description:
      "Connecting SCADA, GIS, transaction, and business data into dashboards that improve operational visibility.",
  },
  {
    title: "Technical Leadership and Delivery",
    description:
      "Leading cross-functional teams from discovery and architecture through release governance and production adoption.",
  },
];

const enterpriseProjects = [
  {
    title: "Enterprise ERP Platform",
    domain: "Industrial operations",
    summary:
      "Designed and developed inventory, accounts, payroll, and HR modules for Eastern Refinery Ltd., supporting structured enterprise workflows and internal reporting.",
    impact:
      "Replaced spreadsheet-based inventory, payroll, and accounts workflows with a single system of record, cutting manual handling and giving management consistent visibility across business functions.",
    technologies: [".NET", "ASP.NET", "SQL Server", "ERP Modules", "Reporting"],
  },
  {
    title: "Financial Analytics Systems",
    domain: "Financial and compliance technology",
    summary:
      "Developed financial analytics tools involving real-time data processing, market trend analysis, and decision-support workflows.",
    impact:
      "Put real-time market signals and structured analytics in front of decision-makers, replacing end-of-day manual review with continuously updated positions.",
    technologies: [".NET", "Real-Time Data", "Analytics", "Predictive Logic"],
  },
  {
    title: "OCR and Intelligent Data Capture",
    domain: "Document automation",
    summary:
      "Implemented OCR and image-processing solutions using Tesseract to extract structured data from scanned documents and image inputs.",
    impact:
      "Turned scanned documents into structured, searchable records without manual keying, removing the transcription step from the digitization workflow entirely.",
    technologies: ["Tesseract OCR", "Image Processing", "Data Extraction", ".NET"],
  },
];

const leadershipModel = [
  "Translate complex operational needs into clear technical roadmaps.",
  "Design scalable application, API, reporting, and integration architecture.",
  "Lead engineering, QA, delivery, and stakeholder coordination through release.",
  "Stabilize systems with governance, quality gates, and production readiness.",
];

const credibilitySignals = [
  "Certified ScrumMaster (2023-2025), with delivery governance and release-readiness experience.",
  "Computer Science background from BRAC University.",
  "Hands-on architecture and implementation depth across .NET, React, Angular, SQL Server, APIs, and cloud services.",
  "Enterprise domain exposure across utilities, ERP, financial analytics, OCR, reporting, and operational monitoring.",
];

export default function Home() {
  const siteDescription = siteProfile.summary;

  return (
    <>
      <Head>
        <title>{`${siteProfile.name} | ${siteProfile.title}`}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={siteProfile.keywords.join(", ")} />
        <meta name="author" content={siteProfile.name} />
        <link rel="canonical" href={absoluteUrl("/")} />
        <meta
          property="og:title"
          content={`${siteProfile.name} | ${siteProfile.title}`}
        />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={absoluteUrl("/")} />
        <meta property="og:image" content={absoluteUrl(siteProfile.image)} />
        <meta property="og:image:alt" content={`${siteProfile.name} professional profile photo`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${siteProfile.name} | ${siteProfile.title}`}
        />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={absoluteUrl(siteProfile.image)} />
        <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
      </Head>
      <Layout>
        <main className="container mx-auto px-4 py-12 max-w-6xl">
          <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:grid-cols-[1.5fr_1fr] md:p-10">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-blue-700 dark:text-blue-300">
                Enterprise Software Engineering Leader
              </p>
              <h1 className="mb-5 text-4xl font-bold tracking-tight text-slate-950 dark:text-white md:text-6xl">
                I build and operate the systems I lead.
              </h1>
              <p className="mb-7 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                {yearsOfExperience()}+ years in enterprise .NET, ERP, and reporting platforms. Three of the systems on this page are running in production right now — architecture, deployment, and on-call, all mine.
              </p>
              {/* Three numbers, inside the hero, so proof clears the fold on a
                  390px phone as well as on a desktop. The full five-metric band
                  below the hero is unchanged. */}
              <dl className="mb-7 flex flex-wrap gap-x-8 gap-y-3" aria-label="Headline proof metrics">
                {heroMetrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="sr-only">{metric.label}</dt>
                    <dd>
                      <span className="text-2xl font-bold text-slate-950 dark:text-white">
                        {metric.value}
                      </span>
                      <span className="ml-2 text-sm text-slate-600 dark:text-slate-300">
                        {metric.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
              {/* The availability panel lives in the aside, which is below the fold on
                  a phone - so the same answer gets a one-line form up here, hidden
                  once the two-column layout kicks in and the panel is visible. */}
              <Availability className="mb-6 md:hidden" />

              <div className="flex flex-wrap gap-3">
                <a
                  href="#engineering"
                  className="inline-flex items-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
                >
                  See systems running in production
                </a>
                <a
                  href="#case-study"
                  className="inline-flex items-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-600 dark:text-slate-100 dark:hover:border-blue-300 dark:hover:text-blue-200"
                >
                  Enterprise case study
                </a>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <a
                  href={siteProfile.resume}
                  download
                  className="text-slate-600 underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-slate-300 dark:hover:text-slate-100"
                >
                  Download Resume
                </a>
                <Link
                  href="/cv"
                  className="text-slate-600 underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-slate-300 dark:hover:text-slate-100"
                >
                  View CV
                </Link>
                <a
                  href="mailto:i.am.shams@gmail.com"
                  className="text-slate-600 underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-slate-300 dark:hover:text-slate-100"
                >
                  Contact Khalid
                </a>
              </div>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-5 flex items-center gap-4">
                <Image
                  src={siteProfile.image}
                  alt={`${siteProfile.name} portrait`}
                  width={64}
                  height={64}
                  className="h-16 w-16 flex-shrink-0 rounded-full border border-slate-200 object-cover dark:border-slate-600"
                  priority
                />
                <div>
                  <p className="font-semibold text-slate-950 dark:text-white">{siteProfile.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{siteProfile.location}</p>
                </div>
              </div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">
                Availability
              </p>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-slate-950 dark:text-white">Open to</dt>
                  <dd className="text-slate-600 dark:text-slate-300">
                    {siteProfile.availability.status}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-950 dark:text-white">Based in</dt>
                  <dd className="text-slate-600 dark:text-slate-300">
                    {siteProfile.availability.base}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-950 dark:text-white">Overlap</dt>
                  <dd className="text-slate-600 dark:text-slate-300">
                    {siteProfile.availability.overlap}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-950 dark:text-white">Notice</dt>
                  <dd className="text-slate-600 dark:text-slate-300">
                    {siteProfile.availability.notice}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-950 dark:text-white">Looking for</dt>
                  <dd className="text-slate-600 dark:text-slate-300">
                    Senior Software Engineer · Technical Lead · Solution Architect
                  </dd>
                </div>
              </dl>
            </aside>
          </section>

          <section
            aria-label="Professional proof metrics"
            className="my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
          >
            {proofMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <p className="text-3xl font-bold text-slate-950 dark:text-white">{metric.value}</p>
                <p className="mt-2 text-sm leading-5 text-slate-600 dark:text-slate-300">
                  {metric.label}
                </p>
              </div>
            ))}
          </section>

          <Section title="Executive Summary">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <p className="text-lg leading-8 text-slate-700 dark:text-slate-300">
                I help organizations modernize legacy operations into scalable digital
                platforms: billing systems, ERP modules, analytics dashboards, reporting
                workflows, API-driven services, and operational monitoring tools. My
                strength is connecting architecture, delivery, and stakeholder outcomes
                across complex enterprise environments.
              </p>
            </div>
          </Section>

          <Section title="Enterprise Capabilities">
            <div className="grid gap-5 md:grid-cols-2">
              {capabilityPillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900"
                >
                  <h3 className="mb-3 text-xl font-semibold text-slate-950 dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="leading-7 text-slate-600 dark:text-slate-300">
                    {pillar.description}
                  </p>
                </article>
              ))}
            </div>
          </Section>

          <div id="engineering">
            <Section title="Engineering Deep Dive">
              <p className="max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
                Enterprise delivery is one kind of evidence; a system you can open in a browser is another. All three were designed, built, deployed, and operated end to end, and all three are running in production right now.
              </p>
              {buildProjects.map((project) => (
                <BuildProject key={project.slug} project={project} />
              ))}
            </Section>
          </div>

          <div id="case-study">
            <Section title="Flagship Case Study">
              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">
                      Utility Digital Transformation
                    </p>
                    <h3 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">
                      CWASA Digital Ecosystem
                    </h3>
                  </div>
                  <p className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
                    Project Lead
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 text-lg font-semibold text-slate-950 dark:text-white">
                      Business Problem
                    </h4>
                    <p className="leading-7 text-slate-600 dark:text-slate-300">
                      CWASA needed stronger operational visibility, faster reporting,
                      improved billing workflows, and data-driven insight into water
                      distribution, non-revenue water, and management-level decisions.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-semibold text-slate-950 dark:text-white">
                      Architecture
                    </h4>
                    <p className="leading-7 text-slate-600 dark:text-slate-300">
                      Delivered a modular platform using ASP.NET Core, microservices,
                      REST APIs, SQL Server-backed reporting workflows, React web
                      interfaces, Kotlin Android interfaces, API gateway patterns, and
                      SCADA/GIS integrations.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-semibold text-slate-950 dark:text-white">
                      Scale and Impact
                    </h4>
                    <p className="leading-7 text-slate-600 dark:text-slate-300">
                      Supported 100k+ users and 1M+ monthly transactions while reducing
                      manual reporting effort by 65% and improving management visibility
                      across operational workflows.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-semibold text-slate-950 dark:text-white">
                      Leadership Contribution
                    </h4>
                    <p className="leading-7 text-slate-600 dark:text-slate-300">
                      Led a 30+ member cross-functional team across engineering, QA,
                      delivery, and stakeholder coordination, owning planning, technical
                      direction, release governance, and business alignment.
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {[
                    "ASP.NET Core",
                    "C#",
                    "React",
                    "Kotlin",
                    "SQL Server",
                    "Microservices",
                    "REST APIs",
                    "Ocelot API Gateway",
                    "Azure/AWS",
                    "SCADA",
                    "GIS",
                    "Reporting Dashboards",
                  ].map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </article>
            </Section>
          </div>

          <Section title="Selected Enterprise Systems">
            <p className="mb-6 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              These are client and employer systems, so there is no link to open and no
              source to read — unlike the builds above, you are taking these on my word.
              They are described in terms of what was built rather than metrics I cannot
              evidence here.
            </p>
            <div className="grid gap-5 md:grid-cols-3">
              {enterpriseProjects.map((project) => (
                <article
                  key={project.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                >
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">
                    {project.domain}
                  </p>
                  <h3 className="mb-3 text-xl font-semibold text-slate-950 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mb-4 leading-7 text-slate-600 dark:text-slate-300">
                    {project.summary}
                  </p>
                  <p className="mb-5 text-sm font-medium leading-6 text-slate-700 dark:text-slate-200">
                    {project.impact}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section title="Leadership Model">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <ul className="grid gap-4 md:grid-cols-2">
                {leadershipModel.map((item) => (
                  <li key={item} className="leading-7 text-slate-700 dark:text-slate-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          <Section title="Credibility Signals">
            <div className="grid gap-4 md:grid-cols-2">
              {credibilitySignals.map((signal) => (
                <div
                  key={signal}
                  className="rounded-2xl border border-slate-200 bg-white p-5 leading-7 text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                >
                  {signal}
                </div>
              ))}
            </div>
          </Section>

          <section className="rounded-3xl bg-slate-950 p-8 text-white dark:bg-white dark:text-slate-950">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300 dark:text-blue-700">
              Recruiter and Hiring Manager CTA
            </p>
            <h2 className="mb-4 text-3xl font-bold">
              Need someone who can own a system like the ones above — from architecture to production?
            </h2>
            <p className="mb-6 max-w-3xl leading-7 text-slate-300 dark:text-slate-700">
              DentalPMS, the AI Job-Search Copilot, and One-Page Commerce are running in
              production right now, and the CWASA ecosystem supported 100k+ users under my
              leadership. If that&apos;s the kind of ownership your team needs, let&apos;s talk.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:i.am.shams@gmail.com"
                className="inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-slate-950 dark:text-white dark:hover:bg-blue-900"
              >
                Contact Khalid
              </a>
              <Link
                href="/cv"
                className="inline-flex rounded-xl border border-slate-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-blue-300 hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-400 dark:text-slate-950 dark:hover:border-blue-700 dark:hover:text-blue-700"
              >
                View CV
              </Link>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}
