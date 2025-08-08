# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2025-08-08

### Added
- TypeScript namespace organization for better code structure
- Enhanced maintainability with logical code separation
- GitHub Package Registry publishing support

### Changed
- **BREAKING**: Package name changed from `jsonresume-theme-bluetime` to `@bluesialia/jsonresume-theme-bluetime`
- Complete internal code refactoring using TypeScript namespaces:
  - `HTMLUtils` namespace for HTML manipulation and security functions
  - `ContentUtils` namespace for content formatting utilities
  - `SectionCreators` namespace for individual resume section generators
  - Extracted CSS styles into dedicated `THEME_STYLES` constant
- Modernized Jest configuration to remove deprecated warnings

### Migration Guide
- For npm users: Update import to use `@bluesialia/jsonresume-theme-bluetime`
- For CDN users: Update URL to use the scoped package name

## [0.3.1] - 2025-08-07
### Fixed
- **Browser CDN Import Fix**: Removed problematic `export * from "./types"` that caused browser module loading errors
- Fixed "types" file import issues when using CDN with `<script type="module">`
- Improved browser compatibility by eliminating unnecessary runtime type exports
- Cleaned up global variable assignments that were no longer needed with ES modules

### Changed
- Simplified module exports for better browser compatibility
- Removed runtime type exports (types are still available for TypeScript development)

## [0.3.0] - 2025-08-07

### Added
- **ES Modules Support**: Complete migration to ES modules for native browser compatibility
- Direct ES module imports work in browsers with `<script type="module">`
- Simplified CDN usage with standard `import { render }` syntax
- Updated browser example with ES modules implementation

### Changed
- **BREAKING**: Migrated from UMD to ES2020 modules format
- **BREAKING**: Browser usage now requires `<script type="module">` instead of global variables
- Package.json marked as `"type": "module"` for Node.js ES modules support
- TypeScript configuration updated to output ES2020 modules
- Simplified build process - single compilation step to ES modules
- Browser compatibility via native ES module imports instead of IIFE/UMD wrappers

### Removed
- Global `JSONResumeThemeBluetime` object (replaced with ES module imports)
- Complex UMD/IIFE build scripts
- Browser-specific build artifacts

## [0.2.0] - 2025-08-07

### Added
- **Browser/CDN Support**: Theme now works directly in vanilla JavaScript via CDN
- Global `JSONResumeThemeBluetime` object automatically available in browsers
- UMD (Universal Module Definition) build format for universal compatibility
- Updated documentation with comprehensive CDN usage instructions

### Changed
- **BREAKING**: Build output changed from CommonJS to UMD format
- TypeScript configuration updated to output browser-compatible code

## [0.1.0] - 2025-08-07

### Added
- Initial release of jsonresume-theme-bluetime
- TypeScript-based JSON Resume theme with modern, clean design
- Complete support for JSON Resume schema including:
  - Personal information and contact details
  - Work experience with highlights
  - Education history
  - Skills with keyword tags
  - Projects with descriptions and links
  - Languages, interests, and references
- Responsive design that works on all device sizes
- Professional blue color scheme with clean typography
- Minified build for production use (`index.min.js`)
- Full TypeScript type definitions
- Comprehensive documentation
