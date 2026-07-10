# JSONResume Theme Bluetime

[![Hippocratic License HL3-BOD-CL-ECO-FFD-LAW-MEDIA-MIL-MY-SV-TAL-USTA-XUAR](https://img.shields.io/static/v1?label=Hippocratic%20License&message=HL3-BOD-CL-ECO-FFD-LAW-MEDIA-MIL-MY-SV-TAL-USTA-XUAR&labelColor=5e2751&color=bc8c3d)](https://firstdonoharm.dev/version/3/0/bod-cl-eco-ffd-law-media-mil-my-sv-tal-usta-xuar.html)

---

A TypeScript-based theme for [JSON Resume](https://jsonresume.org/) called Bluetime.

## Installation

### Node.js/NPM

```bash
npm install @bluesialia/jsonresume-theme-bluetime
```

### Browser/CDN

For vanilla JavaScript usage in browsers, you can use the theme directly from a CDN:

```html
<script type="module">
  import { render } from "https://cdn.jsdelivr.net/npm/@bluesialia/jsonresume-theme-bluetime/dist/index.js";
</script>
```

## Usage

### Browser Usage (ES Modules)

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Resume</title>
</head>
<body>
    <div id="resume-container"></div>
    
    <script type="module">
        // Import the render function directly using ES modules
        import { render } from "https://cdn.jsdelivr.net/npm/@bluesialia/jsonresume-theme-bluetime/dist/index.js";
        
        // Your JSON Resume data
        const resumeData = {
            basics: {
                name: "John Doe",
                label: "Software Developer",
                email: "john.doe@example.com",
                phone: "(123) 456-7890",
                url: "https://johndoe.dev",
                summary: "Passionate software developer with 5+ years of experience.",
                location: {
                    city: "San Francisco",
                    region: "CA"
                }
            },
            work: [
                {
                    name: "Tech Corp",
                    position: "Senior Software Developer",
                    startDate: "2021-03",
                    summary: "Led development of web applications using React and Node.js"
                }
            ]
            // ... more resume data
        };

        // Render the resume using the imported render function
        const htmlResume = render(resumeData);
        document.getElementById('resume-container').innerHTML = htmlResume;
    </script>
</body>
</html>
```

### Node.js Usage (ES Modules)

```javascript
import { render } from '@bluesialia/jsonresume-theme-bluetime';

// Your JSON Resume data
const resumeData = {
  basics: {
    name: "John Doe",
    label: "Software Developer",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    url: "https://johndoe.dev",
    summary: "Passionate software developer with 5+ years of experience.",
    location: {
      city: "San Francisco",
      region: "CA"
    }
  },
  work: [
    {
      name: "Tech Corp",
      position: "Senior Software Developer",
      startDate: "2021-03",
      summary: "Led development of web applications using React and Node.js"
    }
  ],
  // ... more resume data
};

// Generate HTML
const htmlResume = render(resumeData);

// Save to file
const fs = require('fs');
fs.writeFileSync('resume.html', htmlResume);
```

## ES Modules Usage Notes

When using the theme:

- **Browser**: Use `<script type="module">` and `import { render }`
- **Node.js**: Works with native ES modules (`import` statements) — requires Node.js 18+
- The default `import` path gives you the full build; the minified build is available via `dist/index.min.js` for direct CDN usage
- All styles are embedded in the generated HTML
- No additional CSS files are needed
- Compatible with modern browsers supporting ES modules and native CSS nesting (Chrome 120+, Firefox 117+, Safari 17.2+, Edge 120+)

### CDN URLs

```
https://cdn.jsdelivr.net/npm/@bluesialia/jsonresume-theme-bluetime/dist/index.js
https://cdn.jsdelivr.net/npm/@bluesialia/jsonresume-theme-bluetime/dist/index.min.js
```

### Browser Compatibility

- **Modern browsers** (Chrome 120+, Firefox 117+, Safari 17.2+, Edge 120+) — required for ES modules and native CSS nesting
- **Node.js** 18+ with ES modules support
- Browsers must support ES modules (`<script type="module">`) and native CSS nesting
- Older browsers will render a broken layout due to unsupported CSS nesting syntax

## JSON Resume Schema

This theme supports the complete [JSON Resume Schema](https://jsonresume.org/schema/). The schema includes:

- **basics**: Personal information, contact details, and summary
- **work**: Work experience and achievements
- **volunteer**: Volunteer experience
- **education**: Educational background
- **awards**: Awards and recognitions
- **certificates**: Professional certifications
- **publications**: Published works
- **skills**: Technical and professional skills
- **languages**: Language proficiencies
- **interests**: Personal interests and hobbies
- **references**: Professional references
- **projects**: Personal and professional projects

## Theme Customization

The generated HTML includes embedded CSS that you can customize. The theme uses a clean design with:

- Blue accent colors (`#3498db`)
- Professional typography
- Responsive layout
- Clean section separators
- Skill tags for easy scanning

> **Note:** The rendered HTML loads Google Fonts (Lato) and Font Awesome icons from CDNs. Offline rendering will show fallback fonts and missing icons.

## Development

### Prerequisites

- Node.js 18 or higher
- npm

### Building from Source

```bash
# Clone the repository
git clone https://github.com/BlueSialia/jsonresume-theme-bluetime.git
cd jsonresume-theme-bluetime

# Install dependencies
npm install

# Build the project
npm run build

# Watch for changes during development
npm run dev
```

### Project Structure

```
src/
├── index.ts      # Main render function with ES modules exports
├── types.ts      # TypeScript interfaces for JSON Resume schema
dist/
├── index.js      # ES2020 modules output
├── index.min.js  # Minified ES modules version
├── index.d.ts    # TypeScript declarations
├── types.d.ts    # Type definitions
└── types.js      # Compiled types module
```

### Scripts

#### Build Scripts
- `npm run build`: Clean, compile TypeScript, and create minified version
- `npm run compile`: Compile TypeScript to ES2020 modules
- `npm run minify`: Create minified ES modules version
- `npm run clean`: Remove dist directory

#### Development Scripts
- `npm run dev`: Watch mode for development (recompiles TypeScript on file changes; does not minify)
- `npm run lint`: Type-check without compilation

#### Testing Scripts
- `npm test`: Run tests with build using Node.js native test runner
- `npm run test:watch`: Run tests in watch mode for development
- `npm run test:coverage`: Run tests with coverage report

#### Utility Scripts
- `npm run size`: Show compiled and minified file sizes
- `npm run prepublishOnly`: Automatically runs before publishing

## Testing

This project includes a comprehensive test suite built with the Node.js native test runner and TypeScript. We maintain high test coverage to ensure reliability and catch regressions.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode during development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### What's Tested

The test suite covers:
- **Render Function**: All paths through the main render function
- **HTML Security**: XSS prevention and HTML escaping
- **All Resume Sections**: Basics, work, education, skills, projects, etc.
- **Date Handling**: Various date formats and edge cases
- **Contact Information**: Email, phone, URL formatting with proper links
- **Social Profiles**: Multiple networks with Font Awesome icons
- **Error Handling**: Missing fields, malformed data, edge cases
- **Performance**: Baseline rendering speed assertion
- **Accessibility**: Semantic HTML and proper link attributes

## Contributing

Contributions are welcome! Please feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

[Hippocratic License HL3-BOD-CL-ECO-FFD-LAW-MEDIA-MIL-MY-SV-TAL-USTA-XUAR](LICENSE).

## Support

If you encounter any issues or have questions:

1. Check the [GitHub Issues](https://github.com/BlueSialia/jsonresume-theme-bluetime/issues)
2. Create a new issue with a detailed description
3. Include sample resume data if reporting rendering issues

## Related

- [JSON Resume](https://jsonresume.org/) - The open source initiative to create a JSON-based standard for resumes
- [JSON Resume Schema](https://jsonresume.org/schema/) - Complete schema documentation
- [Other JSON Resume Themes](https://jsonresume.org/themes/) - Browse more themes

---

Made with ❤️ by [BlueSialia](https://github.com/BlueSialia)
