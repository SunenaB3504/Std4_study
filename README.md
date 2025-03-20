# NiaLearn - Educational App for 4th Grade Students

NiaLearn is a comprehensive educational web application designed for 4th grade students with learning disabilities, focusing on helping with spelling challenges and making learning engaging and accessible.

## Features

- **Multi-subject Learning**: Covers Environmental Studies, English, Mathematics, General Knowledge, and Computer Science
- **Interactive Content**: Each chapter includes videos, voice-overs, games, and exercises
- **Rewards System**: Points and badges to motivate learning progress
- **Progress Tracking**: Dashboard to monitor learning activities and achievements
- **Accessibility Features**: Text-to-speech, adjustable text sizes, and child-friendly interfaces
- **Cross-platform**: Works on both laptops and tablets

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/nia-learning-app.git
   cd nia-learning-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `src/components`: Reusable UI components
  - `dashboard`: Dashboard-related components
  - `games`: Interactive educational games
  - `layout`: Layout components like Header and Footer
- `src/context`: React context providers for state management
- `src/data`: Subject and chapter data
- `src/helpers`: Utility functions and helpers
- `src/pages`: Main application pages

## Adding New Content

The application is designed to be highly modular. To add new chapters:

1. Update the subject data in `src/data/subjects.js`
2. Add new chapter objects with content, exercises, and games
3. Add any required media files to the public directory

## Technologies Used

- React.js
- React Router for navigation
- Context API for state management
- Web Speech API for text-to-speech
- CSS3 for styling with responsive design

## Accessibility Features

- Text-to-speech for content reading
- High contrast color options
- Keyboard navigation support
- Screen reader compatible
- Adjustable text sizes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
