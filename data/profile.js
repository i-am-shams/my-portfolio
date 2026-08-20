// Career started April 2010 (CACTS LTD, per data/resume.json). Computed at
// build time rather than hardcoded, so "X+ years" never goes stale on its own.
const CAREER_START = new Date(2010, 3, 1);

export function yearsOfExperience() {
  const now = new Date();
  let years = now.getFullYear() - CAREER_START.getFullYear();
  const hadAnniversaryThisYear =
    now.getMonth() > CAREER_START.getMonth() ||
    (now.getMonth() === CAREER_START.getMonth() && now.getDate() >= CAREER_START.getDate());
  if (!hadAnniversaryThisYear) years -= 1;
  return years;
}

export const siteProfile = {
  name: "Khalid Shams",
  uppercaseName: "KHALID SHAMS",
  title: "Enterprise Software Engineering Leader",
  siteUrl: "https://khalid-shams.vercel.app",
  email: "i.am.shams@gmail.com",
  phone: "01674592829",
  image: "/avatar.png",
  resume: "/Khalid_Shams_Resume.pdf",
  github: "https://github.com/i-am-shams",
  // LinkedIn profile URL. Renders in header and footer once set to a URL string; intentionally null until supplied.
  linkedin: null,
  location: "Dhaka, Bangladesh",
  // Answers the recruiter's first question - "can I actually hire this person?" -
  // before they have to ask it. Rendered in the hero panel.
  availability: {
    status: "Remote roles worldwide",
    base: "Dhaka, Bangladesh (UTC+6)",
    overlap: "Full European hours · US East Coast mornings",
    notice: "One month",
  },
  // Held 2023-2025, not currently renewed. Stated with its dates rather than in the
  // present tense - a lapsed credential asserted as current undermines every other
  // claim on a site whose whole argument is that its claims are checkable.
  certification: "Certified ScrumMaster (2023-2025)",
  summary:
    `Senior enterprise software engineer and solution architect with ${yearsOfExperience()}+ years of experience in .NET, reporting platforms, analytics dashboards, ERP systems, cloud-enabled architecture, SCADA/GIS integration, and technical delivery leadership.`,
  roleTargets: [
    "Senior Software Engineer",
    "Technical Lead",
    "Engineering Manager",
    "Solution Architect",
    "Enterprise Application Specialist",
    "Reporting Systems Engineer",
  ],
  keywords: [
    "Enterprise Software Engineer",
    "Senior Software Engineer",
    "Technical Lead",
    "Solution Architect",
    ".NET",
    "ASP.NET Core",
    "React",
    "Angular",
    "SQL Server",
    "REST APIs",
    "Microservices",
    "Azure",
    "AWS",
    "ERP",
    "Reporting Systems",
    "Analytics Dashboards",
    "Operational Dashboards",
    "SCADA Integration",
    "GIS Integration",
    "Digital Transformation",
  ],
};

export function absoluteUrl(path = "/") {
  return `${siteProfile.siteUrl}${path}`;
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteProfile.name,
    jobTitle: siteProfile.title,
    url: siteProfile.siteUrl,
    image: absoluteUrl(siteProfile.image),
    email: `mailto:${siteProfile.email}`,
    telephone: siteProfile.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    sameAs: [siteProfile.github, siteProfile.linkedin].filter(Boolean),
    knowsAbout: siteProfile.keywords,
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "professional certification",
      name: siteProfile.certification,
    },
    subjectOf: {
      "@type": "DigitalDocument",
      name: `${siteProfile.name} Resume`,
      url: absoluteUrl(siteProfile.resume),
      encodingFormat: "application/pdf",
    },
    description: siteProfile.summary,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteProfile.name} Portfolio`,
    url: siteProfile.siteUrl,
    description: siteProfile.summary,
    inLanguage: "en",
    publisher: {
      "@type": "Person",
      name: siteProfile.name,
    },
  };
}

export function profilePageJsonLd(path, description = siteProfile.summary) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl(path),
    name: `${siteProfile.name} - ${siteProfile.title}`,
    description,
    about: personJsonLd(),
  };
}
