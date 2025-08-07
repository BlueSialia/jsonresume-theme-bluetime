import { JSONResumeSchema } from "./types";

/**
 * Escapes HTML special characters for security
 * @param text - The text to escape
 * @returns Escaped HTML string
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Safely renders text content, escaping HTML when needed
 * @param text - The text to render safely
 * @returns Escaped text or empty string if undefined
 */
function safeText(text?: string): string {
  return text ? escapeHtml(text) : "";
}

/**
 * Creates an HTML element with given tag, class, text content, and attributes.
 *
 * @param tagName - The name of the HTML tag.
 * @param className - The class name for the element.
 * @param textContent - The text content for the element.
 * @param attributes - Additional attributes for the element.
 * @returns The generated HTML string.
 */
function createElement(
  tagName: string,
  className: string = "",
  textContent: string = "",
  attributes: Record<string, string> = {},
): string {
  let element = `<${tagName}`;
  if (className) element += ` class="${escapeHtml(className)}"`;
  for (const [key, value] of Object.entries(attributes)) {
    element += ` ${escapeHtml(key)}="${escapeHtml(value)}"`;
  }
  element += `>${textContent}</${tagName}>`;
  return element;
}

/**
 * Creates a section with a title and data content.
 *
 * @param title - The title of the section.
 * @returns The generated HTML string for the section.
 */
function createSection(title?: string): string {
  let sectionDiv = `<div class="section">`;
  if (title) {
    sectionDiv += createElement("h2", "", safeText(title));
  }
  return sectionDiv;
}

/**
 * Adds contact information to an HTML string.
 *
 * @param email - The email address.
 * @param phone - The phone number.
 * @param url - The URL.
 * @param profiles - An array of profile objects.
 * @returns The generated HTML string for the contact information.
 */
function addContactInfo(
  email?: string,
  phone?: string,
  url?: string,
  profiles: Array<{ network?: string; url?: string }> = [],
): string {
  let contactInfo = `<div class="contact-info">`;
  if (email) {
    contactInfo += createElement(
      "span",
      "contact-item",
      `<i class="fas fa-envelope"></i> ${createElement("a", "", safeText(email), { href: "mailto:" + email })}`,
    );
  }
  if (phone) {
    contactInfo += createElement(
      "span",
      "contact-item",
      `<i class="fas fa-phone"></i> ${createElement("a", "", safeText(phone), { href: "tel:" + phone })}`,
    );
  }
  if (url) {
    contactInfo += createElement(
      "span",
      "contact-item",
      `<i class="fas fa-globe"></i> ${createElement("a", "", safeText(url.replace(/^https?:\/\//i, "")), { href: url })}`,
    );
  }
  for (const profile of profiles) {
    if (profile.network && profile.url) {
      contactInfo += createElement(
        "span",
        "contact-item",
        `<i class="fa-brands fa-${escapeHtml(profile.network.toLowerCase())}"></i> ${createElement("a", "", safeText(profile.url.replace(/^https?:\/\//i, "")), { href: profile.url })}`,
      );
    }
  }
  contactInfo += `</div>`;
  return contactInfo;
}

/**
 * Adds location information to an HTML string.
 *
 * @param location - An object containing location details (address, city, region, postalCode, countryCode).
 * @returns The generated HTML string for the location information.
 */
function addLocation(location: {
  address?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  countryCode?: string;
}): string {
  let locationLine = `<div class="location">`;
  const locationParts: string[] = [];
  if (location.address) locationParts.push(safeText(location.address));
  if (location.city) locationParts.push(safeText(location.city));
  if (location.region) locationParts.push(safeText(location.region));
  if (location.postalCode) locationParts.push(safeText(location.postalCode));
  if (location.countryCode) locationParts.push(safeText(location.countryCode));
  locationLine += locationParts.join(", ");
  locationLine += `</div>`;
  return locationLine;
}

/**
 * Adds chips (keyword tags) to an HTML string.
 *
 * @param keywords - An array of keywords.
 * @returns The generated HTML string for the chips.
 */
function addChips(keywords: string[]): string {
  let keywordChips = `<div class="chips">`;
  for (const keyword of keywords) {
    keywordChips += createElement("span", "chip", safeText(keyword));
  }
  keywordChips += `</div>`;
  return keywordChips;
}

