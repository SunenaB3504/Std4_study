const subjects = [
  {
    id: 'environmental-studies',
    name: 'Environmental Studies',
    icon: '🌳',
    color: '#4CAF50',
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
    color: '#2196F3',
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
    color: '#F44336',
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
  }
];

export default subjects;
