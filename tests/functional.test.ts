import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { render } from "../src/index";
import { JSONResumeSchema } from "../src/types";
import { assertValidHTML } from "./setup.ts";

describe("Functional Tests", () => {
  describe("Contact Information Rendering", () => {
    test("should render email with mailto link", () => {
      const resume: JSONResumeSchema = {
        basics: {
          email: "test@example.com",
        },
      };
      const result = render(resume);
      assert.ok(result.includes("mailto:test@example.com"), `Expected to contain "mailto:test@example.com"`);
      assert.ok(result.includes("fa-envelope"), `Expected to contain "fa-envelope"`);
    });

    test("should render phone with tel link", () => {
      const resume: JSONResumeSchema = {
        basics: {
          phone: "+1-555-123-4567",
        },
      };
      const result = render(resume);
      assert.ok(result.includes("tel:+1-555-123-4567"), `Expected to contain "tel:+1-555-123-4567"`);
      assert.ok(result.includes("fa-phone"), `Expected to contain "fa-phone"`);
    });

    test("should render URL with proper link", () => {
      const resume: JSONResumeSchema = {
        basics: {
          url: "https://example.com",
        },
      };
      const result = render(resume);
      assert.ok(result.includes('href="https://example.com"'), `Expected to contain 'href="https://example.com"'`);
      assert.ok(result.includes("example.com"), `Expected to contain "example.com"`); // Should strip protocol from display
      assert.ok(result.includes("fa-globe"), `Expected to contain "fa-globe"`);
    });

    test("should strip protocol from URL display", () => {
      const resume: JSONResumeSchema = {
        basics: {
          url: "https://www.example.com/portfolio",
        },
      };
      const result = render(resume);
      assert.ok(result.includes("www.example.com/portfolio"), `Expected to contain "www.example.com/portfolio"`);
      assert.ok(!result.includes(">https://www.example.com/portfolio<"), `Expected not to contain ">https://www.example.com/portfolio<"`);
    });

    test("should handle HTTP and HTTPS URLs", () => {
      const resume: JSONResumeSchema = {
        basics: {
          url: "http://example.com",
        },
      };
      const result = render(resume);
      assert.ok(result.includes("example.com"), `Expected to contain "example.com"`);
      assert.ok(result.includes('href="http://example.com"'), `Expected to contain 'href="http://example.com"'`);
    });
  });

  describe("Social Profiles Rendering", () => {
    test("should render multiple social profiles", () => {
      const resume: JSONResumeSchema = {
        basics: {
          profiles: [
            {
              network: "LinkedIn",
              url: "https://linkedin.com/in/johndoe",
            },
            {
              network: "GitHub",
              url: "https://github.com/johndoe",
            },
            {
              network: "Twitter",
              url: "https://twitter.com/johndoe",
            },
          ],
        },
      };
      const result = render(resume);

      assert.ok(result.includes("fa-linkedin"), `Expected to contain "fa-linkedin"`);
      assert.ok(result.includes("fa-github"), `Expected to contain "fa-github"`);
      assert.ok(result.includes("fa-twitter"), `Expected to contain "fa-twitter"`);
      assert.ok(result.includes("linkedin.com/in/johndoe"), `Expected to contain "linkedin.com/in/johndoe"`);
      assert.ok(result.includes("github.com/johndoe"), `Expected to contain "github.com/johndoe"`);
      assert.ok(result.includes("twitter.com/johndoe"), `Expected to contain "twitter.com/johndoe"`);
    });

    test("should handle profiles without network", () => {
      const resume: JSONResumeSchema = {
        basics: {
          profiles: [
            {
              url: "https://example.com",
            },
          ],
        },
      };
      const result = render(resume);
      assertValidHTML(result);
    });

    test("should handle profiles without URL", () => {
      const resume: JSONResumeSchema = {
        basics: {
          profiles: [
            {
              network: "LinkedIn",
            },
          ],
        },
      };
      const result = render(resume);
      assertValidHTML(result);
    });
  });

  describe("Location Rendering", () => {
    test("should render complete location", () => {
      const resume: JSONResumeSchema = {
        basics: {
          location: {
            address: "123 Main Street",
            city: "San Francisco",
            region: "California",
            postalCode: "94102",
            countryCode: "US",
          },
        },
      };
      const result = render(resume);

      assert.ok(result.includes("123 Main Street"), `Expected to contain "123 Main Street"`);
      assert.ok(result.includes("San Francisco"), `Expected to contain "San Francisco"`);
      assert.ok(result.includes("California"), `Expected to contain "California"`);
      assert.ok(result.includes("94102"), `Expected to contain "94102"`);
      assert.ok(result.includes("US"), `Expected to contain "US"`);
    });

    test("should render partial location", () => {
      const resume: JSONResumeSchema = {
        basics: {
          location: {
            city: "New York",
            countryCode: "US",
          },
        },
      };
      const result = render(resume);

      assert.ok(result.includes("New York"), `Expected to contain "New York"`);
      assert.ok(result.includes("US"), `Expected to contain "US"`);
    });

    test("should handle empty location object", () => {
      const resume: JSONResumeSchema = {
        basics: {
          location: {},
        },
      };
      const result = render(resume);
      assertValidHTML(result);
    });
  });

  describe("Work Experience Details", () => {
    test("should render work highlights as list", () => {
      const resume: JSONResumeSchema = {
        work: [
          {
            name: "Tech Company",
            position: "Developer",
            highlights: [
              "Improved performance by 50%",
              "Led team of 5 developers",
              "Implemented CI/CD pipeline",
            ],
          },
        ],
      };
      const result = render(resume);

      assert.ok(result.includes("Improved performance by 50%"), `Expected to contain "Improved performance by 50%"`);
      assert.ok(result.includes("Led team of 5 developers"), `Expected to contain "Led team of 5 developers"`);
      assert.ok(result.includes("Implemented CI/CD pipeline"), `Expected to contain "Implemented CI/CD pipeline"`);
    });

    test("should handle work without highlights", () => {
      const resume: JSONResumeSchema = {
        work: [
          {
            name: "Company",
            position: "Developer",
            summary: "Just a summary without highlights",
          },
        ],
      };
      const result = render(resume);

      assert.ok(result.includes("Company"), `Expected to contain "Company"`);
      assert.ok(result.includes("Just a summary without highlights"), `Expected to contain "Just a summary without highlights"`);
    });

    test("should render work location", () => {
      const resume: JSONResumeSchema = {
        work: [
          {
            name: "Remote Company",
            position: "Developer",
            location: "Remote, USA",
          },
        ],
      };
      const result = render(resume);

      assert.ok(result.includes("Remote, USA"), `Expected to contain "Remote, USA"`);
    });

    test("should render work URL", () => {
      const resume: JSONResumeSchema = {
        work: [
          {
            name: "Tech Startup",
            position: "Developer",
            url: "https://techstartup.com",
          },
        ],
      };
      const result = render(resume);

      assert.ok(result.includes("techstartup.com"), `Expected to contain "techstartup.com"`);
    });
  });

  describe("Education Details", () => {
    test("should render education with courses", () => {
      const resume: JSONResumeSchema = {
        education: [
          {
            institution: "University",
            area: "Computer Science",
            courses: ["Data Structures", "Algorithms", "Database Systems"],
          },
        ],
      };
      const result = render(resume);

      assert.ok(result.includes("Data Structures"), `Expected to contain "Data Structures"`);
      assert.ok(result.includes("Algorithms"), `Expected to contain "Algorithms"`);
      assert.ok(result.includes("Database Systems"), `Expected to contain "Database Systems"`);
    });

    test("should render education courses", () => {
      const resume: JSONResumeSchema = {
        education: [
          {
            institution: "University",
            area: "Computer Science",
            courses: ["Data Structures", "Algorithms"],
          },
        ],
      };
      const result = render(resume);

      assert.ok(result.includes("University"), `Expected to contain "University"`);
      assert.ok(result.includes("Computer Science"), `Expected to contain "Computer Science"`);
    });

    test("should handle education without score", () => {
      const resume: JSONResumeSchema = {
        education: [
          {
            institution: "University",
            area: "Computer Science",
          },
        ],
      };
      const result = render(resume);

      assert.ok(result.includes("University"), `Expected to contain "University"`);
      assert.ok(result.includes("Computer Science"), `Expected to contain "Computer Science"`);
    });
  });

  describe("Skills with Chips", () => {
    test("should render skills as chips", () => {
      const resume: JSONResumeSchema = {
        skills: [
          {
            name: "Frontend",
            keywords: ["React", "Vue.js", "Angular"],
          },
        ],
      };
      const result = render(resume);

      assert.ok(result.includes("React"), `Expected to contain "React"`);
      assert.ok(result.includes("Vue.js"), `Expected to contain "Vue.js"`);
      assert.ok(result.includes("Angular"), `Expected to contain "Angular"`);
    });

    test("should handle skill level", () => {
      const resume: JSONResumeSchema = {
        skills: [
          {
            name: "JavaScript",
            level: "Expert",
            keywords: ["ES6+", "Node.js"],
          },
        ],
      };
      const result = render(resume);

      assert.ok(result.includes("Expert"), `Expected to contain "Expert"`);
      assert.ok(result.includes("ES6+"), `Expected to contain "ES6+"`);
    });

    test("should handle empty keywords array", () => {
      const resume: JSONResumeSchema = {
        skills: [
          {
            name: "Programming",
            keywords: [],
          },
        ],
      };
      const result = render(resume);

      assert.ok(result.includes("Programming"), `Expected to contain "Programming"`);
    });
  });

  describe("Projects with URLs", () => {
    test("should render project URLs", () => {
      const resume: JSONResumeSchema = {
        projects: [
          {
            name: "E-commerce Site",
            url: "https://mystore.com",
            description: "Online store built with React",
          },
        ],
      };
      const result = render(resume);

      assert.ok(result.includes("mystore.com"), `Expected to contain "mystore.com"`);
      assert.ok(result.includes('href="https://mystore.com"'), `Expected to contain 'href="https://mystore.com"'`);
    });

    test("should render project keywords", () => {
      const resume: JSONResumeSchema = {
        projects: [
          {
            name: "Mobile App",
            keywords: ["React Native", "iOS", "Android"],
          },
        ],
      };
      const result = render(resume);

      assert.ok(result.includes("React Native"), `Expected to contain "React Native"`);
      assert.ok(result.includes("iOS"), `Expected to contain "iOS"`);
      assert.ok(result.includes("Android"), `Expected to contain "Android"`);
    });

    test("should handle project dates", () => {
      const resume: JSONResumeSchema = {
        projects: [
          {
            name: "Personal Website",
            startDate: "2023-01",
            endDate: "2023-06",
          },
        ],
      };
      const result = render(resume);

      assert.ok(result.includes("2023-01"), `Expected to contain "2023-01"`);
      assert.ok(result.includes("2023-06"), `Expected to contain "2023-06"`);
    });
  });

  describe("Volunteer Work", () => {
    test("should render volunteer highlights", () => {
      const resume: JSONResumeSchema = {
        volunteer: [
          {
            organization: "Local Charity",
            position: "Volunteer",
            highlights: [
              "Organized fundraising events",
              "Managed volunteer team",
            ],
          },
        ],
      };
      const result = render(resume);

      assert.ok(result.includes("Organized fundraising events"), `Expected to contain "Organized fundraising events"`);
      assert.ok(result.includes("Managed volunteer team"), `Expected to contain "Managed volunteer team"`);
    });

    test("should render volunteer URL", () => {
      const resume: JSONResumeSchema = {
        volunteer: [
          {
            organization: "Open Source Project",
            url: "https://opensource.org",
          },
        ],
      };
      const result = render(resume);

      assert.ok(result.includes("opensource.org"), `Expected to contain "opensource.org"`);
    });
  });

  describe("Additional Features", () => {
    test("should handle resume without optional sections", () => {
      const resume: JSONResumeSchema = {
        basics: {
          name: "John Doe",
        },
      };
      const result = render(resume);

      assert.ok(result.includes("John Doe"), `Expected to contain "John Doe"`);
      assertValidHTML(result);
    });

    test("should render all supported sections when provided", () => {
      const resume: JSONResumeSchema = {
        basics: { name: "Test" },
        work: [{ name: "Company", position: "Dev" }],
        education: [{ institution: "University" }],
        skills: [{ name: "Tech", keywords: ["JS"] }],
        projects: [{ name: "Project" }],
        volunteer: [{ organization: "Charity" }],
        languages: [{ language: "English" }],
        interests: [{ name: "Tech" }],
        references: [{ name: "Ref" }],
      };
      const result = render(resume);

      assertValidHTML(result);
      assert.ok(result.includes("Company"), `Expected to contain "Company"`);
      assert.ok(result.includes("University"), `Expected to contain "University"`);
    });
  });

  describe("HTML Structure and Styling", () => {
    test("should have proper CSS classes", () => {
      const resume: JSONResumeSchema = {
        basics: { name: "Test" },
      };
      const result = render(resume);

      assert.ok(result.includes('class="resume-container"'), `Expected to contain 'class="resume-container"'`);
      assert.ok(result.includes('class="left-column"'), `Expected to contain 'class="left-column"'`);
      assert.ok(result.includes('class="right-column"'), `Expected to contain 'class="right-column"'`);
    });

    test("should include Font Awesome icons", () => {
      const result = render({});
      assert.ok(result.includes("font-awesome"), `Expected to contain "font-awesome"`);
    });

    test("should include Google Fonts", () => {
      const result = render({});
      assert.ok(result.includes("fonts.googleapis.com"), `Expected to contain "fonts.googleapis.com"`);
      assert.ok(result.includes("Lato"), `Expected to contain "Lato"`);
    });

    test("should have responsive design classes", () => {
      const result = render({});
      assert.ok(result.includes("flex"), `Expected to contain "flex"`);
      assert.ok(result.includes("max-width"), `Expected to contain "max-width"`);
    });
  });

  describe("Data Validation and Error Handling", () => {
    test("should handle malformed dates gracefully", () => {
      const resume: JSONResumeSchema = {
        work: [
          {
            name: "Company",
            startDate: "invalid-date",
            endDate: "2023",
          },
        ],
      };
      const result = render(resume);

      assert.ok(result.includes("invalid-date"), `Expected to contain "invalid-date"`); // Should preserve as-is
      assertValidHTML(result);
    });

    test("should handle missing required fields", () => {
      const resume: JSONResumeSchema = {
        work: [
          {
            // Missing name and position
            startDate: "2020",
            summary: "Some work experience",
          },
        ],
      };
      const result = render(resume);

      assert.ok(result.includes("Some work experience"), `Expected to contain "Some work experience"`);
      assertValidHTML(result);
    });

    test("should handle unicode characters", () => {
      const resume: JSONResumeSchema = {
        basics: {
          name: "José María García-López",
          summary: "Développeur with café ☕ and résumé",
        },
      };
      const result = render(resume);

      assert.ok(result.includes("José María García-López"), `Expected to contain "José María García-López"`);
      assert.ok(result.includes("Développeur"), `Expected to contain "Développeur"`);
      assert.ok(result.includes("café ☕"), `Expected to contain "café ☕"`);
      assert.ok(result.includes("résumé"), `Expected to contain "résumé"`);
    });

    test("should handle very long content", () => {
      const longSummary =
        "This is a very long summary that goes on and on. ".repeat(50);
      const resume: JSONResumeSchema = {
        basics: {
          name: "John Doe",
          summary: longSummary,
        },
      };
      const result = render(resume);

      assert.ok(result.includes(longSummary), `Expected to contain long summary`);
      assert.ok(result.length > 2000, `Expected length > 2000, got ${result.length}`);
    });
  });

  describe("Section Ordering and Layout", () => {
    test("should place contact info in left column", () => {
      const resume: JSONResumeSchema = {
        basics: {
          name: "John Doe",
          email: "john@example.com",
        },
      };
      const result = render(resume);

      const leftColumnIndex = result.indexOf('class="left-column"');
      const rightColumnIndex = result.indexOf('class="right-column"');
      const emailIndex = result.indexOf("john@example.com");

      assert.ok(leftColumnIndex < rightColumnIndex, `Expected leftColumnIndex (${leftColumnIndex}) < rightColumnIndex (${rightColumnIndex})`);
      assert.ok(emailIndex > leftColumnIndex, `Expected emailIndex (${emailIndex}) > leftColumnIndex (${leftColumnIndex})`);
      assert.ok(emailIndex < rightColumnIndex, `Expected emailIndex (${emailIndex}) < rightColumnIndex (${rightColumnIndex})`);
    });

    test("should place work experience in right column", () => {
      const resume: JSONResumeSchema = {
        work: [
          {
            name: "Tech Company",
            position: "Developer",
          },
        ],
      };
      const result = render(resume);

      const rightColumnIndex = result.indexOf('class="right-column"');
      const companyIndex = result.indexOf("Tech Company");

      assert.ok(companyIndex > rightColumnIndex, `Expected companyIndex (${companyIndex}) > rightColumnIndex (${rightColumnIndex})`);
    });
  });

  describe("Accessibility Features", () => {
    test("should have proper link attributes", () => {
      const resume: JSONResumeSchema = {
        basics: {
          email: "test@example.com",
          profiles: [
            {
              network: "LinkedIn",
              url: "https://linkedin.com/in/test",
            },
          ],
        },
      };
      const result = render(resume);

      assert.ok(result.includes('href="mailto:test@example.com"'), `Expected to contain 'href="mailto:test@example.com"'`);
      assert.ok(result.includes('href="https://linkedin.com/in/test"'), `Expected to contain 'href="https://linkedin.com/in/test"'`);
    });

    test("should have semantic HTML structure", () => {
      const resume: JSONResumeSchema = {
        basics: { name: "Test" },
        skills: [{ name: "Programming" }],
      };
      const result = render(resume);

      assert.ok(result.includes("<h1"), `Expected to contain "<h1"`);
      assert.ok(result.includes("<h2"), `Expected to contain "<h2"`);
      assert.ok(result.includes("<div"), `Expected to contain "<div"`);
    });
  });
});
