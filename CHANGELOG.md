# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
