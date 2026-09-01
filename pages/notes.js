import Head from "next/head";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import Layout from "../components/Layout";
import KbEntry from "../components/KbEntry";
import { kbEntries } from "../data/kb";
import { absoluteUrl, siteProfile } from "../data/profile";

const description =
  "Technical findings from building a coupon service on .NET 8, Azure API Management, and Azure DevOps: pipeline async traps, EF Core in-memory limitations, Azure SQL managed identity SIDs, APIM tier architecture, and testing blind spots.";

export default function Notes() {
  return (
    <>
      <Head>
        <title>{`Engineering Notes — ${siteProfile.name}`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={absoluteUrl("/notes")} />
        <meta property="og:title" content={`Engineering Notes — ${siteProfile.name}`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={absoluteUrl("/notes")} />
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: `Engineering Notes — ${siteProfile.name}`,
              description,
              url: absoluteUrl("/notes"),
              author: {
                "@type": "Person",
                name: siteProfile.name,
                url: absoluteUrl("/"),
              },
            },
          ]}
        />
      </Head>
      <Layout>
        <main
          id="main-content"
          className="container mx-auto max-w-4xl px-4 py-12"
        >
          <div className="mb-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
              Engineering Notes
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
              Findings worth knowing
            </h1>
            <p className="max-w-2xl leading-7 text-slate-600 dark:text-slate-300">
              These are technical findings from building a coupon service — .NET
              8, Azure API Management, Bicep, Azure DevOps. The project is the
              source; the entries are the lessons. The service is not in
              production and is not listed in the{" "}
              <Link
                href="/#engineering"
                className="underline underline-offset-2 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:text-blue-300"
              >
                Engineering Deep Dive
              </Link>
              .
            </p>
          </div>
          <div className="space-y-6">
            {kbEntries.map((entry) => (
              <KbEntry key={entry.slug} entry={entry} />
            ))}
          </div>
        </main>
      </Layout>
    </>
  );
}
