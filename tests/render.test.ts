import { render } from "../src/index";
import { JSONResumeSchema } from "../src/types";

describe("Render Function", () => {
  describe("Basic functionality", () => {
    test("should render empty resume", () => {
      const result = render({});
      expect(result).toContain('<div class="resume-container">');
      expect(result).toContain('<div class="left-column">');
      expect(result).toContain('<div class="right-column">');
      expect(result).toContain("<style>");
      expect(result).toBeValidHTML();
    });

    test("should return a string", () => {
      const result = render({});
      expect(typeof result).toBe("string");
    });

    test("should include CSS styles", () => {
      const result = render({});
      expect(result).toContain("@import url");
      expect(result).toContain('font-family: "Lato"');
      expect(result).toContain(".resume-container");
    });

    test("should include FontAwesome icons link", () => {
      const result = render({});
      expect(result).toContain("font-awesome");
    });
  });

  describe("Basics section rendering", () => {
    test("should render name", () => {
      const resume: JSONResumeSchema = {
        basics: {
          name: "John Doe",
        },
      };
      const result = render(resume);
      expect(result).toContain("John Doe");
    });

    test("should render label/title", () => {
      const resume: JSONResumeSchema = {
        basics: {
          name: "John Doe",
          label: "Software Engineer",
        },
      };
      const result = render(resume);
      expect(result).toContain("Software Engineer");
    });

    test("should render contact information", () => {
      const resume: JSONResumeSchema = {
        basics: {
          name: "John Doe",
          email: "john@example.com",
          phone: "123-456-7890",
          url: "https://johndoe.com",
        },
      };
      const result = render(resume);
      expect(result).toContain("john@example.com");
      expect(result).toContain("123-456-7890");
      expect(result).toContain("johndoe.com");
      expect(result).toContain("mailto:john@example.com");
      expect(result).toContain("tel:123-456-7890");
    });

    test("should render summary", () => {
      const resume: JSONResumeSchema = {
        basics: {
          name: "John Doe",
          summary: "Experienced software engineer with 5+ years of experience.",
        },
      };
      const result = render(resume);
      expect(result).toContain(
        "Experienced software engineer with 5+ years of experience.",
      );
    });

    test("should render location", () => {
      const resume: JSONResumeSchema = {
        basics: {
          name: "John Doe",
          location: {
            city: "San Francisco",
            region: "CA",
            countryCode: "US",
            postalCode: "94102",
            address: "123 Main St",
          },
        },
      };
      const result = render(resume);
      expect(result).toContain("San Francisco");
      expect(result).toContain("CA");
      expect(result).toContain("US");
    });

    test("should render social profiles", () => {
      const resume: JSONResumeSchema = {
        basics: {
          name: "John Doe",
          profiles: [
            {
              network: "LinkedIn",
              url: "https://linkedin.com/in/johndoe",
            },
            {
              network: "GitHub",
              url: "https://github.com/johndoe",
            },
          ],
        },
      };
      const result = render(resume);
      expect(result).toContain("linkedin.com/in/johndoe");
      expect(result).toContain("github.com/johndoe");
      expect(result).toContain("fa-linkedin");
      expect(result).toContain("fa-github");
    });
  });

  describe("Work experience section", () => {
    test("should render work experience", () => {
      const resume: JSONResumeSchema = {
        work: [
          {
            name: "Tech Company",
            position: "Senior Developer",
            startDate: "2020-01",
            endDate: "2023-12",
            summary: "Led development of web applications",
            highlights: [
              "Improved performance by 50%",
              "Mentored junior developers",
            ],
          },
        ],
      };
      const result = render(resume);
      expect(result).toContain("Tech Company");
      expect(result).toContain("Senior Developer");
      expect(result).toContain("2020-01");
      expect(result).toContain("2023-12");
      expect(result).toContain("Led development of web applications");
      expect(result).toContain("Improved performance by 50%");
      expect(result).toContain("Mentored junior developers");
    });

    test("should handle missing end date (current position)", () => {
      const resume: JSONResumeSchema = {
        work: [
          {
            name: "Current Company",
            position: "Developer",
            startDate: "2023-01",
          },
        ],
      };
      const result = render(resume);
      expect(result).toContain("Present");
      expect(result).toContain("2023-01");
    });

    test("should render multiple work experiences", () => {
      const resume: JSONResumeSchema = {
        work: [
          {
            name: "Company A",
            position: "Senior Developer",
            startDate: "2020-01",
            endDate: "2023-12",
          },
          {
            name: "Company B",
            position: "Developer",
            startDate: "2018-01",
            endDate: "2019-12",
          },
        ],
      };
      const result = render(resume);
      expect(result).toContain("Company A");
      expect(result).toContain("Company B");
      expect(result).toContain("Senior Developer");
    });
  });

  describe("Education section", () => {
    test("should render education", () => {
      const resume: JSONResumeSchema = {
        education: [
          {
            institution: "University of Technology",
            area: "Computer Science",
            studyType: "Bachelor of Science",
            startDate: "2014",
            endDate: "2018",
          },
        ],
      };
      const result = render(resume);
      expect(result).toContain("University of Technology");
      expect(result).toContain("Computer Science");
      expect(result).toContain("Bachelor of Science");
      expect(result).toContain("2014");
      expect(result).toContain("2018");
    });

    test("should handle education without end date", () => {
      const resume: JSONResumeSchema = {
        education: [
          {
            institution: "Ongoing University",
            area: "Masters in AI",
            startDate: "2023",
          },
        ],
      };
      const result = render(resume);
      expect(result).toContain("Present");
    });
  });

  describe("Skills section", () => {
    test("should render skills", () => {
      const resume: JSONResumeSchema = {
        skills: [
          {
            name: "Programming Languages",
            keywords: ["JavaScript", "TypeScript", "Python", "Java"],
          },
          {
            name: "Frameworks",
            keywords: ["React", "Node.js", "Express"],
          },
        ],
      };
      const result = render(resume);
      expect(result).toContain("Programming Languages");
      expect(result).toContain("JavaScript");
      expect(result).toContain("TypeScript");
      expect(result).toContain("Python");
      expect(result).toContain("Frameworks");
      expect(result).toContain("React");
    });

    test("should handle empty skills array", () => {
      const resume: JSONResumeSchema = {
        skills: [],
      };
      const result = render(resume);
      expect(result).toBeValidHTML();
    });
  });

  describe("Projects section", () => {
    test("should render projects", () => {
      const resume: JSONResumeSchema = {
        projects: [
          {
            name: "E-commerce Platform",
            description: "Built a full-stack e-commerce solution",
            url: "https://example.com",
            keywords: ["React", "Node.js", "MongoDB"],
          },
        ],
      };
      const result = render(resume);
      expect(result).toContain("E-commerce Platform");
      expect(result).toContain("Built a full-stack e-commerce solution");
      expect(result).toContain("example.com");
      expect(result).toContain("React");
      expect(result).toContain("Node.js");
    });
  });

  describe("Languages section", () => {
    test("should render languages", () => {
      const resume: JSONResumeSchema = {
        languages: [
          {
            language: "English",
            fluency: "Native",
          },
          {
            language: "Spanish",
            fluency: "Intermediate",
          },
        ],
      };
      const result = render(resume);
      expect(result).toContain("English");
      expect(result).toContain("Native");
      expect(result).toContain("Spanish");
      expect(result).toContain("Intermediate");
    });
  });

  describe("Volunteer section", () => {
    test("should render volunteer work", () => {
      const resume: JSONResumeSchema = {
        volunteer: [
          {
            organization: "Local Food Bank",
            position: "Volunteer Coordinator",
            startDate: "2020-01",
            summary: "Organized food distribution events",
          },
        ],
      };
      const result = render(resume);
      expect(result).toContain("Local Food Bank");
      expect(result).toContain("Volunteer Coordinator");
      expect(result).toContain("Organized food distribution events");
    });
  });

  describe("References section", () => {
    test("should render references", () => {
      const resume: JSONResumeSchema = {
        references: [
          {
            name: "Jane Smith",
            reference:
              "John is an excellent developer with strong problem-solving skills.",
          },
        ],
      };
      const result = render(resume);
      expect(result).toContain("Jane Smith");
      expect(result).toContain("John is an excellent developer");
    });
  });

  describe("Interests section", () => {
    test("should render interests", () => {
      const resume: JSONResumeSchema = {
        interests: [
          {
            name: "Technology",
            keywords: ["AI", "Machine Learning", "Blockchain"],
          },
        ],
      };
      const result = render(resume);
      expect(result).toContain("Technology");
      expect(result).toContain("AI");
      expect(result).toContain("Machine Learning");
    });
  });

  describe("HTML security and escaping", () => {
    test("should escape HTML in name", () => {
      const resume: JSONResumeSchema = {
        basics: {
          name: '<script>alert("xss")</script>',
        },
      };
      const result = render(resume);
      expect(result).not.toContain("<script>");
      expect(result).toContain("&lt;script&gt;");
    });

    test("should escape HTML in summary", () => {
      const resume: JSONResumeSchema = {
        basics: {
          summary: "I am a developer & designer with <strong>skills</strong>",
        },
      };
      const result = render(resume);
      expect(result).toContain("&amp;");
      expect(result).toContain("&lt;strong&gt;");
      expect(result).toContain("&lt;/strong&gt;");
    });

    test("should escape HTML in work description", () => {
      const resume: JSONResumeSchema = {
        work: [
          {
            name: "Company <script>",
            summary: 'Work summary with "quotes" and <tags>',
          },
        ],
      };
      const result = render(resume);
      expect(result).not.toContain("<script>");
      expect(result).toContain("&lt;script&gt;");
      expect(result).toContain("&quot;quotes&quot;");
      expect(result).toContain("&lt;tags&gt;");
    });
  });

  describe("Date handling", () => {
    test("should preserve YYYY-MM-DD format", () => {
      const resume: JSONResumeSchema = {
        work: [
          {
            startDate: "2023-01-15",
            endDate: "2023-12-31",
          },
        ],
      };
      const result = render(resume);
      expect(result).toContain("2023-01-15");
      expect(result).toContain("2023-12-31");
    });

    test("should preserve YYYY-MM format", () => {
      const resume: JSONResumeSchema = {
        work: [
          {
            startDate: "2023-01",
            endDate: "2023-12",
          },
        ],
      };
      const result = render(resume);
      expect(result).toContain("2023-01");
      expect(result).toContain("2023-12");
    });

    test("should preserve YYYY format", () => {
      const resume: JSONResumeSchema = {
        education: [
          {
            startDate: "2020",
            endDate: "2024",
          },
        ],
      };
      const result = render(resume);
      expect(result).toContain("2020");
      expect(result).toContain("2024");
    });
  });

  describe("Complete resume integration", () => {
    test("should render a comprehensive resume", () => {
      const resume: JSONResumeSchema = {
        basics: {
          name: "John Doe",
          label: "Full Stack Developer",
          email: "john@example.com",
          phone: "(555) 123-4567",
          url: "https://johndoe.dev",
          summary:
            "Passionate full-stack developer with 8+ years of experience building scalable web applications.",
          location: {
            city: "San Francisco",
            region: "CA",
            countryCode: "US",
          },
          profiles: [
            {
              network: "GitHub",
              url: "https://github.com/johndoe",
            },
          ],
        },
        work: [
          {
            name: "Tech Startup Inc.",
            position: "Senior Full Stack Developer",
            startDate: "2020-03",
            endDate: "2024-01",
            summary: "Led development of core platform features",
            highlights: [
              "Improved application performance by 40%",
              "Mentored 3 junior developers",
            ],
          },
        ],
        education: [
          {
            institution: "Stanford University",
            area: "Computer Science",
            studyType: "Bachelor of Science",
            startDate: "2012",
            endDate: "2016",
          },
        ],
        skills: [
          {
            name: "Programming",
            keywords: ["JavaScript", "TypeScript", "Python"],
          },
        ],
        projects: [
          {
            name: "Personal Portfolio",
            description: "Built with React and Node.js",
            url: "https://johndoe.dev",
          },
        ],
      };

      const result = render(resume);

      // Check that all major sections are present
      expect(result).toContain("John Doe");
      expect(result).toContain("Full Stack Developer");
      expect(result).toContain("john@example.com");
      expect(result).toContain("Tech Startup Inc.");
      expect(result).toContain("Stanford University");
      expect(result).toContain("JavaScript");
      expect(result).toContain("Personal Portfolio");

      // Check structure
      expect(result).toBeValidHTML();
      expect(result).toContain('<div class="resume-container">');
      expect(result).toContain('<div class="left-column">');
      expect(result).toContain('<div class="right-column">');
    });
  });

  describe("Edge cases", () => {
    test("should handle null values gracefully", () => {
      const resume: JSONResumeSchema = {
        basics: {
          name: "John Doe",
          summary: "",
        },
      };
      const result = render(resume);
      expect(result).toContain("John Doe");
      expect(result).toBeValidHTML();
    });

    test("should handle empty arrays", () => {
      const resume: JSONResumeSchema = {
        basics: {
          name: "John Doe",
        },
      };
      const result = render(resume);
      expect(result).toContain("John Doe");
      expect(result).toBeValidHTML();
    });

    test("should handle very long text content", () => {
      const longText = "A".repeat(1000);
      const resume: JSONResumeSchema = {
        basics: {
          name: "John Doe",
          summary: longText,
        },
      };
      const result = render(resume);
      expect(result).toContain(longText);
      expect(result).toBeValidHTML();
    });
  });

  describe("Performance", () => {
    test("should render quickly for typical resume", () => {
      const resume: JSONResumeSchema = {
        basics: { name: "Test User" },
        work: Array(5).fill({
          name: "Company",
          position: "Developer",
          startDate: "2020",
          endDate: "2023",
        }),
        skills: Array(10).fill({
          name: "Skill Category",
          keywords: ["skill1", "skill2", "skill3"],
        }),
      };

      const startTime = Date.now();
      render(resume);
      const endTime = Date.now();

      const duration = endTime - startTime;
      expect(duration).toBeLessThan(100); // Should render in under 100ms
    });
  });
});
