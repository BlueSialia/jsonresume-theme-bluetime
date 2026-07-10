# Architectural Decision Records

All Architectural Decisions and their rationale will be documented in this file.

The format is based on the [Y-Statement](https://adr.github.io/adr-templates/#y-statement).

## Tech Stack

### TypeScript with ES2020 Modules

In the context of building a distributable JSONResume theme that works in browsers and Node.js,
facing choices like plain JavaScript, a bundler-based setup, or CommonJS,
we decided to author the theme in TypeScript compiled to ES2020 modules
and neglected plain JavaScript and CommonJS-style output,
to achieve type safety during development and native ES module consumption in both environments,
accepting that consumers must use ES module-compatible tooling (Node 14.8+ or modern browsers).

### Zero Runtime Dependencies

In the context of a theme that renders a single HTML string from JSON data,
facing the temptation to pull in templating libraries, CSS frameworks, or HTML builders,
we decided to ship zero runtime dependencies — only dev dependencies for build and test,
to achieve a minimal footprint, instant installation, and no supply-chain risk at render time,
accepting that all HTML generation, CSS authoring, and escaping logic must be implemented from scratch.

### Namespace-Based Code Organization

In the context of a single-file render module with distinct concerns (HTML utilities, content formatting, section rendering),
facing choices like splitting into multiple files, using classes, or keeping everything in one flat file,
we decided to organize code into TypeScript namespaces (`HTMLUtils`, `ContentUtils`, `SectionCreators`)
and neglected class-based or multi-file architectures,
to achieve logical grouping without the overhead of additional imports or build complexity,
accepting that the file grows large and that namespaces are a TypeScript-specific feature not present in standard JavaScript.

### String Concatenation over Templating

In the context of generating HTML markup programmatically from structured resume data,
facing choices like Handlebars, JSX, tagged template literals, or a virtual DOM,
we decided to build HTML via plain string concatenation with an `HTMLUtils.createElement` helper,
to achieve zero external dependencies and full control over the output,
accepting that the code is more verbose than template-based approaches and that XSS prevention relies on disciplined escaping.

## Rendering Architecture

### Single Render Function Contract

In the context of JSONResume's theme specification requiring a `render()` function that returns a complete HTML string,
facing the option to return partial HTML and require consumers to assemble a full page,
we decided to have `render()` return a self-contained HTML string with embedded `<style>` tags, external font imports, and the full DOM structure,
to achieve a drop-in experience where consumers only need to write the result to a file or set `innerHTML`,
accepting that the output includes external CDN references (Google Fonts, Font Awesome) that require network access at render time.

### Two-Column Flexbox Layout

In the context of presenting resume data in a visually balanced format,
facing choices like single-column, grid-based, or multi-page layouts,
we decided to use a two-column flexbox layout: left column (personal info, languages, skills, interests, awards, certificates, publications, references) and right column (work, projects, volunteer, education),
to achieve a clean, scannable CV format that mirrors traditional paper resume layouts,
accepting that sections with very long content in one column can create visual imbalance.

### Embedded CSS over Separate Stylesheets

In the context of a theme that must work by returning a single HTML string,
facing the constraint that the `render()` function signature cannot include separate CSS file references,
we decided to embed all CSS inline within a `<style>` tag in the returned HTML
and neglected requiring consumers to copy or link separate CSS files,
to achieve zero-configuration theming where the output is fully self-contained,
accepting that the CSS is repeated in every rendered resume and external font imports add render-blocking requests.

### CSS Nesting for Style Scoping

In the context of preventing style collisions when the rendered HTML is embedded in a host page,
facing the limitation that no CSS modules or scoping tools are available in a single-file theme,
we decided to use CSS nesting under a `.resume-container` root selector to scope all styles
and neglected BEM, CSS-in-JS, or other scoping conventions,
to achieve collision-free styling without additional tooling,
accepting that CSS nesting is a relatively recent spec (Baseline 2024) and older renderers may not support it.

### CDN-Hosted Fonts and Icons

In the context of needing professional typography and social network icons without shipping font files,
facing the constraint that the theme must return a single HTML string with no asset files,
we decided to load Google Fonts (Lato) and Font Awesome from CDNs via `@import` in the embedded `<style>` tag
and neglected inlining base64-encoded fonts or shipping font files alongside the package,
to achieve rich visual design without bloating the package size,
accepting that offline rendering will show fallback fonts and missing icons.

## Schema and Data

### Full JSONResume Schema Support

In the context of the JSONResume standard defining 12 top-level sections (basics, work, volunteer, education, awards, certificates, publications, skills, languages, interests, references, projects),
facing the complexity of rendering all sections with appropriate layouts,
we decided to render every standard section
and neglected partial-schema support or custom extensions,
to achieve full compatibility with any valid JSONResume resume,
accepting that some sections (awards, certificates, publications) use a simpler non-timeline layout than work/education.

### Silent Omission of Empty Sections

In the context of generating clean, minimal HTML from sparse resume data,
facing the choice between rendering empty section containers or omitting them entirely,
we decided that every section creator returns an empty string when its data array is missing or empty
and neglected rendering placeholder "No data" messages or empty `<div>` wrappers,
to achieve a resume that only contains what the user provided,
accepting that consumers cannot visually distinguish "section not provided" from "section intentionally left empty".

### Left/Right Column Section Assignment

In the context of organizing 12 resume sections into a two-column layout,
facing the need to decide which sections go where,
we decided to place personal, contact, and supplementary information (basics, languages, skills, interests, awards, certificates, publications, references) in the left column and career timeline content (work, projects, volunteer, education) in the right column,
to achieve a layout where the narrower left column acts as a sidebar profile and the wider right column carries the chronological narrative,
accepting that resumes heavy on timeline content produce a long right column with a short left column.

## Security

### XSS Prevention via Centralized HTML Escaping

In the context of rendering user-supplied resume data into HTML,
facing the risk of cross-site scripting if data contains HTML special characters,
we decided to centralize HTML escaping in `HTMLUtils.createElement` which auto-escapes all text content
and neglected per-call-site escaping or sanitization libraries,
to achieve defense-in-depth where forgetting to escape at a call site is impossible,
accepting that elements requiring raw HTML children (e.g., contact info spans with nested icons) must build those elements manually outside `createElement`.

### External Link Security Attributes

In the context of rendering links to external websites, email addresses, and social profiles,
facing the risk of `window.opener` exploitation when links are clicked from the rendered resume,
we decided to add `target="_blank"` and `rel="noopener noreferrer"` to all anchor elements
and neglected omitting these attributes for simplicity,
to achieve secure link behavior regardless of the hosting environment,
accepting that all external links now open in new tabs rather than navigating in the current tab.

## Testing

### Node Native Test Runner over Jest

In the context of maintaining a test suite for a TypeScript ESM project,
facing Jest's complex configuration needs (transform plugins, ESM support, custom config files),
we decided to migrate from Jest to the Node.js native test runner (`node:test`) with `tsx` for TypeScript execution
and neglected alternative testing frameworks like Vitest,
to achieve zero-config TypeScript testing with no additional test framework dependency,
accepting the loss of built-in code coverage (replaced by Node's `--experimental-test-coverage`) and custom matchers (replaced by plain assertion helpers).

### Inline HTML Assertions over DOM Parsing

In the context of testing HTML output from the `render()` function,
facing the choice between parsing the HTML with a DOM library (like `jsdom`) or asserting against raw strings,
we decided to use string-based assertions (`assert.ok(result.includes(...))`)
and neglected DOM-based testing approaches,
to achieve fast, dependency-free tests that validate the exact output,
accepting that tests are fragile against cosmetic HTML changes and cannot verify CSS application or layout behavior.

## Tooling and Delivery

### ESM-Only Package with Conditional Exports

In the context of publishing an npm package consumed in both Node.js and browser environments,
facing the legacy of CommonJS packages and the complexity of dual-format builds,
we decided to ship as ESM-only with conditional exports (`import` → full build, `default` → minified)
and neglected CommonJS (`require`) support,
to achieve simplicity in the build pipeline and alignment with modern JavaScript standards,
accepting that consumers stuck on CommonJS cannot use this package directly.

### Size-Limited Bundle Budget

In the context of a theme loaded over CDN for browser usage,
facing the risk of bloat from CSS, font imports, or inefficient code generation,
we decided to enforce bundle size budgets via `size-limit`: 50 KB for the compiled module and 15 KB for the minified version,
to achieve fast CDN loading and a commitment to keeping the theme lightweight,
accepting that new sections or features must fit within these budgets or justify an increase.

### Automated Release Pipeline via Release-Please

In the context of maintaining consistent versioning and changelogs,
facing the manual overhead of bumping versions, tagging releases, and writing changelog entries,
we decided to use `release-please-action` to automate semantic versioning and changelog generation from Conventional Commits
and neglected manual version management or custom release scripts,
to achieve hands-off releases where merging a release PR triggers npm publication,
accepting that all commits must follow the Conventional Commits format for correct version bump detection.

### Unused Dependency Detection via Knip

In the context of maintaining a clean dependency manifest in `package.json`,
facing the risk of declaring unused devDependencies or omitting used ones,
we decided to use `knip` in CI for unused/missing dependency detection
and neglected `depcheck` (which was initially documented but never implemented),
to achieve fast, TypeScript-aware scanning that understands ESM imports and test files,
accepting that `size-limit` must be explicitly ignored since it is only used via its GitHub Action.

### Centralized Highlight Rendering

In the context of generating highlight lists for multiple section types (work, volunteer, projects),
facing the need to render `<ul>` lists with highlight items,
we decided to centralize highlight rendering in `ContentUtils.addHighlights`
and call it from all section creators including projects,
to achieve consistent HTML output and avoid duplicated logic,
accepting that `addHighlights` returns an empty string when highlights are null or empty.
