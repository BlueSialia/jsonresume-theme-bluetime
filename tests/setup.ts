import assert from "node:assert/strict";

export function assertValidHTML(received: string): void {
  const hasBasicStructure =
    received.includes("<div") && received.includes("</div>");
  const hasResumeContainer = received.includes('class="resume-container"');
  assert.ok(
    hasBasicStructure && hasResumeContainer,
    "Expected valid HTML with resume container"
  );
}
