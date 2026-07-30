import Head from "next/head";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import Layout from "../components/Layout";
import Section from "../components/Section";
import { absoluteUrl, personJsonLd, siteProfile, websiteJsonLd } from "../data/profile";

const proofMetrics = [
  { value: "14+", label: "Years in enterprise software" },
  { value: "30+", label: "Engineers and QA led" },
  { value: "100k+", label: "Utility users supported" },
  { value: "1M+", label: "Monthly transactions architected" },
  { value: "65%", label: "Reduction in manual reporting time" },
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
      "Improved process consistency, reduced manual handling, and strengthened administrative visibility across business functions.",
    technologies: [".NET", "ASP.NET", "SQL Server", "ERP Modules", "Reporting"],
  },
  {
    title: "Financial Analytics Systems",
    domain: "Financial and compliance technology",
    summary:
      "Developed financial analytics tools involving real-time data processing, market trend analysis, and decision-support workflows.",
    impact:
      "Helped users work with faster financial signals, structured analytics, and clearer market insight.",
    technologies: [".NET", "Real-Time Data", "Analytics", "Predictive Logic"],
  },
  {
    title: "OCR and Intelligent Data Capture",
    domain: "Document automation",
    summary:
      "Implemented OCR and image-processing solutions using Tesseract to extract structured data from scanned documents and image inputs.",
    impact:
      "Reduced manual document-processing friction and supported more efficient digitization workflows.",
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
  "Certified ScrumMaster with delivery governance and release-readiness experience.",
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
                I build business-critical enterprise systems, reporting platforms, and
                operational dashboards.
              </h1>
              <p className="mb-7 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                I&apos;m Khalid Shams, a 14+ year software engineering leader
                specializing in .NET, cloud-enabled architecture, data-driven
                applications, ERP systems, SCADA-integrated platforms, and executive
                reporting solutions for enterprise and public-service operations.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#case-study"
                  className="inline-flex items-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
                >
                  View Enterprise Case Study
                </a>
                <a
                  href={siteProfile.resume}
                  download
                  className="inline-flex items-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-600 dark:text-slate-100 dark:hover:border-blue-300 dark:hover:text-blue-200"
                >
                  Download Resume
                </a>
                <Link
                  href="/cv"
                  className="inline-flex items-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-600 dark:text-slate-100 dark:hover:border-blue-300 dark:hover:text-blue-200"
                >
                  View CV
                </Link>
                <a
                  href="mailto:i.am.shams@gmail.com"
                  className="inline-flex items-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-600 dark:text-slate-100 dark:hover:border-blue-300 dark:hover:text-blue-200"
                >
                  Contact Khalid
                </a>
              </div>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Enterprise Systems Profile
              </p>
              <ul className="space-y-4 text-sm leading-6 text-slate-700 dark:text-slate-200">
                <li>Utility billing, ERP, financial, OCR, and reporting platforms.</li>
                <li>REST APIs, microservices, SQL Server, Azure/AWS, React, Angular.</li>
                <li>SCADA/GIS integration and operational monitoring dashboards.</li>
                <li>Delivery governance across engineering, QA, and business stakeholders.</li>
              </ul>
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
              Need someone who can own enterprise systems from architecture to production?
            </h2>
            <p className="mb-6 max-w-3xl leading-7 text-slate-300 dark:text-slate-700">
              I bring hands-on engineering depth, reporting and data-systems experience,
              delivery leadership, and the stakeholder discipline required for
              business-critical platforms.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:i.am.shams@gmail.com"
                className="inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-slate-950 dark:text-white dark:hover:bg-blue-900"
              >
                Contact Khalid
              </a>
              <a
                href={siteProfile.resume}
                download
                className="inline-flex rounded-xl border border-slate-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-blue-300 hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-400 dark:text-slate-950 dark:hover:border-blue-700 dark:hover:text-blue-700"
              >
                Download Resume
              </a>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}