/**
 * Adds highlights to an HTML string.
 *
 * @param highlights - An array of highlight descriptions.
 * @returns The generated HTML string for the highlights.
 */
function addHighlights(highlights?: string[]): string {
  if (!highlights || !highlights.length) return ``;
  let highlightList = `<ul class="highlights">`;
  for (const highlight of highlights) {
    highlightList += createElement("li", "", safeText(highlight));
  }
  highlightList += `</ul>`;
  return highlightList;
}

/**
 * Creates a section and its content for Basics based on the given data.
 *
 * @param basics - An object containing basic information (name, label, image, email, phone, url, location, summary).
 * @returns The generated HTML string for the Basics section.
 */
function createBasicsSection(basics: JSONResumeSchema["basics"]): string {
  if (!basics) return "";

  const {
    name,
    label,
    image,
    email,
    phone,
    url,
    location = {},
    profiles = [],
    summary,
  } = basics;

  let basicsSection = createSection();
  if (image) {
    basicsSection += createElement("img", "", "", {
      class: "profile-picture",
      src: image,
      alt: "Profile Picture",
    });
  }
  if (name) {
    basicsSection += createElement("h1", "resume-name", safeText(name));
  }
  if (label) {
    basicsSection += createElement("h2", "job-title", safeText(label));
  }
  basicsSection += addLocation(location);
  basicsSection += addContactInfo(email, phone, url, profiles);
  if (summary) {
    basicsSection += createElement("p", "", safeText(summary));
  }
  basicsSection += `</div>`;
  return basicsSection;
}

/**
 * Creates a section and its content for Languages based on the given data.
 *
 * @param languages - An array of language objects (language, fluency).
 * @returns The generated HTML string for the Languages section.
 */
function createLanguagesSection(
  languages: JSONResumeSchema["languages"],
): string {
  if (!languages || languages.length === 0) return "";

  let languagesSection = createSection("Languages");

  for (const language of languages) {
    const { language: lang, fluency } = language;
    let languageItem = `<div class="section-item">`;

    if (lang) {
      languageItem += createElement("h3", "", safeText(lang));
    }
    if (fluency) {
      languageItem += createElement("h4", "subtitle", safeText(fluency));
    }

    languageItem += `</div>`;
    languagesSection += languageItem;
  }

  languagesSection += `</div>`;
  return languagesSection;
}

/**
 * Creates a section and its content for Skills based on the given data.
 *
 * @param skills - An array of skill objects (name, level, keywords).
 * @returns The generated HTML string for the Skills section.
 */
function createSkillsSection(skills: JSONResumeSchema["skills"]): string {
  if (!skills || skills.length === 0) return "";

  let skillsSection = createSection("Skills");

  for (const skill of skills) {
    const { name, level, keywords } = skill;
    let skillItem = `<div class="section-item">`;

    if (name) {
      skillItem += createElement("h3", "", safeText(name));
    }
    if (level) {
      skillItem += createElement("h4", "subtitle", safeText(level));
    }
    if (keywords && keywords.length > 0) {
      skillItem += addChips(keywords);
    }
    skillItem += `</div>`;
    skillsSection += skillItem;
  }

  skillsSection += `</div>`;
  return skillsSection;
}

/**
 * Creates a section and its content for Interests based on the given data.
 *
 * @param interests - An array of interest objects (name, keywords).
 * @returns The generated HTML string for the Interests section.
 */
function createInterestsSection(
  interests: JSONResumeSchema["interests"],
): string {
  if (!interests || interests.length === 0) return "";

  let interestsSection = createSection("Interests");

  for (const interest of interests) {
    const { name, keywords } = interest;
    let interestItem = `<div class="section-item">`;

    if (name) {
      interestItem += createElement("h3", "", safeText(name));
    }
    if (keywords && keywords.length > 0) {
      interestItem += addChips(keywords);
    }
    interestItem += `</div>`;
    interestsSection += interestItem;
  }

  interestsSection += `</div>`;
  return interestsSection;
}

/**
 * Creates a section and its content for References based on the given data.
 *
 * @param references - An array of reference objects (name, reference).
 * @returns The generated HTML string for the References section.
 */
