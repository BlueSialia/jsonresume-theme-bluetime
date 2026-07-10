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
      element += ` ${key}="${escapeHtml(value)}"`;
    }
    element += `>${safeText(textContent)}</${tagName}>`;
    return element;
  }

  /**
   * Creates a section with a title and data content.
   *
   * @param title - The title of the section.
   * @returns The generated HTML string for the section.
   */
  export function createSection(title?: string, content: string = ""): string {
    let sectionDiv = `<div class="section">`;
    if (title) {
      sectionDiv += createElement("h2", "", title);
    }
    sectionDiv += content;
    sectionDiv += `</div>`;
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
      contactInfo +=
        `<span class="contact-item"><i class="fa-solid fa-envelope"></i> ${HTMLUtils.createElement("a", "", email, { target: "_blank", rel: "noopener noreferrer", href: "mailto:" + email })}</span>`;
    }
    if (phone) {
      contactInfo +=
        `<span class="contact-item"><i class="fa-solid fa-phone"></i> ${HTMLUtils.createElement("a", "", phone, { target: "_blank", rel: "noopener noreferrer", href: "tel:" + phone })}</span>`;
    }
    if (url) {
      contactInfo +=
        `<span class="contact-item"><i class="fa-solid fa-globe"></i> ${HTMLUtils.createElement("a", "", url.replace(/^https?:\/\//i, ""), { target: "_blank", rel: "noopener noreferrer", href: url })}</span>`;
    }
    for (const profile of profiles) {
      if (profile.network && profile.url) {
        contactInfo +=
          `<span class="contact-item"><i class="fa-brands fa-${HTMLUtils.escapeHtml(profile.network.toLowerCase())}"></i> ${HTMLUtils.createElement("a", "", profile.url.replace(/^https?:\/\//i, ""), { target: "_blank", rel: "noopener noreferrer", href: profile.url })}</span>`;
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
      locationParts.push(location.address);
    if (location.city) locationParts.push(location.city);
    if (location.region)
      locationParts.push(location.region);
    if (location.postalCode)
      locationParts.push(location.postalCode);
    if (location.countryCode)
      locationParts.push(location.countryCode);
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
        keyword,
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
        highlight,
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
      margin-top: -2px;
      margin-bottom: 4px;
    }

    p {
      margin: 0;
    }

    .left-column {
      flex: 3;
      background-color: #f4f4f9;
      border-radius: 12px;
    }

    .right-column {
      flex: 7;
    }

    .section {
      position: relative;
      margin: 12px 5%;
      @media only print {
        margin: 12px 10px;
      }
      break-inside: avoid;

      .section-item {
        padding: 6px;
        break-inside: avoid;

        h3 {
          display: inline-block;
          margin: 0 10px 0 0;
        }

        h4 {
          display: inline-block;
          color: #666;
          margin: 0;
        }
      }

      .timeline-section-item {
        position: relative;
        display: flex;
        align-items: flex-start;
        margin: 6px 0;
        break-inside: avoid;

        h3 {
          display: inline-block;
          margin: 0;
        }

        h4 {
          margin: 6px 0;
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
        margin: 5px 0;
      }

      .chips {
        display: flex;
        margin: 4px 0;
        flex-wrap: wrap;
        gap: 5px;
      }

      .chip {
        background-color: #007BFF;
        color: white;
        padding: 3px 6px;
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
      margin: 10px 0;
    }

    .contact-item {
      text-decoration: none;
      color: #007BFF;
    }
  }

  @media print {
    body {
      margin: 0;
      padding: 0;
    }

    .resume-container {
      padding: 0;
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

    const hasContent =
      name ||
      label ||
      image ||
      email ||
      phone ||
      url ||
      summary ||
      location.address ||
      location.city ||
      location.region ||
      location.postalCode ||
      location.countryCode ||
      profiles.length > 0;

    if (!hasContent) return "";

    let content = "";
    if (image) {
      content += HTMLUtils.createElement("img", "", "", {
        class: "profile-picture",
        src: image,
        alt: "Profile Picture",
      });
    }
    if (name) {
      content += HTMLUtils.createElement(
        "h1",
        "resume-name",
        name,
      );
    }
    if (label) {
      content += HTMLUtils.createElement(
        "h2",
        "job-title",
        label,
      );
    }
    content += ContentUtils.addLocation(location);
    content += ContentUtils.addContactInfo(email, phone, url, profiles);
    if (summary) {
      content += HTMLUtils.createElement(
        "p",
        "",
        summary,
      );
    }
    return HTMLUtils.createSection("", content);
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

    let content = "";

    for (const skill of skills) {
      const { name, level, keywords } = skill;
      let skillItem = `<div class="section-item">`;

      if (name) {
        skillItem += HTMLUtils.createElement(
          "h3",
          "",
          name,
        );
      }
      if (level) {
        skillItem += HTMLUtils.createElement(
          "h4",
          "subtitle",
          level,
        );
      }
      if (keywords && keywords.length > 0) {
        skillItem += ContentUtils.addChips(keywords);
      }
      skillItem += `</div>`;
      content += skillItem;
    }

    return HTMLUtils.createSection("Skills", content);
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

    let content = "";

    for (const language of languages) {
      const { language: lang, fluency } = language;
      let languageItem = `<div class="section-item">`;

      if (lang) {
        languageItem += HTMLUtils.createElement(
          "h3",
          "",
          lang,
        );
      }
      if (fluency) {
        languageItem += HTMLUtils.createElement(
          "h4",
          "subtitle",
          fluency,
        );
      }

      languageItem += `</div>`;
      content += languageItem;
    }

    return HTMLUtils.createSection("Languages", content);
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

    let content = "";

    for (const interest of interests) {
      const { name, keywords } = interest;
      let interestItem = `<div class="section-item">`;

      if (name) {
        interestItem += HTMLUtils.createElement(
          "h3",
          "",
          name,
        );
      }
      if (keywords && keywords.length > 0) {
        interestItem += ContentUtils.addChips(keywords);
      }
      interestItem += `</div>`;
      content += interestItem;
    }

    return HTMLUtils.createSection("Interests", content);
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

    let content = "";

    for (const ref of references) {
      const { name, reference } = ref;
      let referenceItem = `<div class="section-item">`;

      if (name) {
        referenceItem += HTMLUtils.createElement(
          "h3",
          "",
          name,
        );
      }

      if (reference) {
        try {
          new URL(reference); // Check if reference is a valid URL
          referenceItem += HTMLUtils.createElement(
            "a",
            "reference-link",
            reference.replace(/^https?:\/\//i, ""),
            { target: "_blank", rel: "noopener noreferrer", href: reference },
          );
        } catch (e) {
          referenceItem += HTMLUtils.createElement(
            "p",
            "",
            reference,
          );
        }
      }

      referenceItem += `</div>`;
      content += referenceItem;
    }

    return HTMLUtils.createSection("References", content);
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

    let content = "";

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
            endDate,
          );
        } else {
          timeline += HTMLUtils.createElement("span", "date", "Present");
        }
        if (startDate) {
          timeline += ` <br> `;
          timeline += HTMLUtils.createElement(
            "span",
            "date",
            startDate,
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
          name,
        );
      }
      if (description) {
        experienceItem += HTMLUtils.createElement(
          "span",
          "description",
          description,
        );
      }
      if (location || url) {
        let locationUrl = `<div class="title-anex">`;
        if (location) {
          locationUrl += HTMLUtils.createElement(
            "span",
            "",
            location,
          );
        }
        if (url) {
          locationUrl += ` &bull; `;
          locationUrl += HTMLUtils.createElement(
            "a",
            "url",
            url.replace(/^https?:\/\//i, ""),
            { target: "_blank", rel: "noopener noreferrer", href: url },
          );
        }
        locationUrl += `</div>`;
        experienceItem += locationUrl;
      }

      if (position) {
        experienceItem += HTMLUtils.createElement(
          "h4",
          "subtitle",
          position,
        );
      }
      if (summary) {
        experienceItem += HTMLUtils.createElement(
          "p",
          "",
          summary,
        );
      }
      if (highlights && highlights.length > 0) {
        experienceItem += ContentUtils.addHighlights(highlights);
      }

      experienceItem += `</div>`;
      experienceItem += `</div>`;
      content += experienceItem;
    }

    return HTMLUtils.createSection("Experience", content);
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

    let content = "";

    for (const project of projects) {
      const {
        name,
        url,
        description,
        highlights,
        keywords,
        startDate,
        endDate,
        entity,
        roles,
      } = project;
      let projectItem = `<div class="timeline-section-item">`;

      if (startDate || endDate) {
        let timeline = `<div class="timeline">`;
        if (endDate) {
          timeline += HTMLUtils.createElement(
            "span",
            "date",
            endDate,
          );
        } else {
          timeline += HTMLUtils.createElement("span", "date", "Present");
        }
        if (startDate) {
          timeline += ` <br> `;
          timeline += HTMLUtils.createElement(
            "span",
            "date",
            startDate,
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
          name,
        );
      }
      if (url) {
        projectItem += ` &bull; `;
        projectItem += HTMLUtils.createElement(
          "a",
          "description",
          url.replace(/^https?:\/\//i, ""),
          {
            href: url,
          },
        );
      }

      if (description) {
        projectItem += HTMLUtils.createElement(
          "p",
          "",
          description,
        );
      }

      if (entity || (roles && roles.length > 0)) {
        const parts: string[] = [];
        if (entity) parts.push(entity);
        if (roles && roles.length > 0)
          parts.push(roles.join(", "));
        projectItem += HTMLUtils.createElement(
          "span",
          "description",
          parts.join(" - "),
        );
      }

      if (highlights && highlights.length > 0) {
        projectItem += ContentUtils.addHighlights(highlights);
      }

      if (keywords && keywords.length > 0) {
        projectItem += ContentUtils.addChips(keywords);
      }

      projectItem += `</div>`;
      projectItem += `</div>`;
      content += projectItem;
    }

    return HTMLUtils.createSection("Projects", content);
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

    let content = "";

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
            endDate,
          );
        } else {
          timeline += HTMLUtils.createElement("span", "date", "Present");
        }
        if (startDate) {
          timeline += ` <br> `;
          timeline += HTMLUtils.createElement(
            "span",
            "date",
            startDate,
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
          organization,
        );
      }
      if (url) {
        volItem += HTMLUtils.createElement(
          "a",
          "description",
          url.replace(/^https?:\/\//i, ""),
          { target: "_blank", rel: "noopener noreferrer", href: url },
        );
      }

      if (position) {
        volItem += HTMLUtils.createElement(
          "div",
          "title-anex",
          position,
        );
      }
      if (summary) {
        volItem += HTMLUtils.createElement(
          "p",
          "",
          summary,
        );
      }
      if (highlights && highlights.length > 0) {
        volItem += ContentUtils.addHighlights(highlights);
      }

      volItem += `</div>`;
      volItem += `</div>`;
      content += volItem;
    }

    return HTMLUtils.createSection("Volunteer", content);
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

    let content = "";

    for (const edu of education) {
      const { institution, url, area, studyType, score, courses, startDate, endDate } =
        edu;

      let eduItem = `<div class="timeline-section-item">`;

      if (startDate || endDate) {
        let timeline = `<div class="timeline">`;
        if (endDate) {
          timeline += HTMLUtils.createElement(
            "span",
            "date",
            endDate,
          );
        } else {
          timeline += HTMLUtils.createElement("span", "date", "Present");
        }
        if (startDate) {
          timeline += ` <br> `;
          timeline += HTMLUtils.createElement(
            "span",
            "date",
            startDate,
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
          institution,
        );
      }
      if (url) {
        eduItem += HTMLUtils.createElement(
          "a",
          "description",
          url.replace(/^https?:\/\//i, ""),
          { target: "_blank", rel: "noopener noreferrer", href: url },
        );
      }

      if (area || studyType) {
        let areaStudy = `<div class="title-anex">`;
        if (area) {
          areaStudy += HTMLUtils.createElement(
            "span",
            "",
            area,
          );
        }
        if (studyType) {
          areaStudy += HTMLUtils.createElement(
            "span",
            "description",
            studyType,
          );
        }
        areaStudy += `</div>`;
        eduItem += areaStudy;
      }

      if (score) {
        eduItem += HTMLUtils.createElement(
          "span",
          "description",
          "GPA: " + score,
        );
      }

      if (courses && courses.length > 0) {
        let courseList = `<ul class="courses">`;
        for (const course of courses) {
          courseList += HTMLUtils.createElement(
            "li",
            "",
            course,
          );
        }
        courseList += `</ul>`;
        eduItem += courseList;
      }

      eduItem += `</div>`;
      eduItem += `</div>`;
      content += eduItem;
    }

    return HTMLUtils.createSection("Education", content);
  }

  export function createAwardsSection(
    awards: JSONResumeSchema["awards"],
  ): string {
    if (!awards || awards.length === 0) return "";

    let content = "";

    for (const award of awards) {
      const { title, date, awarder, summary } = award;
      let awardItem = `<div class="section-item">`;

      if (title) {
        awardItem += HTMLUtils.createElement(
          "h3",
          "",
          title,
        );
      }
      if (awarder) {
        awardItem += HTMLUtils.createElement(
          "h4",
          "subtitle",
          awarder,
        );
      }
      if (date) {
        awardItem += HTMLUtils.createElement(
          "span",
          "description",
          date,
        );
      }
      if (summary) {
        awardItem += HTMLUtils.createElement(
          "p",
          "",
          summary,
        );
      }

      awardItem += `</div>`;
      content += awardItem;
    }

    return HTMLUtils.createSection("Awards", content);
  }

  export function createCertificatesSection(
    certificates: JSONResumeSchema["certificates"],
  ): string {
    if (!certificates || certificates.length === 0) return "";

    let content = "";

    for (const cert of certificates) {
      const { name, date, url, issuer } = cert;
      let certItem = `<div class="section-item">`;

      if (name) {
        certItem += HTMLUtils.createElement(
          "h3",
          "",
          name,
        );
      }
      if (issuer) {
        certItem += HTMLUtils.createElement(
          "h4",
          "subtitle",
          issuer,
        );
      }
      if (date) {
        certItem += HTMLUtils.createElement(
          "span",
          "description",
          date,
        );
      }
      if (url) {
        certItem += HTMLUtils.createElement(
          "a",
          "description",
          url.replace(/^https?:\/\//i, ""),
          { target: "_blank", rel: "noopener noreferrer", href: url },
        );
      }

      certItem += `</div>`;
      content += certItem;
    }

    return HTMLUtils.createSection("Certificates", content);
  }

  export function createPublicationsSection(
    publications: JSONResumeSchema["publications"],
  ): string {
    if (!publications || publications.length === 0) return "";

    let content = "";

    for (const pub of publications) {
      const { name, publisher, releaseDate, url, summary } = pub;
      let pubItem = `<div class="section-item">`;

      if (name) {
        pubItem += HTMLUtils.createElement(
          "h3",
          "",
          name,
        );
      }
      if (publisher) {
        pubItem += HTMLUtils.createElement(
          "h4",
          "subtitle",
          publisher,
        );
      }
      if (releaseDate) {
        pubItem += HTMLUtils.createElement(
          "span",
          "description",
          releaseDate,
        );
      }
      if (url) {
        pubItem += HTMLUtils.createElement(
          "a",
          "description",
          url.replace(/^https?:\/\//i, ""),
          { target: "_blank", rel: "noopener noreferrer", href: url },
        );
      }
      if (summary) {
        pubItem += HTMLUtils.createElement(
          "p",
          "",
          summary,
        );
      }

      pubItem += `</div>`;
      content += pubItem;
    }

    return HTMLUtils.createSection("Publications", content);
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

  if (data.skills) {
    leftColumn += SectionCreators.createSkillsSection(data.skills);
  }

  if (data.languages) {
    leftColumn += SectionCreators.createLanguagesSection(data.languages);
  }

  if (data.interests) {
    leftColumn += SectionCreators.createInterestsSection(data.interests);
  }

  if (data.awards) {
    leftColumn += SectionCreators.createAwardsSection(data.awards);
  }

  if (data.certificates) {
    leftColumn += SectionCreators.createCertificatesSection(data.certificates);
  }

  if (data.publications) {
    leftColumn += SectionCreators.createPublicationsSection(data.publications);
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
