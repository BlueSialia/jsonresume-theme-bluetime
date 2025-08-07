# JSONResume Theme Bluetime

---

A TypeScript-based theme for [JSON Resume](https://jsonresume.org/) called Bluetime.

## Installation

### Node.js/NPM

```bash
npm install jsonresume-theme-bluetime
```

### Browser/CDN

For vanilla JavaScript usage in browsers, you can use the theme directly from a CDN:

```html
<script type="module">
  import { render } from "https://cdn.jsdelivr.net/npm/jsonresume-theme-bluetime/dist/index.js";
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
        import { render } from "https://cdn.jsdelivr.net/npm/jsonresume-theme-bluetime/dist/index.js";
        
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
import { render } from 'jsonresume-theme-bluetime';

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
- **Node.js**: Works with native ES modules (`import` statements)
- The minified version is recommended for production: `index.min.js`
- All styles are embedded in the generated HTML
- No additional CSS files are needed
- Compatible with modern browsers supporting ES modules (ES2020+)
- Uses native ES2020 modules format

### CDN URLs

```
https://cdn.jsdelivr.net/npm/jsonresume-theme-bluetime/dist/index.js
https://cdn.jsdelivr.net/npm/jsonresume-theme-bluetime/dist/index.min.js
```

### Browser Compatibility

- **Modern browsers** (Chrome 61+, Firefox 60+, Safari 11+, Edge 16+)
- **Node.js** 14.8+ with ES modules support
- Browsers must support ES modules (`<script type="module">`)

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

## Development

### Prerequisites

- Node.js 16 or higher
- npm or yarn

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
└── types.d.ts    # Type definitions
```

### Scripts

#### Build Scripts
- `npm run build`: Clean, compile TypeScript, and create minified version
- `npm run compile`: Compile TypeScript to ES2020 modules
- `npm run minify`: Create minified ES modules version
- `npm run clean`: Remove dist directory

#### Development Scripts
- `npm run dev`: Watch mode for development (recompiles on file changes)
- `npm run lint`: Type-check without compilation

#### Testing Scripts
- `npm test`: Run comprehensive Jest test suite with build
- `npm run test:watch`: Run tests in watch mode for development
- `npm run test:coverage`: Run tests with coverage report

#### Utility Scripts
- `npm run size`: Show compiled and minified file sizes
- `npm run prepublishOnly`: Automatically runs before publishing

## Testing

This project includes a comprehensive test suite built with Jest and TypeScript. We maintain high test coverage to ensure reliability and catch regressions.

### Test Coverage
- **93.61%** statement coverage
- **85.37%** branch coverage
- **100%** function coverage
- **96.29%** line coverage

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode during development
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run the original legacy test
npm run test:legacy
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
- **Performance**: Rendering speed benchmarks
- **Accessibility**: Semantic HTML and proper link attributes

For detailed testing information, see [TESTING.md](TESTING.md).

## Contributing

Contributions are welcome! Please feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License. See [LICENSE](LICENSE) for details.

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
