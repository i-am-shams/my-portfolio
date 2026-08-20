/**
 * Generates the ATS artifacts from data/resume.json so they cannot drift from the
 * rendered CV:
 *   public/resume.txt   - plain text for recruiters pasting into an ATS
 *   data/build-date.json - the deploy date, rendered in the footer
 *
 * Runs from `prebuild`, so `next build` always sees fresh output.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const resume = JSON.parse(readFileSync(join(root, "data/resume.json"), "utf8"));

const CAREER_START = new Date(2010, 3, 1);
const now = new Date();
let years = now.getFullYear() - CAREER_START.getFullYear();
if (
  now.getMonth() < CAREER_START.getMonth() ||
  (now.getMonth() === CAREER_START.getMonth() && now.getDate() < CAREER_START.getDate())
) {
  years -= 1;
}

const lines = [];
const rule = () => lines.push("", "-".repeat(72), "");

lines.push(resume.personalInfo.name.toUpperCase());
lines.push(resume.personalInfo.title);
lines.push(`${resume.personalInfo.email} | ${resume.personalInfo.phone}`);
lines.push("Dhaka, Bangladesh (UTC+6) - open to remote roles worldwide, or on-site in Dhaka");
lines.push("https://khalid-shams.vercel.app | https://github.com/i-am-shams");

rule();
lines.push("SUMMARY");
lines.push("");
lines.push(resume.careerObjective.replaceAll("{{YEARS}}", String(years)));

rule();
lines.push("EXPERIENCE");
for (const role of resume.experience) {
  lines.push("");
  lines.push(`${role.position} | ${role.company} | ${role.duration}`);
  for (const item of role.responsibilities) lines.push(`  - ${item}`);
}

rule();
lines.push("TECHNICAL SKILLS");
lines.push("");
for (const skill of resume.technicalSkills) {
  lines.push(`${skill.category}: ${skill.items.join(", ")}`);
}

rule();
lines.push("EDUCATION");
for (const entry of resume.education) {
  lines.push("");
  lines.push(`${entry.degree} | ${entry.institution} | ${entry.year}`);
}

rule();
lines.push("CERTIFICATIONS");
for (const cert of resume.certifications) {
  lines.push(`${cert.name} - ${cert.issuer} (${cert.validity})`);
}

mkdirSync(join(root, "public"), { recursive: true });
writeFileSync(join(root, "public/resume.txt"), lines.join("\n") + "\n", "utf8");
writeFileSync(
  join(root, "data/build-date.json"),
  JSON.stringify({ date: now.toISOString().slice(0, 10) }, null, 2) + "\n",
  "utf8"
);

console.log(`resume.txt written (${lines.length} lines), build date ${now.toISOString().slice(0, 10)}`);
