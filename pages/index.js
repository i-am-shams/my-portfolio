import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import Section from "../components/Section";

const highlights = [
  "Currently working as a Solution Delivery Specialist at Today's Tech.",
  "14+ years of experience delivering enterprise software solutions across domains.",
  "Strong ownership from requirements to delivery, quality, and stakeholder communication.",
  "Hands-on background in architecture, full-stack development, and team leadership.",
];

const strengths = [
  "Solution delivery and release planning",
  "Cross-functional team leadership",
  "Technical architecture and system design",
  "Stakeholder communication and expectation management",
  "Scalable web platform implementation",
  "Rapid adaptation to new tools and frameworks",
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Khalid Shams | Solution Delivery Specialist</title>
        <meta
          name="description"
          content="Portfolio of Khalid Shams, Solution Delivery Specialist. Explore experience, strengths, and featured software projects."
        />
        <meta property="og:title" content="Khalid Shams | Solution Delivery Specialist" />
        <meta
          property="og:description"
          content="Portfolio of Khalid Shams, Solution Delivery Specialist. Explore experience, strengths, and featured software projects."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/avatar.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Khalid Shams | Solution Delivery Specialist" />
        <meta
          name="twitter:description"
          content="Portfolio of Khalid Shams, Solution Delivery Specialist. Explore experience, strengths, and featured software projects."
        />
        <meta name="twitter:image" content="/avatar.png" />
      </Head>
      <Layout>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-12">
            <p className="text-sm uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-2">
              Solution Delivery Specialist
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Khalid Shams
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              I design and deliver software solutions that align technology with business goals.
              My focus is predictable delivery, clear communication, and scalable architecture.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/cv"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Download CV
              </Link>
              <a
                href="mailto:i.am.shams@gmail.com"
                className="inline-flex items-center px-4 py-2 rounded-lg border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              >
                Contact
              </a>
              <a
                href="#featured-projects"
                className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                View Projects
              </a>
            </div>
          </section>

          <Section title="About Me">
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              I&apos;ve loved coding from the moment I wrote my very first
              &quot;Hello World&quot; program in C. It gives me a sense of creativity and
              discovery, the thrill of building something new, solving problems, and
              bringing ideas to life. For me, software engineering is more than a
              career; it&apos;s a dynamic field where imagination meets innovation.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Beyond my professional life, I cherish my roles as a devoted husband,
              a loving father, and a caring son. My family inspires me to grow not
              just as a technologist, but as a person who values connection, empathy,
              and balance in all aspects of life.
            </p>
          </Section>

          <Section title="Professional Snapshot">
            <ul className="list-disc list-inside space-y-3">
              {highlights.map((highlight) => (
                <li key={highlight} className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {highlight}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Core Strengths">
            <ul className="list-disc list-inside space-y-3">
              {strengths.map((strength) => (
                <li key={strength} className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {strength}
                </li>
              ))}
            </ul>
          </Section>

          <div id="featured-projects">
            <Section title="Featured Projects">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
                  CWASA Digital Transformation Suite
                </h3>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  <span className="role">Project Lead</span>
                </h3>
                <div className="project-content">
                  <div className="project-overview">
                    <div className="box-border">
                      <ul className="solution-list">
                        <li>
                          <strong>Automated Billing System:</strong> Billing and payment flows for
                          100k+ users with React web and Kotlin Android interfaces.
                        </li>
                        <li>
                          <strong>NRW Tool:</strong> Water-loss analysis through SCADA integration.
                        </li>
                        <li>
                          <strong>Management Dashboard:</strong> Operational visibility with
                          predictive analytics.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="tech-stack">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                      Technical Architecture:
                    </h3>
                    <div className="tech-tags">
                      <span className="tag">ASP.NET Core</span>
                      <span className="tag">Microservices</span>
                      <span className="tag">Azure/AWS</span>
                      <span className="tag">Ocelot API Gateway</span>
                      <span className="tag">React + Kotlin</span>
                      <span className="tag">SCADA (IoT)</span>
                    </div>
                  </div>

                  <div className="key-achievements">
                    <h3>Key Results:</h3>
                    <ul className="achievement-list">
                      <li>Architected system handling 1M+ monthly transactions</li>
                      <li>65% reduction in manual reporting time</li>
                      <li>Led 30+ member cross-functional team</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                    ERP Solution
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Designed and developed inventory, accounts, payroll, and HR modules for
                    Eastern Refinery LTD, a Bangladesh Petroleum Corporation subsidiary.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                    Portfolio Website
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Personal portfolio built with Next.js and Tailwind CSS.
                  </p>
                  <a
                    href="https://github.com/i-am-shams/my-portfolio"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub →
                  </a>
                </div>
              </div>
            </Section>
          </div>
        </div>
      </Layout>
    </>
  );
}
