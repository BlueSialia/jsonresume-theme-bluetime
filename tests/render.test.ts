import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { render } from "../src/index";
import { JSONResumeSchema } from "../src/types";
import { assertValidHTML } from "./setup.ts";

describe("Render Function", () => {
  describe("Basic functionality", () => {
    test("should render empty resume", () => {
      const result = render({});
      assert.ok(result.includes('<div class="resume-container">'), `Expected to contain '<div class="resume-container">'`);
      assert.ok(result.includes('<div class="left-column">'), `Expected to contain '<div class="left-column">'`);
      assert.ok(result.includes('<div class="right-column">'), `Expected to contain '<div class="right-column">'`);
      assert.ok(result.includes("<style>"), `Expected to contain "<style>"`);
      assertValidHTML(result);
    });

    test("should return a string", () => {
      const result = render({});
      assert.strictEqual(typeof result, "string");
    });

    test("should include CSS styles", () => {
      const result = render({});
      assert.ok(result.includes("@import url"), `Expected to contain "@import url"`);
      assert.ok(result.includes('font-family: "Lato"'), `Expected to contain 'font-family: "Lato"'`);
      assert.ok(result.includes(".resume-container"), `Expected to contain ".resume-container"`);
    });

    test("should include FontAwesome icons link", () => {
      const result = render({});
      assert.ok(result.includes("font-awesome"), `Expected to contain "font-awesome"`);
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
      assert.ok(result.includes("John Doe"), `Expected to contain "John Doe"`);
    });

    test("should render label/title", () => {
      const resume: JSONResumeSchema = {
        basics: {
          name: "John Doe",
          label: "Software Engineer",
        },
      };
      const result = render(resume);
      assert.ok(result.includes("Software Engineer"), `Expected to contain "Software Engineer"`);
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
      assert.ok(result.includes("john@example.com"), `Expected to contain "john@example.com"`);
      assert.ok(result.includes("123-456-7890"), `Expected to contain "123-456-7890"`);
      assert.ok(result.includes("johndoe.com"), `Expected to contain "johndoe.com"`);
      assert.ok(result.includes("mailto:john@example.com"), `Expected to contain "mailto:john@example.com"`);
      assert.ok(result.includes("tel:123-456-7890"), `Expected to contain "tel:123-456-7890"`);
    });

    test("should render summary", () => {
      const resume: JSONResumeSchema = {
        basics: {
          name: "John Doe",
          summary: "Experienced software engineer with 5+ years of experience.",
        },
      };
      const result = render(resume);
      assert.ok(
        result.includes("Experienced software engineer with 5+ years of experience."),
        `Expected to contain "Experienced software engineer with 5+ years of experience."`,
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
      assert.ok(result.includes("San Francisco"), `Expected to contain "San Francisco"`);
      assert.ok(result.includes("CA"), `Expected to contain "CA"`);
      assert.ok(result.includes("US"), `Expected to contain "US"`);
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
      assert.ok(result.includes("linkedin.com/in/johndoe"), `Expected to contain "linkedin.com/in/johndoe"`);
      assert.ok(result.includes("github.com/johndoe"), `Expected to contain "github.com/johndoe"`);
      assert.ok(result.includes("fa-linkedin"), `Expected to contain "fa-linkedin"`);
      assert.ok(result.includes("fa-github"), `Expected to contain "fa-github"`);
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
      assert.ok(result.includes("Tech Company"), `Expected to contain "Tech Company"`);
      assert.ok(result.includes("Senior Developer"), `Expected to contain "Senior Developer"`);
      assert.ok(result.includes("2020-01"), `Expected to contain "2020-01"`);
      assert.ok(result.includes("2023-12"), `Expected to contain "2023-12"`);
      assert.ok(result.includes("Led development of web applications"), `Expected to contain "Led development of web applications"`);
      assert.ok(result.includes("Improved performance by 50%"), `Expected to contain "Improved performance by 50%"`);
      assert.ok(result.includes("Mentored junior developers"), `Expected to contain "Mentored junior developers"`);
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
      assert.ok(result.includes("Present"), `Expected to contain "Present"`);
      assert.ok(result.includes("2023-01"), `Expected to contain "2023-01"`);
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
      assert.ok(result.includes("Company A"), `Expected to contain "Company A"`);
      assert.ok(result.includes("Company B"), `Expected to contain "Company B"`);
      assert.ok(result.includes("Senior Developer"), `Expected to contain "Senior Developer"`);
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
      assert.ok(result.includes("University of Technology"), `Expected to contain "University of Technology"`);
      assert.ok(result.includes("Computer Science"), `Expected to contain "Computer Science"`);
      assert.ok(result.includes("Bachelor of Science"), `Expected to contain "Bachelor of Science"`);
      assert.ok(result.includes("2014"), `Expected to contain "2014"`);
      assert.ok(result.includes("2018"), `Expected to contain "2018"`);
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
      assert.ok(result.includes("Present"), `Expected to contain "Present"`);
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
      assert.ok(result.includes("Programming Languages"), `Expected to contain "Programming Languages"`);
      assert.ok(result.includes("JavaScript"), `Expected to contain "JavaScript"`);
      assert.ok(result.includes("TypeScript"), `Expected to contain "TypeScript"`);
      assert.ok(result.includes("Python"), `Expected to contain "Python"`);
      assert.ok(result.includes("Frameworks"), `Expected to contain "Frameworks"`);
      assert.ok(result.includes("React"), `Expected to contain "React"`);
    });

    test("should handle empty skills array", () => {
      const resume: JSONResumeSchema = {
        skills: [],
      };
      const result = render(resume);
      assertValidHTML(result);
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
      assert.ok(result.includes("E-commerce Platform"), `Expected to contain "E-commerce Platform"`);
      assert.ok(result.includes("Built a full-stack e-commerce solution"), `Expected to contain "Built a full-stack e-commerce solution"`);
      assert.ok(result.includes("example.com"), `Expected to contain "example.com"`);
      assert.ok(result.includes("React"), `Expected to contain "React"`);
      assert.ok(result.includes("Node.js"), `Expected to contain "Node.js"`);
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
      assert.ok(result.includes("English"), `Expected to contain "English"`);
      assert.ok(result.includes("Native"), `Expected to contain "Native"`);
      assert.ok(result.includes("Spanish"), `Expected to contain "Spanish"`);
      assert.ok(result.includes("Intermediate"), `Expected to contain "Intermediate"`);
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
      assert.ok(result.includes("Local Food Bank"), `Expected to contain "Local Food Bank"`);
      assert.ok(result.includes("Volunteer Coordinator"), `Expected to contain "Volunteer Coordinator"`);
      assert.ok(result.includes("Organized food distribution events"), `Expected to contain "Organized food distribution events"`);
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
      assert.ok(result.includes("Jane Smith"), `Expected to contain "Jane Smith"`);
      assert.ok(result.includes("John is an excellent developer"), `Expected to contain "John is an excellent developer"`);
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
      assert.ok(result.includes("Technology"), `Expected to contain "Technology"`);
      assert.ok(result.includes("AI"), `Expected to contain "AI"`);
      assert.ok(result.includes("Machine Learning"), `Expected to contain "Machine Learning"`);
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
      assert.ok(!result.includes("<script>"), `Expected not to contain "<script>"`);
      assert.ok(result.includes("&lt;script&gt;"), `Expected to contain "&lt;script&gt;"`);
    });

    test("should escape HTML in summary", () => {
      const resume: JSONResumeSchema = {
        basics: {
          summary: "I am a developer & designer with <strong>skills</strong>",
        },
      };
      const result = render(resume);
      assert.ok(result.includes("&amp;"), `Expected to contain "&amp;"`);
      assert.ok(result.includes("&lt;strong&gt;"), `Expected to contain "&lt;strong&gt;"`);
      assert.ok(result.includes("&lt;/strong&gt;"), `Expected to contain "&lt;/strong&gt;"`);
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
      assert.ok(!result.includes("<script>"), `Expected not to contain "<script>"`);
      assert.ok(result.includes("&lt;script&gt;"), `Expected to contain "&lt;script&gt;"`);
      assert.ok(result.includes("&quot;quotes&quot;"), `Expected to contain "&quot;quotes&quot;"`);
      assert.ok(result.includes("&lt;tags&gt;"), `Expected to contain "&lt;tags&gt;"`);
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
      assert.ok(result.includes("2023-01-15"), `Expected to contain "2023-01-15"`);
      assert.ok(result.includes("2023-12-31"), `Expected to contain "2023-12-31"`);
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
      assert.ok(result.includes("2023-01"), `Expected to contain "2023-01"`);
      assert.ok(result.includes("2023-12"), `Expected to contain "2023-12"`);
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
      assert.ok(result.includes("2020"), `Expected to contain "2020"`);
      assert.ok(result.includes("2024"), `Expected to contain "2024"`);
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
      assert.ok(result.includes("John Doe"), `Expected to contain "John Doe"`);
      assert.ok(result.includes("Full Stack Developer"), `Expected to contain "Full Stack Developer"`);
      assert.ok(result.includes("john@example.com"), `Expected to contain "john@example.com"`);
      assert.ok(result.includes("Tech Startup Inc."), `Expected to contain "Tech Startup Inc."`);
      assert.ok(result.includes("Stanford University"), `Expected to contain "Stanford University"`);
      assert.ok(result.includes("JavaScript"), `Expected to contain "JavaScript"`);
      assert.ok(result.includes("Personal Portfolio"), `Expected to contain "Personal Portfolio"`);

      // Check structure
      assertValidHTML(result);
      assert.ok(result.includes('<div class="resume-container">'), `Expected to contain '<div class="resume-container">'`);
      assert.ok(result.includes('<div class="left-column">'), `Expected to contain '<div class="left-column">'`);
      assert.ok(result.includes('<div class="right-column">'), `Expected to contain '<div class="right-column">'`);
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
      assert.ok(result.includes("John Doe"), `Expected to contain "John Doe"`);
      assertValidHTML(result);
    });

    test("should handle empty arrays", () => {
      const resume: JSONResumeSchema = {
        basics: {
          name: "John Doe",
        },
      };
      const result = render(resume);
      assert.ok(result.includes("John Doe"), `Expected to contain "John Doe"`);
      assertValidHTML(result);
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
      assert.ok(result.includes(longText), `Expected to contain long text`);
      assertValidHTML(result);
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
      assert.ok(duration < 100, `Expected ${duration} < 100`);
    });
  });
});
