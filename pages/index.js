import Layout from "../components/Layout";
import Section from "../components/Section";

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Section title="About Me">
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            I’ve loved coding from the moment I wrote my very first &quot;Hello
            World&quot; program in C. It gives me a sense of creativity and
            discovery—the thrill of building something new, solving problems,
            and bringing ideas to life. For me, software engineering is more
            than a career; it’s a dynamic field where imagination meets
            innovation. Here, I can explore cutting-edge technologies,
            experiment with endless possibilities, and grow in an ever-evolving
            landscape. That constant blend of learning, creativity, and
            technical challenge is why software engineering isn’t just my
            profession—it’s my passion.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Beyond my professional life, I cherish my roles as a devoted
            husband, a loving father, and a caring son. My family inspires me to
            grow not just as a technologist, but as a person who values
            connection, empathy, and balance in all aspects of life.
          </p>
        </Section>

        <Section title="Area of Strengths">
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            With a unique blend of technical expertise and collaborative spirit,
            I bring exceptional analytical capabilities to deconstruct complex
            challenges into actionable, data-driven solutions. My proficiency in
            modern web architectures enables me to design and implement scalable
            systems using cutting-edge technologies, while my strong
            communication skills allow me to bridge technical and business
            perspectives – whether articulating system designs to developers or
            explaining technical constraints to stakeholders. As an adaptable
            learner, I thrive in evolving tech landscapes, rapidly mastering any
            new frameworks. My experience collaborating with cross-functional
            teams across 15+ international projects has honed my ability to
            synergize diverse perspectives, driving innovation through cultural,
            educational, and professional diversity.
          </p>
        </Section>

        <Section title="Featured Projects">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            {/* <div className="text-xl font-semibold mb-2 text-gray-800 dark:text-white"> */}
            <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
              CWASA Digital Transformation Suite
            </h3>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              <span className="role">Project Lead</span>
            </h3>
            {/* </div> */}
            <div className="project-content">
              <div className="project-overview">
                <div className="box-border">
                  <ul className="solution-list">
                    <li>
                      <strong>Automated Billing System:</strong> Streamlined
                      billing/payment processing for 100k+ users with React
                      Web/Kotlin Android interfaces
                    </li>
                    <li>
                      <strong>NRW Tool:</strong> calculating water loss through
                      SCADA integration
                    </li>
                    <li>
                      <strong>Management Dashboard:</strong> Real-time
                      operational insights with predictive analytics
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
            {/* Project 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                ERP Solution
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Design & develop Inventory, Accounts, Payroll, HR web module
                which is used by Eastern Refinery LTD (a subsidiary of
                Bangladesh Petroleum Corporation).
              </p>
              {/* <a
                href="https://github.com/yourusername/ecommerce"
                className="text-blue-500 hover:underline"
                target="_blank"
              >
                View on GitHub →
              </a> */}
            </div>

            {/* Project 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                Portfolio Website
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This very site built with Next.js and Tailwind CSS.
              </p>
              <a
                href="https://github.com/i-am-shams/my-portfolio"
                className="text-blue-500 hover:underline"
                target="_blank"
              >
                View on GitHub →
              </a>
            </div>
          </div>
        </Section>
      </div>
    </Layout>
  );
}
