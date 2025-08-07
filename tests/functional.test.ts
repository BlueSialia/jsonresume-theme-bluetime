import { render } from "../src/index";
import { JSONResumeSchema } from "../src/types";

describe("Functional Tests", () => {
  describe("Contact Information Rendering", () => {
    test("should render email with mailto link", () => {
      const resume: JSONResumeSchema = {
        basics: {
          email: "test@example.com",
        },
      };
      const result = render(resume);
      expect(result).toContain("mailto:test@example.com");
      expect(result).toContain("fa-envelope");
    });

    test("should render phone with tel link", () => {
      const resume: JSONResumeSchema = {
        basics: {
          phone: "+1-555-123-4567",
        },
      };
      const result = render(resume);
      expect(result).toContain("tel:+1-555-123-4567");
      expect(result).toContain("fa-phone");
    });

    test("should render URL with proper link", () => {
      const resume: JSONResumeSchema = {
        basics: {
          url: "https://example.com",
        },
      };
      const result = render(resume);
      expect(result).toContain('href="https://example.com"');
      expect(result).toContain("example.com"); // Should strip protocol from display
      expect(result).toContain("fa-globe");
    });

    test("should strip protocol from URL display", () => {
      const resume: JSONResumeSchema = {
        basics: {
          url: "https://www.example.com/portfolio",
        },
      };
      const result = render(resume);
      expect(result).toContain("www.example.com/portfolio");
      expect(result).not.toContain(">https://www.example.com/portfolio<");
    });

    test("should handle HTTP and HTTPS URLs", () => {
      const resume: JSONResumeSchema = {
        basics: {
          url: "http://example.com",
        },
      };
      const result = render(resume);
      expect(result).toContain("example.com");
      expect(result).toContain('href="http://example.com"');
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

      expect(result).toContain("fa-linkedin");
      expect(result).toContain("fa-github");
      expect(result).toContain("fa-twitter");
      expect(result).toContain("linkedin.com/in/johndoe");
      expect(result).toContain("github.com/johndoe");
      expect(result).toContain("twitter.com/johndoe");
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
      expect(result).toBeValidHTML();
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
      expect(result).toBeValidHTML();
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

      expect(result).toContain("123 Main Street");
      expect(result).toContain("San Francisco");
      expect(result).toContain("California");
      expect(result).toContain("94102");
      expect(result).toContain("US");
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

      expect(result).toContain("New York");
      expect(result).toContain("US");
    });

    test("should handle empty location object", () => {
      const resume: JSONResumeSchema = {
        basics: {
          location: {},
        },
      };
      const result = render(resume);
      expect(result).toBeValidHTML();
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

      expect(result).toContain("Improved performance by 50%");
      expect(result).toContain("Led team of 5 developers");
      expect(result).toContain("Implemented CI/CD pipeline");
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

      expect(result).toContain("Company");
      expect(result).toContain("Just a summary without highlights");
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

      expect(result).toContain("Remote, USA");
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

      expect(result).toContain("techstartup.com");
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

      expect(result).toContain("Data Structures");
      expect(result).toContain("Algorithms");
      expect(result).toContain("Database Systems");
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

      expect(result).toContain("University");
      expect(result).toContain("Computer Science");
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

      expect(result).toContain("University");
      expect(result).toContain("Computer Science");
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

      expect(result).toContain("React");
      expect(result).toContain("Vue.js");
      expect(result).toContain("Angular");
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

      expect(result).toContain("Expert");
      expect(result).toContain("ES6+");
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

      expect(result).toContain("Programming");
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

      expect(result).toContain("mystore.com");
      expect(result).toContain('href="https://mystore.com"');
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

      expect(result).toContain("React Native");
      expect(result).toContain("iOS");
      expect(result).toContain("Android");
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

      expect(result).toContain("2023-01");
      expect(result).toContain("2023-06");
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

      expect(result).toContain("Organized fundraising events");
      expect(result).toContain("Managed volunteer team");
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

      expect(result).toContain("opensource.org");
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

      expect(result).toContain("John Doe");
      expect(result).toBeValidHTML();
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

      expect(result).toBeValidHTML();
      expect(result).toContain("Company");
      expect(result).toContain("University");
    });
  });

  describe("HTML Structure and Styling", () => {
    test("should have proper CSS classes", () => {
      const resume: JSONResumeSchema = {
        basics: { name: "Test" },
      };
      const result = render(resume);

      expect(result).toContain('class="resume-container"');
      expect(result).toContain('class="left-column"');
      expect(result).toContain('class="right-column"');
    });

    test("should include Font Awesome icons", () => {
      const result = render({});
      expect(result).toContain("font-awesome");
    });

    test("should include Google Fonts", () => {
      const result = render({});
      expect(result).toContain("fonts.googleapis.com");
      expect(result).toContain("Lato");
    });

    test("should have responsive design classes", () => {
      const result = render({});
      expect(result).toContain("flex");
      expect(result).toContain("max-width");
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

      expect(result).toContain("invalid-date"); // Should preserve as-is
      expect(result).toBeValidHTML();
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

      expect(result).toContain("Some work experience");
      expect(result).toBeValidHTML();
    });

    test("should handle unicode characters", () => {
      const resume: JSONResumeSchema = {
        basics: {
          name: "José María García-López",
          summary: "Développeur with café ☕ and résumé",
        },
      };
      const result = render(resume);

      expect(result).toContain("José María García-López");
      expect(result).toContain("Développeur");
      expect(result).toContain("café ☕");
      expect(result).toContain("résumé");
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

      expect(result).toContain(longSummary);
      expect(result.length).toBeGreaterThan(2000);
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

      expect(leftColumnIndex).toBeLessThan(rightColumnIndex);
      expect(emailIndex).toBeGreaterThan(leftColumnIndex);
      expect(emailIndex).toBeLessThan(rightColumnIndex);
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

      expect(companyIndex).toBeGreaterThan(rightColumnIndex);
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

      expect(result).toContain('href="mailto:test@example.com"');
      expect(result).toContain('href="https://linkedin.com/in/test"');
    });

    test("should have semantic HTML structure", () => {
      const resume: JSONResumeSchema = {
        basics: { name: "Test" },
        skills: [{ name: "Programming" }],
      };
      const result = render(resume);

      expect(result).toContain("<h1");
      expect(result).toContain("<h2");
      expect(result).toContain("<div");
    });
  });
});
