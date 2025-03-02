// pages/cv.js
import Layout from '../components/Layout';
import Section from '../components/Section';
import SkillCategory from '../components/SkillCategory';
import resumeData from '../data/resume.json';
import { BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { CubeIcon } from '@heroicons/react/24/outline';

export default function CV() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Personal Info Header */}
        <div className="text-center mb-12">
          <img
            src={resumeData.personalInfo.photo}
            alt={resumeData.personalInfo.name}
            className="h-32 rounded-full mx-auto mb-6"
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
            <div key={index} className="mb-8">
              <div className="flex items-start space-x-4">
                <BriefcaseIcon className="h-6 w-6 text-blue-500 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {exp.position}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {exp.company} • {exp.duration}
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    {exp.responsibilities.map((resp, i) => (
                      <li 
                        key={i}
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
          {resumeData.technicalSkills.map((skillGroup, index) => (
            <SkillCategory
              key={index}
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
              <p>{edu.year}</p>
            </div>
          </div>
        ))}
      </Section>

      <Section title="Certifications">
        {resumeData.certifications.map((certifications) => (
          <div key={certifications.name} className="flex items-start space-x-4">
            <CubeIcon className="h-6 w-6 text-blue-500 mt-1" />
            <div>
              <h3 className="text-xl font-semibold">{certifications.name}</h3>
              <p>{certifications.issuer}</p>
              <p>{certifications.validity}</p>
            </div>
          </div>
        ))}
      </Section>

      {/* Rest of your content */}
    </div>
    </Layout>
    
    

  );
}