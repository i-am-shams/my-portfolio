// pages/cv.js
import Head from 'next/head';
import Layout from '../components/Layout';
import Section from '../components/Section';
import SkillCategory from '../components/SkillCategory';
import Image from 'next/image';
import resumeData from '../data/resume.json';
import { BriefcaseIcon, AcademicCapIcon, CubeIcon } from '@heroicons/react/24/outline';

export default function CV() {
  return (
    <>
      <Head>
        <title>{`CV | ${resumeData.personalInfo.name}`}</title>
        <meta
          name="description"
          content={`${resumeData.personalInfo.name} - ${resumeData.personalInfo.title}. Experience, technical skills, education, and certifications.`}
        />
        <meta property="og:title" content={`CV | ${resumeData.personalInfo.name}`} />
        <meta
          property="og:description"
          content={`${resumeData.personalInfo.name} - ${resumeData.personalInfo.title}. Experience, technical skills, education, and certifications.`}
        />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content={resumeData.personalInfo.photo} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`CV | ${resumeData.personalInfo.name}`} />
        <meta
          name="twitter:description"
          content={`${resumeData.personalInfo.name} - ${resumeData.personalInfo.title}. Experience, technical skills, education, and certifications.`}
        />
        <meta name="twitter:image" content={resumeData.personalInfo.photo} />
      </Head>
      <Layout>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Personal Info Header */}
          <div className="text-center mb-12">
            <Image
              src={resumeData.personalInfo.photo}
              alt={resumeData.personalInfo.name}
              width={128}
              height={128}
              className="h-32 w-32 rounded-full object-cover mx-auto mb-6"
            />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
              {resumeData.personalInfo.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {resumeData.personalInfo.title}
            </p>
            <div className="mt-4 space-x-4">
              <a href={`mailto:${resumeData.personalInfo.email}`} className="text-blue-500">
                {resumeData.personalInfo.email}
              </a>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 dark:text-gray-400">
                {resumeData.personalInfo.phone}
              </span>
            </div>
          </div>

          {/* Experience Section */}
          <Section title="Professional Experience">
            {resumeData.experience.map((exp, index) => (
              <div key={`${exp.position}-${exp.company}-${exp.duration}`} className="mb-8">
                <div className="flex items-start space-x-4">
                  <BriefcaseIcon className="h-6 w-6 text-blue-500 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {exp.position}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {exp.companyUrl ? (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {exp.company}
                        </a>
                      ) : (
                        <span>{exp.company}</span>
                      )}{' '}
                      • {exp.duration}
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      {exp.responsibilities.map((resp) => (
                        <li
                          key={`${exp.position}-${exp.company}-${resp}`}
                          className="text-gray-600 dark:text-gray-400 leading-relaxed"
                        >
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {index !== resumeData.experience.length - 1 && (
                  <div className="mt-6 border-b dark:border-gray-700"></div>
                )}
              </div>
            ))}
          </Section>
        </div>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Other sections */}

          <Section title="Technical Proficiency">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            {resumeData.education.map((edu) => (
              <div key={edu.degree} className="flex items-start space-x-4">
                <AcademicCapIcon className="h-6 w-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">{edu.degree}</h3>
                  <p>{edu.institution}</p>
                  {edu.year ? <p>{edu.year}</p> : null}
                </div>
              </div>
            ))}
          </Section>

          <Section title="Certifications">
            {resumeData.certifications.map((certification) => (
              <div key={certification.name} className="flex items-start space-x-4">
                <CubeIcon className="h-6 w-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">{certification.name}</h3>
                  <p>{certification.issuer}</p>
                  <p>{certification.validity}</p>
                </div>
              </div>
            ))}
          </Section>

          {/* Rest of your content */}
        </div>
      </Layout>
    </>
  );
}
