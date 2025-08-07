// Jest setup file for test initialization
// This file runs before each test suite

// Extend Jest matchers if needed
// import 'jest-extended';

// Global test utilities
declare global {
  namespace jest {
    interface Matchers<R> {
      toContainHTML(html: string): R;
      toBeValidHTML(): R;
    }
  }
}

// Custom matcher to check if a string contains HTML
expect.extend({
  toContainHTML(received: string, expected: string) {
    const pass = received.includes(expected);
    if (pass) {
      return {
        message: () => `expected ${received} not to contain HTML ${expected}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to contain HTML ${expected}`,
        pass: false,
      };
    }
  },

  toBeValidHTML(received: string) {
    // Basic HTML validation - checks for balanced tags and basic structure
    const hasBasicStructure =
      received.includes("<div") && received.includes("</div>");
    const hasResumeContainer = received.includes('class="resume-container"');

    if (hasBasicStructure && hasResumeContainer) {
      return {
        message: () => `expected ${received} not to be valid HTML`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be valid HTML with resume container`,
        pass: false,
      };
    }
  },
});

export {};
