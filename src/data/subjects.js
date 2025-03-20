const subjects = [
  {
    id: 'environmental-studies',
    name: 'Environmental Studies',
    icon: '🌳',
    color: '#8E24AA', // Purple
    description: 'Learn about plants, animals, and our environment',
    chapters: [
      {
        id: 'plants',
        title: 'Plants Around Us',
        description: 'Discover different types of plants and their importance',
        videoUrl: '/videos/environmental/plants-intro.mp4',
        content: 'Plants are living things that grow in the soil or water...',
        exercises: [
          {
            id: 'plant-parts',
            type: 'matching',
            title: 'Match Plant Parts',
            instructions: 'Match each plant part with its function',
            data: [
              { item: 'Roots', match: 'Absorb water from soil' },
              { item: 'Stem', match: 'Carries water to leaves' },
              { item: 'Leaves', match: 'Make food using sunlight' },
              { item: 'Flower', match: 'Makes seeds' }
            ]
          },
          {
            id: 'plant-spellings',
            type: 'spelling',
            title: 'Plant Spelling Practice',
            instructions: 'Listen and type the correct spelling',
            words: ['plant', 'leaf', 'root', 'stem', 'flower', 'seed']
          }
        ]
      }
    ]
  },
  {
    id: 'english',
    name: 'English',
    icon: '📚',
    color: '#FF6D00', // Orange
    description: 'Improve reading, writing, and vocabulary skills',
    chapters: [
      {
        id: 'nouns',
        title: 'Nouns: People, Places, and Things',
        description: 'Learn about naming words in English',
        videoUrl: '/videos/english/nouns-intro.mp4',
        content: 'A noun is a word that names a person, place, thing, or idea...',
        exercises: [
          {
            id: 'identify-nouns',
            type: 'selection',
            title: 'Identify the Nouns',
            instructions: 'Select all the nouns in each sentence',
            data: [
              {
                sentence: 'The cat sits on the table.',
                nouns: ['cat', 'table']
              },
              {
                sentence: 'John and Mary went to the park.',
                nouns: ['John', 'Mary', 'park']
              }
            ]
          },
          {
            id: 'noun-spellings',
            type: 'spelling',
            title: 'Noun Spelling Practice',
            instructions: 'Listen and type the correct spelling',
            words: ['teacher', 'school', 'friend', 'house', 'computer', 'playground']
          }
        ]
      }
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: '🔢',
    color: '#6A1B9A', // Deep Purple
    description: 'Learn numbers, operations, and basic math concepts',
    chapters: [
      {
        id: 'addition',
        title: 'Addition of Numbers',
        description: 'Learn how to add numbers together',
        videoUrl: '/videos/math/addition-intro.mp4',
        content: 'Addition is putting together two or more numbers to find the total...',
        exercises: [
          {
            id: 'simple-addition',
            type: 'quiz',
            title: 'Simple Addition',
            instructions: 'Solve these addition problems',
            questions: [
              {
                question: '5 + 3 = ?',
                options: ['7', '8', '9', '10'],
                correctAnswer: '8'
              },
              {
                question: '12 + 7 = ?',
                options: ['17', '18', '19', '20'],
                correctAnswer: '19'
              }
            ]
          },
          {
            id: 'word-problems',
            type: 'dragdrop',
            title: 'Addition Word Problems',
            instructions: 'Drag the correct answer to each problem',
            problems: [
              {
                text: 'Sam has 4 apples. He gets 5 more. How many apples does Sam have now?',
                answer: '9'
              },
              {
                text: 'There are 8 birds on a tree. 6 more birds join them. How many birds are there now?',
                answer: '14'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'computer',
    name: 'Computer Science',
    icon: '💻',
    color: '#9C27B0', // Purple shade
    description: 'Learn about computers, coding, and digital technology',
    chapters: [
      {
        id: 'basics',
        title: 'Computer Basics',
        description: 'Learn about the different parts of a computer and how they work',
        videoUrl: '/videos/computer/basics-intro.mp4',
        content: 'Computers are electronic devices that can process data. They have different parts like the monitor, keyboard, mouse, and CPU (Central Processing Unit). The CPU is like the brain of the computer. It helps the computer to think and do tasks. The monitor is like the face of the computer, showing us what the computer is doing. The keyboard and mouse help us to give instructions to the computer.',
        exercises: [
          {
            id: 'computer-parts',
            type: 'matching',
            title: 'Match Computer Parts',
            instructions: 'Match each computer part with its function',
            data: [
              { item: 'CPU', match: 'Processes information' },
              { item: 'Monitor', match: 'Displays images' },
              { item: 'Keyboard', match: 'Types letters and numbers' },
              { item: 'Mouse', match: 'Moves the cursor' },
              { item: 'Speakers', match: 'Plays sounds' }
            ]
          },
          {
            id: 'computer-spellings',
            type: 'spelling',
            title: 'Computer Term Spelling Practice',
            instructions: 'Listen and type the correct spelling',
            words: ['computer', 'keyboard', 'mouse', 'monitor', 'screen', 'click', 'program']
          },
          {
            id: 'computer-quiz',
            type: 'quiz',
            title: 'Computer Basics Quiz',
            instructions: 'Choose the correct answer for each question',
            questions: [
              {
                question: 'Which part of the computer is like its brain?',
                options: ['Monitor', 'Keyboard', 'CPU', 'Mouse'],
                correctAnswer: 'CPU',
                explanation: 'The CPU (Central Processing Unit) processes information and controls the computer, just like a brain!'
              },
              {
                question: 'What do we use to type letters and numbers?',
                options: ['Monitor', 'Keyboard', 'Mouse', 'Speaker'],
                correctAnswer: 'Keyboard',
                explanation: 'The keyboard has keys with letters, numbers, and symbols that we press to type.'
              },
              {
                question: 'What should you do before turning off your computer?',
                options: ['Save your work', 'Turn up the volume', 'Press all the keys', 'Unplug everything'],
                correctAnswer: 'Save your work',
                explanation: 'Always save your work before turning off your computer or you might lose it!'
              }
            ]
          }
        ]
      }
    ]
  }
];

export default subjects;
