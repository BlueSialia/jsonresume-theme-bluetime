import { JSONResumeSchema } from "./types";

// ============================================================================
// HTML UTILITIES NAMESPACE
// ============================================================================

namespace HTMLUtils {
  /**
   * Escapes HTML special characters for security
   * @param text - The text to escape
   * @returns Escaped HTML string
   */
  export function escapeHtml(text: string): string {
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
  export function safeText(text?: string): string {
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
  export function createElement(
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
  export function createSection(title?: string): string {
    let sectionDiv = `<div class="section">`;
    if (title) {
      sectionDiv += createElement("h2", "", safeText(title));
    }
    return sectionDiv;
  }
}

// ============================================================================
// CONTENT UTILITIES NAMESPACE
// ============================================================================

namespace ContentUtils {
  /**
   * Adds contact information to an HTML string.
   *
   * @param email - The email address.
   * @param phone - The phone number.
   * @param url - The URL.
   * @param profiles - An array of profile objects.
   * @returns The generated HTML string for the contact information.
   */
  export function addContactInfo(
    email?: string,
    phone?: string,
    url?: string,
    profiles: Array<{ network?: string; url?: string }> = [],
  ): string {
    let contactInfo = `<div class="contact-info">`;
    if (email) {
      contactInfo += HTMLUtils.createElement(
        "span",
        "contact-item",
        `<i class="fas fa-envelope"></i> ${HTMLUtils.createElement("a", "", HTMLUtils.safeText(email), { href: "mailto:" + email })}`,
      );
    }
    if (phone) {
      contactInfo += HTMLUtils.createElement(
        "span",
        "contact-item",
        `<i class="fas fa-phone"></i> ${HTMLUtils.createElement("a", "", HTMLUtils.safeText(phone), { href: "tel:" + phone })}`,
      );
    }
    if (url) {
      contactInfo += HTMLUtils.createElement(
        "span",
        "contact-item",
        `<i class="fas fa-globe"></i> ${HTMLUtils.createElement("a", "", HTMLUtils.safeText(url.replace(/^https?:\/\//i, "")), { href: url })}`,
      );
    }
    for (const profile of profiles) {
      if (profile.network && profile.url) {
        contactInfo += HTMLUtils.createElement(
          "span",
          "contact-item",
          `<i class="fa-brands fa-${HTMLUtils.escapeHtml(profile.network.toLowerCase())}"></i> ${HTMLUtils.createElement("a", "", HTMLUtils.safeText(profile.url.replace(/^https?:\/\//i, "")), { href: profile.url })}`,
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
  export function addLocation(location: {
    address?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    countryCode?: string;
  }): string {
    let locationLine = `<div class="location">`;
    const locationParts: string[] = [];
    if (location.address)
      locationParts.push(HTMLUtils.safeText(location.address));
    if (location.city) locationParts.push(HTMLUtils.safeText(location.city));
    if (location.region)
      locationParts.push(HTMLUtils.safeText(location.region));
    if (location.postalCode)
      locationParts.push(HTMLUtils.safeText(location.postalCode));
    if (location.countryCode)
      locationParts.push(HTMLUtils.safeText(location.countryCode));
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
  export function addChips(keywords: string[]): string {
    let keywordChips = `<div class="chips">`;
    for (const keyword of keywords) {
      keywordChips += HTMLUtils.createElement(
        "span",
        "chip",
        HTMLUtils.safeText(keyword),
      );
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
  export function addHighlights(highlights?: string[]): string {
    if (!highlights || !highlights.length) return ``;
    let highlightList = `<ul class="highlights">`;
    for (const highlight of highlights) {
      highlightList += HTMLUtils.createElement(
        "li",
        "",
        HTMLUtils.safeText(highlight),
      );
    }
    highlightList += `</ul>`;
    return highlightList;
  }
}

// ============================================================================
// STYLES CONSTANT
// ============================================================================

const THEME_STYLES = `
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
      break-inside: avoid;

      .section-item {
        margin: 5px;
        break-inside: avoid;

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
        break-inside: avoid;

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

// ============================================================================
// SECTION CREATORS NAMESPACE
// ============================================================================

namespace SectionCreators {
  /**
   * Creates a section and its content for Basics based on the given data.
   *
   * @param basics - An object containing basic information (name, label, image, email, phone, url, location, summary).
   * @returns The generated HTML string for the Basics section.
   */
  export function createBasicsSection(
    basics: JSONResumeSchema["basics"],
  ): string {
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

    let basicsSection = HTMLUtils.createSection();
    if (image) {
      basicsSection += HTMLUtils.createElement("img", "", "", {
        class: "profile-picture",
        src: image,
        alt: "Profile Picture",
      });
    }
    if (name) {
      basicsSection += HTMLUtils.createElement(
        "h1",
        "resume-name",
        HTMLUtils.safeText(name),
      );
    }
    if (label) {
      basicsSection += HTMLUtils.createElement(
        "h2",
        "job-title",
        HTMLUtils.safeText(label),
      );
    }
    basicsSection += ContentUtils.addLocation(location);
    basicsSection += ContentUtils.addContactInfo(email, phone, url, profiles);
    if (summary) {
      basicsSection += HTMLUtils.createElement(
        "p",
        "",
        HTMLUtils.safeText(summary),
      );
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
  export function createLanguagesSection(
    languages: JSONResumeSchema["languages"],
  ): string {
    if (!languages || languages.length === 0) return "";

    let languagesSection = HTMLUtils.createSection("Languages");

    for (const language of languages) {
      const { language: lang, fluency } = language;
      let languageItem = `<div class="section-item">`;

      if (lang) {
        languageItem += HTMLUtils.createElement(
          "h3",
          "",
          HTMLUtils.safeText(lang),
        );
      }
      if (fluency) {
        languageItem += HTMLUtils.createElement(
          "h4",
          "subtitle",
          HTMLUtils.safeText(fluency),
        );
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
  export function createSkillsSection(
    skills: JSONResumeSchema["skills"],
  ): string {
    if (!skills || skills.length === 0) return "";

    let skillsSection = HTMLUtils.createSection("Skills");

    for (const skill of skills) {
      const { name, level, keywords } = skill;
      let skillItem = `<div class="section-item">`;

      if (name) {
        skillItem += HTMLUtils.createElement(
          "h3",
          "",
          HTMLUtils.safeText(name),
        );
      }
      if (level) {
        skillItem += HTMLUtils.createElement(
          "h4",
          "subtitle",
          HTMLUtils.safeText(level),
        );
      }
      if (keywords && keywords.length > 0) {
        skillItem += ContentUtils.addChips(keywords);
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
  export function createInterestsSection(
    interests: JSONResumeSchema["interests"],
  ): string {
    if (!interests || interests.length === 0) return "";

    let interestsSection = HTMLUtils.createSection("Interests");

    for (const interest of interests) {
      const { name, keywords } = interest;
      let interestItem = `<div class="section-item">`;

      if (name) {
        interestItem += HTMLUtils.createElement(
          "h3",
          "",
          HTMLUtils.safeText(name),
        );
      }
      if (keywords && keywords.length > 0) {
        interestItem += ContentUtils.addChips(keywords);
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
  export function createReferencesSection(
    references: JSONResumeSchema["references"],
  ): string {
    if (!references || references.length === 0) return "";

    let referencesSection = `<div class="section references">`;
    referencesSection += HTMLUtils.createElement("h2", "", "References");

    for (const ref of references) {
      const { name, reference } = ref;
      let referenceItem = `<div class="section-item">`;

      if (name) {
        referenceItem += HTMLUtils.createElement(
          "h3",
          "",
          HTMLUtils.safeText(name),
        );
      }

      if (reference) {
        try {
          new URL(reference); // Check if reference is a valid URL
          referenceItem += HTMLUtils.createElement(
            "a",
            "reference-link",
            HTMLUtils.safeText(reference.replace(/^https?:\/\//i, "")),
            { href: reference },
          );
        } catch (e) {
          referenceItem += HTMLUtils.createElement(
            "p",
            "",
            HTMLUtils.safeText(reference),
          );
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
  export function createExperienceSection(
    experiences: JSONResumeSchema["work"],
  ): string {
    if (!experiences || experiences.length === 0) return "";

    let experienceSection = HTMLUtils.createSection("Experience");

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
          timeline += HTMLUtils.createElement(
            "span",
            "date",
            HTMLUtils.safeText(endDate),
          );
        } else {
          timeline += HTMLUtils.createElement("span", "date", "Present");
        }
        if (startDate) {
          timeline += ` <br> `;
          timeline += HTMLUtils.createElement(
            "span",
            "date",
            HTMLUtils.safeText(startDate),
          );
        }
        timeline += `</div>`;
        experienceItem += timeline;
      }

      experienceItem += `<div class="timeline-section-details">`;

      if (name) {
        experienceItem += HTMLUtils.createElement(
          "h3",
          "",
          HTMLUtils.safeText(name),
        );
      }
      if (description) {
        experienceItem += HTMLUtils.createElement(
          "span",
          "description",
          HTMLUtils.safeText(description),
        );
      }
      if (location || url) {
        let locationUrl = `<div class="title-anex">`;
        if (location) {
          locationUrl += HTMLUtils.createElement(
            "span",
            "",
            HTMLUtils.safeText(location),
          );
        }
        if (url) {
          locationUrl += ` &bull; `;
          locationUrl += HTMLUtils.createElement(
            "a",
            "url",
            HTMLUtils.safeText(url.replace(/^https?:\/\//i, "")),
            { href: url },
          );
        }
        locationUrl += `</div>`;
        experienceItem += locationUrl;
      }

      if (position) {
        experienceItem += HTMLUtils.createElement(
          "h4",
          "subtitle",
          HTMLUtils.safeText(position),
        );
      }
      if (summary) {
        experienceItem += HTMLUtils.createElement(
          "p",
          "",
          HTMLUtils.safeText(summary),
        );
      }
      if (highlights && highlights.length > 0) {
        experienceItem += ContentUtils.addHighlights(highlights);
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
  export function createProjectsSection(
    projects: JSONResumeSchema["projects"],
  ): string {
    if (!projects || projects.length === 0) return "";

    let projectsSection = `<div class="section">`;
    projectsSection += HTMLUtils.createElement("h2", "", "Projects");

    for (const project of projects) {
      const {
        name,
        url,
        description,
        highlights,
        keywords,
        startDate,
        endDate,
      } = project;
      let projectItem = `<div class="timeline-section-item">`;

      if (startDate || endDate) {
        let timeline = `<div class="timeline">`;
        if (endDate) {
          timeline += HTMLUtils.createElement(
            "span",
            "date",
            HTMLUtils.safeText(endDate),
          );
        } else {
          timeline += HTMLUtils.createElement("span", "date", "Present");
        }
        if (startDate) {
          timeline += ` <br> `;
          timeline += HTMLUtils.createElement(
            "span",
            "date",
            HTMLUtils.safeText(startDate),
          );
        }
        timeline += `</div>`;
        projectItem += timeline;
      }

      projectItem += `<div class="timeline-section-details">`;

      if (name) {
        projectItem += HTMLUtils.createElement(
          "h3",
          "",
          HTMLUtils.safeText(name),
        );
      }
      if (url) {
        projectItem += ` &bull; `;
        projectItem += HTMLUtils.createElement(
          "a",
          "description",
          HTMLUtils.safeText(url.replace(/^https?:\/\//i, "")),
          {
            href: url,
          },
        );
      }

      if (description) {
        projectItem += HTMLUtils.createElement(
          "p",
          "",
          HTMLUtils.safeText(description),
        );
      }

      if (highlights && highlights.length > 0) {
        let highlightList = `<ul class="highlights">`;
        for (const highlight of highlights) {
          highlightList += HTMLUtils.createElement(
            "li",
            "",
            HTMLUtils.safeText(highlight),
          );
        }
        highlightList += `</ul>`;
        projectItem += highlightList;
      }

      if (keywords && keywords.length > 0) {
        projectItem += ContentUtils.addChips(keywords);
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
  export function createVolunteerSection(
    volunteer: JSONResumeSchema["volunteer"],
  ): string {
    if (!volunteer || volunteer.length === 0) return "";

    let volunteerSection = HTMLUtils.createSection("Volunteer");

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
          timeline += HTMLUtils.createElement(
            "span",
            "date",
            HTMLUtils.safeText(endDate),
          );
        } else {
          timeline += HTMLUtils.createElement("span", "date", "Present");
        }
        if (startDate) {
          timeline += ` <br> `;
          timeline += HTMLUtils.createElement(
            "span",
            "date",
            HTMLUtils.safeText(startDate),
          );
        }
        timeline += `</div>`;
        volItem += timeline;
      }

      volItem += `<div class="timeline-section-details">`;

      if (organization) {
        volItem += HTMLUtils.createElement(
          "h3",
          "",
          HTMLUtils.safeText(organization),
        );
      }
      if (url) {
        volItem += HTMLUtils.createElement(
          "a",
          "description",
          HTMLUtils.safeText(url.replace(/^https?:\/\//i, "")),
          { href: url },
        );
      }

      if (position) {
        volItem += HTMLUtils.createElement(
          "div",
          "title-anex",
          HTMLUtils.safeText(position),
        );
      }
      if (summary) {
        volItem += HTMLUtils.createElement(
          "p",
          "",
          HTMLUtils.safeText(summary),
        );
      }
      if (highlights && highlights.length > 0) {
        volItem += ContentUtils.addHighlights(highlights);
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
  export function createEducationSection(
    education: JSONResumeSchema["education"],
  ): string {
    if (!education || education.length === 0) return "";

    let educationSection = HTMLUtils.createSection("Education");

    for (const edu of education) {
      const { institution, url, area, studyType, courses, startDate, endDate } =
        edu;

      let eduItem = `<div class="timeline-section-item">`;

      if (startDate || endDate) {
        let timeline = `<div class="timeline">`;
        if (endDate) {
          timeline += HTMLUtils.createElement(
            "span",
            "date",
            HTMLUtils.safeText(endDate),
          );
        } else {
          timeline += HTMLUtils.createElement("span", "date", "Present");
        }
        if (startDate) {
          timeline += ` <br> `;
          timeline += HTMLUtils.createElement(
            "span",
            "date",
            HTMLUtils.safeText(startDate),
          );
        }
        timeline += `</div>`;
        eduItem += timeline;
      }

      eduItem += `<div class="timeline-section-details">`;

      if (institution) {
        eduItem += HTMLUtils.createElement(
          "h3",
          "",
          HTMLUtils.safeText(institution),
        );
      }
      if (url) {
        eduItem += HTMLUtils.createElement(
          "a",
          "description",
          HTMLUtils.safeText(url.replace(/^https?:\/\//i, "")),
          { href: url },
        );
      }

      if (area || studyType) {
        let areaStudy = `<div class="title-anex">`;
        if (area) {
          areaStudy += HTMLUtils.createElement(
            "span",
            "",
            HTMLUtils.safeText(area),
          );
        }
        if (studyType) {
          areaStudy += HTMLUtils.createElement(
            "span",
            "description",
            HTMLUtils.safeText(studyType),
          );
        }
        areaStudy += `</div>`;
        eduItem += areaStudy;
      }

      if (courses && courses.length > 0) {
        let courseList = `<ul class="courses">`;
        for (const course of courses) {
          courseList += HTMLUtils.createElement(
            "li",
            "",
            HTMLUtils.safeText(course),
          );
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
}

// ============================================================================
// MAIN RENDER FUNCTION
// ============================================================================

/**
 * Creates the left column containing personal information and skills
 */
function createLeftColumn(data: JSONResumeSchema): string {
  let leftColumn = `<div class="left-column">`;

  if (data.basics) {
    leftColumn += SectionCreators.createBasicsSection(data.basics);
  }

  if (data.languages) {
    leftColumn += SectionCreators.createLanguagesSection(data.languages);
  }

  if (data.skills) {
    leftColumn += SectionCreators.createSkillsSection(data.skills);
  }

  if (data.interests) {
    leftColumn += SectionCreators.createInterestsSection(data.interests);
  }

  if (data.references) {
    leftColumn += SectionCreators.createReferencesSection(data.references);
  }

  leftColumn += `</div>`;
  return leftColumn;
}

/**
 * Creates the right column containing work experience and education
 */
function createRightColumn(data: JSONResumeSchema): string {
  let rightColumn = `<div class="right-column">`;

  if (data.work) {
    rightColumn += SectionCreators.createExperienceSection(data.work);
  }

  if (data.projects) {
    rightColumn += SectionCreators.createProjectsSection(data.projects);
  }

  if (data.volunteer) {
    rightColumn += SectionCreators.createVolunteerSection(data.volunteer);
  }

  if (data.education) {
    rightColumn += SectionCreators.createEducationSection(data.education);
  }

  rightColumn += `</div>`;
  return rightColumn;
}

/**
 * Renders a complete resume HTML from JSON Resume data
 *
 * @param data - JSON Resume data object
 * @returns Complete HTML string with embedded styles
 */
export function render(data: JSONResumeSchema): string {
  let resumeContainer = `<div class="resume-container">`;

  // Add embedded styles
  resumeContainer += THEME_STYLES;

  // Create the left column with personal info and skills
  resumeContainer += createLeftColumn(data);

  // Create the right column with experience and education
  resumeContainer += createRightColumn(data);

  resumeContainer += `</div>`;

  return resumeContainer;
}
