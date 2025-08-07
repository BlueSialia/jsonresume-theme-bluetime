// Jest custom matchers type declarations

declare global {
  namespace jest {
    interface Matchers<R> {
      toContainHTML(html: string): R;
      toBeValidHTML(): R;
    }
  }
}

export {};