function createReferencesSection(
  references: JSONResumeSchema["references"],
): string {
  if (!references || references.length === 0) return "";

  let referencesSection = `<div class="section references">`;
  referencesSection += createElement("h2", "", "References");

  for (const ref of references) {
    const { name, reference } = ref;
    let referenceItem = `<div class="section-item">`;

    if (name) {
      referenceItem += createElement("h3", "", safeText(name));
    }

    if (reference) {
      try {
        new URL(reference); // Check if reference is a valid URL
        referenceItem += createElement(
          "a",
          "reference-link",
          safeText(reference.replace(/^https?:\/\//i, "")),
          { href: reference },
        );
      } catch (e) {
        referenceItem += createElement("p", "", safeText(reference));
      }
    }

    referenceItem += `</div>`;
    referencesSection += referenceItem;
  }

  referencesSection += `</div>`;
  return referencesSection;
}

/**
 * Creates a section and its content for Experience based on the given data.
 *
 * @param experiences - An array of work objects (name, description, location, url, position, summary, highlights, startDate, endDate).
 * @returns The generated HTML string for the Experience section.
 */
function createExperienceSection(
  experiences: JSONResumeSchema["work"],
): string {
  if (!experiences || experiences.length === 0) return "";

  let experienceSection = createSection("Experience");

  for (const experience of experiences) {
    const {
      name,
      description,
      location,
      url,
      position,
      summary,
      highlights,
      startDate,
      endDate,
    } = experience;

    let experienceItem = `<div class="timeline-section-item">`;

    if (startDate || endDate) {
      let timeline = `<div class="timeline">`;
      if (endDate) {
        timeline += createElement("span", "date", safeText(endDate));
      } else {
        timeline += createElement("span", "date", "Present");
      }
      if (startDate) {
        timeline += ` <br> `;
        timeline += createElement("span", "date", safeText(startDate));
      }
      timeline += `</div>`;
      experienceItem += timeline;
    }

    experienceItem += `<div class="timeline-section-details">`;

    if (name) {
      experienceItem += createElement("h3", "", safeText(name));
    }
    if (description) {
      experienceItem += createElement(
        "span",
        "description",
        safeText(description),
      );
    }
    if (location || url) {
      let locationUrl = `<div class="title-anex">`;
      if (location) {
        locationUrl += createElement("span", "", safeText(location));
      }
      if (url) {
        locationUrl += ` &bull; `;
        locationUrl += createElement(
          "a",
          "url",
          safeText(url.replace(/^https?:\/\//i, "")),
          { href: url },
        );
      }
      locationUrl += `</div>`;
      experienceItem += locationUrl;
    }

    if (position) {
      experienceItem += createElement("h4", "subtitle", safeText(position));
    }
    if (summary) {
      experienceItem += createElement("p", "", safeText(summary));
    }
    if (highlights && highlights.length > 0) {
      experienceItem += addHighlights(highlights);
    }

    experienceItem += `</div>`;
    experienceItem += `</div>`;
    experienceSection += experienceItem;
  }

  experienceSection += `</div>`;
  return experienceSection;
}

/**
 * Creates a section and its content for Projects based on the given data.
 *
 * @param projects - An array of project objects (name, url, description, highlights, keywords, startDate, endDate).
 * @returns The generated HTML string for the Projects section.
 */
function createProjectsSection(projects: JSONResumeSchema["projects"]): string {
  if (!projects || projects.length === 0) return "";

  let projectsSection = `<div class="section">`;
  projectsSection += createElement("h2", "", "Projects");

  for (const project of projects) {
    const { name, url, description, highlights, keywords, startDate, endDate } =
      project;
    let projectItem = `<div class="timeline-section-item">`;

    if (startDate || endDate) {
      let timeline = `<div class="timeline">`;
      if (endDate) {
        timeline += createElement("span", "date", safeText(endDate));
      } else {
        timeline += createElement("span", "date", "Present");
      }
      if (startDate) {
        timeline += ` <br> `;
        timeline += createElement("span", "date", safeText(startDate));
      }
      timeline += `</div>`;
      projectItem += timeline;
    }

    projectItem += `<div class="timeline-section-details">`;

    if (name) {
      projectItem += createElement("h3", "", safeText(name));
    }
    if (url) {
      projectItem += ` &bull; `;
      projectItem += createElement(
        "a",
        "description",
        safeText(url.replace(/^https?:\/\//i, "")),
        {
          href: url,
        },
      );
    }

    if (description) {
      projectItem += createElement("p", "", safeText(description));
    }

    if (highlights && highlights.length > 0) {
      let highlightList = `<ul class="highlights">`;
      for (const highlight of highlights) {
        highlightList += createElement("li", "", safeText(highlight));
      }
      highlightList += `</ul>`;
      projectItem += highlightList;
    }

    if (keywords && keywords.length > 0) {
      projectItem += addChips(keywords);
    }

    projectItem += `</div>`;
    projectItem += `</div>`;
    projectsSection += projectItem;
  }

  projectsSection += `</div>`;
  return projectsSection;
}

/**
 * Creates a section and its content for Volunteer based on the given data.
 *
 * @param volunteer - An array of volunteer objects (organization, url, position, summary, highlights, startDate, endDate).
 * @returns The generated HTML string for the Volunteer section.
 */
function createVolunteerSection(
  volunteer: JSONResumeSchema["volunteer"],
): string {
  if (!volunteer || volunteer.length === 0) return "";

  let volunteerSection = createSection("Volunteer");

  for (const vol of volunteer) {
    const {
      organization,
      url,
      position,
      summary,
      highlights,
      startDate,
      endDate,
    } = vol;

    let volItem = `<div class="timeline-section-item">`;

    if (startDate || endDate) {
      let timeline = `<div class="timeline">`;
      if (endDate) {
        timeline += createElement("span", "date", safeText(endDate));
      } else {
        timeline += createElement("span", "date", "Present");
      }
      if (startDate) {
        timeline += ` <br> `;
        timeline += createElement("span", "date", safeText(startDate));
      }
      timeline += `</div>`;
      volItem += timeline;
    }

    volItem += `<div class="timeline-section-details">`;

    if (organization) {
      volItem += createElement("h3", "", safeText(organization));
    }
    if (url) {
      volItem += createElement(
        "a",
        "description",
        safeText(url.replace(/^https?:\/\//i, "")),
        { href: url },
      );
    }

    if (position) {
      volItem += createElement("div", "title-anex", safeText(position));
    }
    if (summary) {
      volItem += createElement("p", "", safeText(summary));
    }
    if (highlights && highlights.length > 0) {
      volItem += addHighlights(highlights);
    }

    volItem += `</div>`;
    volItem += `</div>`;
    volunteerSection += volItem;
  }

  volunteerSection += `</div>`;
  return volunteerSection;
}

/**
 * Creates a section and its content for Education based on the given data.
 *
 * @param education - An array of education objects (institution, url, area, studyType, courses, startDate, endDate).
 * @returns The generated HTML string for the Education section.
 */
function createEducationSection(
  education: JSONResumeSchema["education"],
): string {
  if (!education || education.length === 0) return "";

  let educationSection = createSection("Education");

  for (const edu of education) {
    const { institution, url, area, studyType, courses, startDate, endDate } =
      edu;

    let eduItem = `<div class="timeline-section-item">`;

    if (startDate || endDate) {
      let timeline = `<div class="timeline">`;
      if (endDate) {
        timeline += createElement("span", "date", safeText(endDate));
      } else {
        timeline += createElement("span", "date", "Present");
      }
      if (startDate) {
        timeline += ` <br> `;
        timeline += createElement("span", "date", safeText(startDate));
      }
      timeline += `</div>`;
      eduItem += timeline;
    }

    eduItem += `<div class="timeline-section-details">`;

    if (institution) {
      eduItem += createElement("h3", "", safeText(institution));
    }
    if (url) {
      eduItem += createElement(
        "a",
        "description",
        safeText(url.replace(/^https?:\/\//i, "")),
        { href: url },
      );
    }

    if (area || studyType) {
      let areaStudy = `<div class="title-anex">`;
      if (area) {
        areaStudy += createElement("span", "", safeText(area));
      }
      if (studyType) {
        areaStudy += createElement("span", "description", safeText(studyType));
      }
      areaStudy += `</div>`;
      eduItem += areaStudy;
    }

    if (courses && courses.length > 0) {
      let courseList = `<ul class="courses">`;
      for (const course of courses) {
        courseList += createElement("li", "", safeText(course));
      }
      courseList += `</ul>`;
      eduItem += courseList;
    }

    eduItem += `</div>`;
    eduItem += `</div>`;
    educationSection += eduItem;
  }

  educationSection += `</div>`;
  return educationSection;
}

/**
 * Renders the JSON resume data into an HTML string with defined styles and sections.
 *
 * @param data - The JSON resume data.
 * @returns The generated HTML string representing the rendered resume.
 */
export function render(data: JSONResumeSchema): string {
  const styles = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css');
  .resume-container {
    display: flex;
    padding: 20px;
    max-width: 1600px;
    margin: auto;
    font-family: "Lato", sans-serif;
    font-size: 14px;

    h1, h2, h3, h4 {
      margin-top: 0;
      margin-bottom: 10px;
    }

    p {
      margin: 5px 0 0 0;
    }

    .left-column {
      flex: 1;
      padding: 10px;
      background-color: #f4f4f9;
      border-radius: 12px;
    }

    .right-column {
      flex: 2;
      padding: 10px 10px 10px 0;
    }

    .section {
      position: relative;
      margin: 10px;

      .section-item {
        margin: 5px;

        h3 {
          display: inline-block;
          margin-right: 10px;
        }

        h4 {
          display: inline-block;
          color: #666;
        }
      }

      .timeline-section-item {
        position: relative;
        display: flex;
        align-items: flex-start;
        margin-top: 10px;

        h3 {
          display: inline-block;
          margin: 0;
        }

        h4 {
          margin: 10px 0;
        }

        .timeline {
          position: absolute;
          width: 65px;
          text-align: right;
          font-size: 12px;
        }

        .timeline::before {
          content: "";
          position: absolute;
          left: 70px; /* Adjusted to align with the timeline */
          top: 5px;
          width: 16px;
          height: 16px;
          background-color: #007BFF;
          border-radius: 50%;
        }

        .timeline-section-details {
          position: relative;
          margin-left: 92px;
        }

        .description {
          color: #666;
          font-size: 12px;
          display: inline-block;
          margin-left: 5px;
        }

        .title-anex {
          color: #666;
          font-size: 12px;
          margin-top: 5px;
        }
      }

      .timeline-section-item::before {
        content: "";
        position: absolute;
        left: 75px; /* Adjusted to align with the timeline */
        top: 30px;
        width: 6px;
        height: calc(100% - 30px);
        background-color: #ccc;
        border-radius: 3px;
      }

      .highlights, .courses {
        padding-left: 15px;
        margin-top: 5px;
        margin-bottom: 5px;
      }

      .highlights li, .courses li {
        margin-bottom: 5px;
      }

      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin-bottom: 10px;
      }

      .chip {
        background-color: #007BFF;
        color: white;
        padding: 4px 8px;
        border-radius: 20px;
        font-size: 12px;
      }
    }

    .profile-picture {
      float: left;
      margin-right: 20px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
    }
    @media only screen and (max-width: 1000px) {
      .profile-picture {
        display: none;
      }
    }
    @media only print {
      .profile-picture {
        display: none;
      }
    }

    .contact-info {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 10px;
    }

    .contact-item {
      text-decoration: none;
      color: #007BFF;
    }
  }
</style>
`;

  let resumeContainer = `<div class="resume-container">`;
  resumeContainer += styles;

  // Create the left column
  let leftColumn = `<div class="left-column">`;
  if (data.basics) {
    leftColumn += createBasicsSection(data.basics);
  }
  if (data.languages) {
    leftColumn += createLanguagesSection(data.languages);
  }
  if (data.skills) {
    leftColumn += createSkillsSection(data.skills);
  }
  if (data.interests) {
    leftColumn += createInterestsSection(data.interests);
  }
  if (data.references) {
    leftColumn += createReferencesSection(data.references);
  }
  leftColumn += `</div>`;

  // Create the right column
  let rightColumn = `<div class="right-column">`;
  if (data.work) {
    rightColumn += createExperienceSection(data.work);
  }
  if (data.projects) {
    rightColumn += createProjectsSection(data.projects);
  }
  if (data.volunteer) {
    rightColumn += createVolunteerSection(data.volunteer);
  }
  if (data.education) {
    rightColumn += createEducationSection(data.education);
  }
  rightColumn += `</div>`;

  resumeContainer += leftColumn;
  resumeContainer += rightColumn;

  resumeContainer += `</div>`;
  return resumeContainer;
}

// Export the render function as default for CommonJS compatibility
export default render;
