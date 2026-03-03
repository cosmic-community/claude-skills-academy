import type { GameLevel, Achievement } from '@/types';

// Changed: Updated level colors to use Anthropic-aligned warm gradients
export const GAME_LEVELS: GameLevel[] = [
  {
    id: 1,
    name: 'Claude Basics',
    description: 'Learn what Claude is and how to get started with your first interactions.',
    icon: '🌱',
    color: 'from-emerald-500 to-teal-600',
    requiredXP: 0,
    lessons: [
      {
        id: 'l1-1',
        title: 'What is Claude?',
        slug: 'what-is-claude',
        description: 'Discover Claude AI — Anthropic\'s helpful, harmless, and honest assistant.',
        level: 1,
        levelName: 'Claude Basics',
        order: 1,
        content: `Claude is an AI assistant built by Anthropic. It's designed to be helpful, harmless, and honest. Unlike simple chatbots, Claude can understand complex instructions, maintain context across long conversations, and help with a wide variety of tasks.

**Key things to know about Claude:**

• **Conversational AI** — Claude communicates through natural language, understanding your intent and responding thoughtfully.

• **Safety-first design** — Claude is built with Constitutional AI principles, making it more reliable and trustworthy.

• **Versatile capabilities** — From writing and analysis to coding and math, Claude can assist with diverse tasks.

• **Context awareness** — Claude can process long documents, maintain conversation history, and understand nuanced requests.

• **Multiple models** — Claude comes in different versions (Haiku, Sonnet, Opus) optimized for different use cases — from fast simple tasks to deep complex reasoning.`,
        keyTakeaways: [
          'Claude is built by Anthropic with a focus on being helpful, harmless, and honest',
          'It uses Constitutional AI principles for safety',
          'Claude comes in multiple model sizes for different needs',
          'It can handle conversations, analysis, coding, writing, and more',
        ],
        xpReward: 50,
        icon: '🤖',
      },
      {
        id: 'l1-2',
        title: 'Your First Conversation',
        slug: 'first-conversation',
        description: 'Learn the basics of talking to Claude effectively.',
        level: 1,
        levelName: 'Claude Basics',
        order: 2,
        content: `Starting a conversation with Claude is simple, but there are patterns that lead to better results.

**The basics of a good conversation:**

• **Be direct** — State what you need clearly. Claude responds well to straightforward requests.

• **Provide context** — Tell Claude what you're working on and why. This helps it give more relevant answers.

• **Ask one thing at a time** — While Claude can handle complex requests, starting simple helps you understand its capabilities.

**Example of a good first interaction:**

\`\`\`
You: I'm a web developer learning React. Can you explain 
the useEffect hook in simple terms with a practical example?
\`\`\`

This works well because it tells Claude:
1. Who you are (web developer)
2. Your context (learning React)
3. What you want (explain useEffect)
4. How you want it (simple terms + example)

**Tips for beginners:**
- Don't overthink it — just start talking naturally
- If the response isn't what you wanted, clarify or rephrase
- Claude remembers your entire conversation, so you can build on previous messages`,
        keyTakeaways: [
          'Be direct and clear in your requests',
          'Provide relevant context about who you are and what you need',
          'Start with simple requests and build complexity',
          'Claude remembers conversation context',
        ],
        xpReward: 50,
        icon: '💬',
      },
    ],
    quizzes: [
      {
        id: 'q1-1',
        question: 'What company built Claude?',
        options: ['OpenAI', 'Anthropic', 'Google', 'Meta'],
        correctAnswer: 1,
        explanation: 'Claude is built by Anthropic, an AI safety company focused on building reliable, interpretable, and steerable AI systems.',
        xpReward: 25,
      },
      {
        id: 'q1-2',
        question: 'What is the best way to start a conversation with Claude?',
        options: [
          'Use complex technical jargon',
          'Be vague so Claude can interpret freely',
          'Be direct and provide relevant context',
          'Always start with "Hello, AI"',
        ],
        correctAnswer: 2,
        explanation: 'Being direct and providing context helps Claude understand exactly what you need and deliver more relevant responses.',
        xpReward: 25,
      },
      {
        id: 'q1-3',
        question: 'Which of these is NOT one of Claude\'s design principles?',
        options: ['Helpful', 'Harmless', 'Honest', 'Humorous'],
        correctAnswer: 3,
        explanation: 'Claude is designed to be Helpful, Harmless, and Honest (the three H\'s). While Claude can be witty, humor is not a core design principle.',
        xpReward: 25,
      },
    ],
    challenges: [
      {
        id: 'c1-1',
        title: 'Introduce Yourself',
        description: 'Write a prompt that introduces yourself and asks Claude for help with a specific task.',
        scenario: 'You\'re a student who needs help understanding a concept in your field of study.',
        hints: [
          'Include who you are',
          'Mention what you\'re studying',
          'Ask about a specific topic',
          'Specify the level of explanation you need',
        ],
        exampleGoodPrompt: 'I\'m a second-year biology student. Can you explain how CRISPR gene editing works in simple terms? I understand basic genetics but I\'m struggling with the mechanism of how Cas9 finds and cuts specific DNA sequences.',
        exampleBadPrompt: 'Explain CRISPR',
        evaluationCriteria: [
          'Includes personal context (who you are)',
          'Specifies the topic clearly',
          'Mentions your current level of understanding',
          'Asks for a specific type of explanation',
        ],
        xpReward: 75,
      },
    ],
  },
  {
    id: 2,
    name: 'Prompt Engineering',
    description: 'Master the art of writing effective prompts to get exactly what you need.',
    icon: '⚡',
    color: 'from-amber-500 to-orange-600',
    requiredXP: 200,
    lessons: [
      {
        id: 'l2-1',
        title: 'The Anatomy of a Great Prompt',
        slug: 'anatomy-of-prompt',
        description: 'Break down the key components that make prompts effective.',
        level: 2,
        levelName: 'Prompt Engineering',
        order: 1,
        content: `A well-crafted prompt has several components that work together to produce excellent results.

**The 5 Components of Effective Prompts:**

**1. Role/Persona** — Tell Claude who to be
\`\`\`
"Act as a senior software architect..."
"You are a patient math tutor..."
\`\`\`

**2. Task** — Clearly state what you want done
\`\`\`
"Review this code for security vulnerabilities..."
"Write a product description for..."
\`\`\`

**3. Context** — Provide background information
\`\`\`
"This is for a B2B SaaS landing page..."
"The audience is beginners with no coding experience..."
\`\`\`

**4. Format** — Specify how you want the output
\`\`\`
"Respond in a numbered list..."
"Use markdown with headers and code blocks..."
"Keep the response under 200 words..."
\`\`\`

**5. Constraints** — Set boundaries and rules
\`\`\`
"Don't use technical jargon..."
"Focus only on JavaScript, not TypeScript..."
"Include at least 3 examples..."
\`\`\`

**Combining these components produces much better results than simple requests.**`,
        keyTakeaways: [
          'Great prompts include Role, Task, Context, Format, and Constraints',
          'Assigning a role helps Claude adopt the right expertise and tone',
          'Specifying format saves you from reformatting responses',
          'Constraints prevent unwanted content and keep responses focused',
        ],
        xpReward: 75,
        icon: '🏗️',
      },
      {
        id: 'l2-2',
        title: 'Few-Shot and Chain-of-Thought',
        slug: 'few-shot-cot',
        description: 'Learn advanced prompting techniques used by experts.',
        level: 2,
        levelName: 'Prompt Engineering',
        order: 2,
        content: `Two powerful techniques can dramatically improve Claude's responses.

**Few-Shot Prompting**

Give Claude examples of what you want before asking for output:

\`\`\`
Convert these product names to URL-friendly slugs:

"Blue Mountain Coffee" → blue-mountain-coffee
"Earl Grey Tea (Premium)" → earl-grey-tea-premium
"Dark Chocolate 70%" → dark-chocolate-70-percent

Now convert: "Fresh Organic Milk (1L)"
\`\`\`

By showing examples, Claude learns the exact pattern you want.

**Chain-of-Thought (CoT)**

Ask Claude to think through problems step by step:

\`\`\`
Think through this step by step:
A store has 240 items. They sold 30% on Monday, 
then received a shipment of 50 items on Tuesday. 
How many items do they have now?
\`\`\`

The magic words: **"Think step by step"**, **"Walk me through your reasoning"**, **"Show your work"**

**Why these work:**
- Few-shot gives Claude a concrete pattern to follow
- CoT forces Claude to reason through problems instead of jumping to answers
- Both techniques reduce errors significantly`,
        keyTakeaways: [
          'Few-shot prompting gives examples to establish a pattern',
          'Chain-of-thought asks Claude to reason step by step',
          'Both techniques significantly reduce errors',
          '"Think step by step" is one of the most powerful prompt additions',
        ],
        xpReward: 75,
        icon: '🔗',
      },
    ],
    quizzes: [
      {
        id: 'q2-1',
        question: 'Which prompt component tells Claude what expertise to bring?',
        options: ['Task', 'Context', 'Role/Persona', 'Constraints'],
        correctAnswer: 2,
        explanation: 'The Role/Persona component tells Claude who to "be" — like a senior developer, patient tutor, or marketing expert — which shapes the expertise and tone of responses.',
        xpReward: 30,
      },
      {
        id: 'q2-2',
        question: 'What is "few-shot prompting"?',
        options: [
          'Keeping prompts very short',
          'Providing examples before asking for output',
          'Asking Claude to be concise',
          'Using bullet points in prompts',
        ],
        correctAnswer: 1,
        explanation: 'Few-shot prompting means giving Claude a few examples of the desired input→output pattern before asking it to generate similar output.',
        xpReward: 30,
      },
      {
        id: 'q2-3',
        question: 'What phrase activates chain-of-thought reasoning?',
        options: [
          '"Give me the answer"',
          '"Think step by step"',
          '"Be more creative"',
          '"Use your best judgment"',
        ],
        correctAnswer: 1,
        explanation: '"Think step by step" encourages Claude to show its reasoning process, which leads to more accurate and thorough answers.',
        xpReward: 30,
      },
    ],
    challenges: [
      {
        id: 'c2-1',
        title: 'Craft a Few-Shot Prompt',
        description: 'Write a prompt that uses few-shot examples to teach Claude a specific pattern.',
        scenario: 'You need Claude to convert informal customer reviews into professional testimonials.',
        hints: [
          'Provide 2-3 input/output example pairs',
          'Keep the pattern consistent',
          'Include a clear instruction before the examples',
          'End with the new input to convert',
        ],
        exampleGoodPrompt: 'Convert these casual customer reviews into polished testimonials:\n\nReview: "This app is sick! Saves me so much time every day."\nTestimonial: "This application has been a game-changer for my daily productivity. The time savings are remarkable."\n\nReview: "Pretty good stuff, helped me learn coding faster than I expected"\nTestimonial: "An excellent learning resource that accelerated my coding journey beyond my expectations."\n\nNow convert: "OMG this tool is amazing for managing my small business, totally worth every penny!!"',
        exampleBadPrompt: 'Make customer reviews sound better',
        evaluationCriteria: [
          'Includes at least 2 example pairs',
          'Examples show a clear pattern',
          'Ends with a new input to process',
          'Pattern is consistent across examples',
        ],
        xpReward: 100,
      },
    ],
  },
  {
    id: 3,
    name: 'Advanced Conversations',
    description: 'Learn to manage complex, multi-turn conversations and get the most from Claude.',
    icon: '🎯',
    color: 'from-violet-500 to-purple-600',
    requiredXP: 500,
    lessons: [
      {
        id: 'l3-1',
        title: 'System Prompts & Personas',
        slug: 'system-prompts',
        description: 'Use system prompts to set Claude\'s behavior for entire conversations.',
        level: 3,
        levelName: 'Advanced Conversations',
        order: 1,
        content: `System prompts are special instructions that set the tone and rules for an entire conversation with Claude.

**What is a System Prompt?**

A system prompt is a set of instructions given to Claude before the conversation begins. It defines Claude's personality, expertise, rules, and response format for the entire interaction.

**Anatomy of a Great System Prompt:**

\`\`\`
You are CodeReviewer, an expert senior developer who 
reviews code with a focus on:
- Security vulnerabilities
- Performance optimization
- Code readability
- Best practices

Rules:
- Always explain WHY something should be changed
- Rate severity: 🔴 Critical, 🟡 Warning, 🟢 Suggestion
- Include a corrected code example for each issue
- Be constructive, not critical
- If the code is good, say so!

Response format:
1. Overall assessment (1-2 sentences)
2. Issues found (if any)
3. Positive observations
4. Summary score: X/10
\`\`\`

**Why System Prompts Matter:**
- Consistency across the entire conversation
- Complex instructions don't need repeating
- Better, more specialized responses
- Can create custom "apps" within Claude`,
        keyTakeaways: [
          'System prompts set behavior for the entire conversation',
          'Include role, rules, format, and constraints in system prompts',
          'They ensure consistency without repeating instructions',
          'Great system prompts can create specialized assistants',
        ],
        xpReward: 100,
        icon: '🎭',
      },
      {
        id: 'l3-2',
        title: 'Iterative Refinement',
        slug: 'iterative-refinement',
        description: 'Learn how to guide Claude through multiple turns to perfect output.',
        level: 3,
        levelName: 'Advanced Conversations',
        order: 2,
        content: `The best results from Claude often come from iterative refinement — building on responses over multiple turns.

**The Refinement Loop:**

\`\`\`
Turn 1: Initial request → Get first draft
Turn 2: "This is good, but make it more concise"
Turn 3: "Perfect tone. Now add a call-to-action"
Turn 4: "Change the CTA to focus on free trial"
\`\`\`

**Effective Refinement Techniques:**

**1. Zoom In** — Focus on specific parts
\`\`\`
"The introduction is great. Can you make the 
second paragraph more data-driven?"
\`\`\`

**2. Redirect** — Change direction without starting over
\`\`\`
"Good approach, but let's target a more 
technical audience instead."
\`\`\`

**3. Expand** — Build on what works
\`\`\`
"I love the three main points. Can you add 
a real-world example for each?"
\`\`\`

**4. Constrain** — Tighten the output
\`\`\`
"This is too long. Condense to the top 5 
most important points."
\`\`\`

**Pro tip:** Reference specific parts of Claude's response. "The part where you mentioned X — expand on that" is much better than "Tell me more."`,
        keyTakeaways: [
          'The best results come from multiple refinement turns',
          'Use zoom in, redirect, expand, and constrain techniques',
          'Reference specific parts of responses for targeted edits',
          'You don\'t need to start over — build on what works',
        ],
        xpReward: 100,
        icon: '🔄',
      },
    ],
    quizzes: [
      {
        id: 'q3-1',
        question: 'What is the purpose of a system prompt?',
        options: [
          'To make Claude respond faster',
          'To set behavior rules for the entire conversation',
          'To increase Claude\'s creativity',
          'To limit Claude\'s knowledge',
        ],
        correctAnswer: 1,
        explanation: 'System prompts set the tone, rules, expertise, and response format for an entire conversation, ensuring consistent behavior.',
        xpReward: 35,
      },
      {
        id: 'q3-2',
        question: 'Which refinement technique focuses on a specific part of Claude\'s response?',
        options: ['Redirect', 'Expand', 'Zoom In', 'Constrain'],
        correctAnswer: 2,
        explanation: 'Zooming in means focusing on a specific part of the response to improve it, like "The second paragraph needs more data."',
        xpReward: 35,
      },
    ],
    challenges: [
      {
        id: 'c3-1',
        title: 'Design a System Prompt',
        description: 'Create a comprehensive system prompt for a specialized assistant.',
        scenario: 'Design a system prompt for a "Startup Pitch Coach" that helps founders refine their elevator pitches.',
        hints: [
          'Define the persona and expertise',
          'Set clear rules for feedback style',
          'Specify the response format',
          'Include evaluation criteria',
        ],
        exampleGoodPrompt: 'You are PitchCoach, an experienced startup mentor who has helped 100+ founders refine their pitches.\n\nYour role:\n- Evaluate elevator pitches for clarity, impact, and investor appeal\n- Provide constructive, actionable feedback\n- Score pitches on a 1-10 scale\n\nRules:\n- Always start with what works well\n- Identify the 3 most impactful improvements\n- Suggest a revised version of weak sections\n- Keep feedback encouraging but honest\n- Focus on: Problem clarity, Solution uniqueness, Market size, Team credibility\n\nResponse format:\n1. 🌟 Strengths (2-3 points)\n2. 🔧 Improvements (top 3, with rewrites)\n3. 📊 Score: X/10\n4. ✨ One-line summary of the pitch\'s potential',
        exampleBadPrompt: 'Help me with my startup pitch',
        evaluationCriteria: [
          'Defines a clear persona/role',
          'Includes specific rules or guidelines',
          'Specifies response format',
          'Has evaluation criteria or scoring',
        ],
        xpReward: 125,
      },
    ],
  },
  {
    id: 4,
    name: 'Power Techniques',
    description: 'Unlock advanced capabilities: structured output, code generation, and analysis.',
    icon: '🔮',
    color: 'from-rose-500 to-pink-600',
    requiredXP: 900,
    lessons: [
      {
        id: 'l4-1',
        title: 'Structured Output & JSON',
        slug: 'structured-output',
        description: 'Get Claude to output data in precise, machine-readable formats.',
        level: 4,
        levelName: 'Power Techniques',
        order: 1,
        content: `One of Claude's most powerful capabilities is generating structured data that can be used directly in applications.

**Getting JSON Output:**

\`\`\`
Analyze this product review and return a JSON object 
with the following structure:

{
  "sentiment": "positive" | "negative" | "mixed",
  "rating_guess": 1-5,
  "key_themes": ["theme1", "theme2"],
  "summary": "one sentence summary",
  "recommended_action": "string"
}

Review: "I love the design but the battery dies 
too fast. Great camera though!"
\`\`\`

**Pro Tips for Structured Output:**

1. **Show the exact schema** — Give Claude the structure to fill in
2. **Use TypeScript types** — Claude understands interfaces perfectly
3. **Specify data types** — "string", "number", "boolean", etc.
4. **Handle edge cases** — "If no data, use null"
5. **Validate with examples** — Show one complete filled example

**Real-World Applications:**
- Parse unstructured text into database entries
- Generate API response mockups
- Convert natural language to configuration files
- Create structured content for CMS systems like Cosmic`,
        keyTakeaways: [
          'Claude can output data in JSON and other structured formats',
          'Provide the exact schema/structure you want filled',
          'TypeScript interfaces work great as format specifications',
          'Structured output is perfect for building apps with Claude',
        ],
        xpReward: 100,
        icon: '📋',
      },
      {
        id: 'l4-2',
        title: 'Code Generation Mastery',
        slug: 'code-generation',
        description: 'Learn how to get production-quality code from Claude.',
        level: 4,
        levelName: 'Power Techniques',
        order: 2,
        content: `Claude is an excellent coding partner. Here's how to get the best code output.

**The Code Request Formula:**

\`\`\`
Language/Framework: [specific technology]
Task: [what the code should do]
Requirements: [specific technical requirements]
Style: [coding conventions to follow]
Include: [tests, types, error handling, etc.]
\`\`\`

**Example — Great Code Prompt:**

\`\`\`
Write a React custom hook called useDebounce that:
- Takes a value and delay in milliseconds
- Returns the debounced value
- Uses TypeScript with proper generics
- Includes cleanup on unmount
- Add JSDoc comments
- Include a usage example
\`\`\`

**Advanced Code Prompting:**

• **Request tests** — "Include Jest unit tests for edge cases"
• **Ask for types** — "Use strict TypeScript with no 'any' types"
• **Specify patterns** — "Use the repository pattern for data access"
• **Request error handling** — "Handle all possible error states"
• **Ask for docs** — "Add JSDoc comments and a README section"

**Working with existing code:**
Paste your code and ask Claude to:
- Refactor for better readability
- Add TypeScript types
- Find and fix bugs
- Optimize performance
- Add error handling`,
        keyTakeaways: [
          'Be specific about language, framework, and requirements',
          'Request tests, types, error handling, and documentation',
          'Claude can refactor, debug, and optimize existing code',
          'Paste your code for Claude to review and improve',
        ],
        xpReward: 100,
        icon: '💻',
      },
    ],
    quizzes: [
      {
        id: 'q4-1',
        question: 'What is the best way to get JSON output from Claude?',
        options: [
          'Just ask "give me JSON"',
          'Provide the exact schema/structure to fill in',
          'Claude always outputs JSON by default',
          'You can\'t get JSON from Claude',
        ],
        correctAnswer: 1,
        explanation: 'Providing the exact schema or structure you want Claude to fill in gives you precise, consistent JSON output every time.',
        xpReward: 40,
      },
      {
        id: 'q4-2',
        question: 'When asking Claude to generate code, what should you include?',
        options: [
          'Just the task description',
          'Language, task, requirements, style, and what to include',
          'Only the programming language',
          'A screenshot of what you want',
        ],
        correctAnswer: 1,
        explanation: 'The most effective code prompts include the language/framework, task description, specific requirements, coding style preferences, and what extras to include (tests, types, docs).',
        xpReward: 40,
      },
    ],
    challenges: [
      {
        id: 'c4-1',
        title: 'Structured Data Challenge',
        description: 'Write a prompt that gets Claude to output structured JSON data.',
        scenario: 'You need to extract structured data from a restaurant menu description into a format suitable for a food delivery app.',
        hints: [
          'Define the exact JSON schema',
          'Specify data types for each field',
          'Handle edge cases (e.g., missing allergen info)',
          'Include a sample menu description to parse',
        ],
        exampleGoodPrompt: 'Parse this restaurant menu item into the following JSON structure:\n\n{\n  "name": "string",\n  "description": "string",\n  "price": number,\n  "currency": "string",\n  "category": "appetizer" | "main" | "dessert" | "drink",\n  "dietary_tags": ["vegetarian", "vegan", "gluten-free", etc.],\n  "allergens": ["nuts", "dairy", "gluten", etc.],\n  "spice_level": 0-5,\n  "estimated_prep_time_minutes": number\n}\n\nIf allergen info is not mentioned, use an empty array.\nIf spice level is not clear, estimate based on the description.\n\nMenu item: "Spicy Thai Basil Chicken (Pad Krapow Gai) - $14.99 - Wok-fried minced chicken with holy basil, Thai chilies, garlic, and a fried egg on top. Served with jasmine rice. Contains: eggs, soy, fish sauce."',
        exampleBadPrompt: 'Turn this menu into JSON',
        evaluationCriteria: [
          'Defines a complete JSON schema',
          'Specifies data types for each field',
          'Handles edge cases explicitly',
          'Includes sample data to parse',
        ],
        xpReward: 150,
      },
    ],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Answer all quizzes correctly in a level',
    icon: '🧠',
  },
  {
    id: 'prompt-crafter',
    title: 'Prompt Crafter',
    description: 'Complete your first challenge',
    icon: '✍️',
  },
  {
    id: 'level-up',
    title: 'Level Up!',
    description: 'Complete an entire level',
    icon: '⭐',
  },
  {
    id: 'xp-100',
    title: 'Century Club',
    description: 'Earn 100 XP',
    icon: '💯',
  },
  {
    id: 'xp-500',
    title: 'Half K',
    description: 'Earn 500 XP',
    icon: '🔥',
  },
  {
    id: 'xp-1000',
    title: 'Grand Master',
    description: 'Earn 1000 XP',
    icon: '👑',
  },
  {
    id: 'all-lessons',
    title: 'Scholar',
    description: 'Complete all lessons',
    icon: '📚',
  },
  {
    id: 'all-challenges',
    title: 'Challenger',
    description: 'Complete all challenges',
    icon: '🏆',
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Complete everything in the game',
    icon: '💎',
  },
  {
    id: 'speed-learner',
    title: 'Speed Learner',
    description: 'Complete 3 lessons',
    icon: '⚡',
  },
  {
    id: 'dedicated',
    title: 'Dedicated',
    description: 'Complete 5 lessons',
    icon: '🎓',
  },
];

export function getCurrentLevelData(levelId: number): GameLevel | undefined {
  return GAME_LEVELS.find(l => l.id === levelId);
}

export function getAvailableLevels(totalXP: number): number[] {
  return GAME_LEVELS
    .filter(level => totalXP >= level.requiredXP)
    .map(level => level.id);
}

interface AchievementCheckState {
  totalXP: number;
  completedLessons: string[];
  completedQuizzes: string[];
  completedChallenges: string[];
  currentLevel: number;
  unlockedAchievements: string[];
}

export function checkAchievements(state: AchievementCheckState): string[] {
  const newAchievements: string[] = [];

  const totalLessons = GAME_LEVELS.reduce((acc, l) => acc + l.lessons.length, 0);
  const totalChallenges = GAME_LEVELS.reduce((acc, l) => acc + l.challenges.length, 0);
  const totalQuizzes = GAME_LEVELS.reduce((acc, l) => acc + l.quizzes.length, 0);

  // First lesson
  if (state.completedLessons.length >= 1 && !state.unlockedAchievements.includes('first-lesson')) {
    newAchievements.push('first-lesson');
  }

  // Speed learner - 3 lessons
  if (state.completedLessons.length >= 3 && !state.unlockedAchievements.includes('speed-learner')) {
    newAchievements.push('speed-learner');
  }

  // Dedicated - 5 lessons
  if (state.completedLessons.length >= 5 && !state.unlockedAchievements.includes('dedicated')) {
    newAchievements.push('dedicated');
  }

  // Quiz master - all quizzes in any level
  for (const level of GAME_LEVELS) {
    const allQuizzesDone = level.quizzes.every(q => state.completedQuizzes.includes(q.id));
    if (allQuizzesDone && level.quizzes.length > 0 && !state.unlockedAchievements.includes('quiz-master')) {
      newAchievements.push('quiz-master');
      break;
    }
  }

  // Prompt crafter - first challenge
  if (state.completedChallenges.length >= 1 && !state.unlockedAchievements.includes('prompt-crafter')) {
    newAchievements.push('prompt-crafter');
  }

  // Level up - complete all content in a level
  for (const level of GAME_LEVELS) {
    const allLessons = level.lessons.every(l => state.completedLessons.includes(l.id));
    const allQuizzes = level.quizzes.every(q => state.completedQuizzes.includes(q.id));
    const allChallenges = level.challenges.every(c => state.completedChallenges.includes(c.id));
    if (allLessons && allQuizzes && allChallenges && !state.unlockedAchievements.includes('level-up')) {
      newAchievements.push('level-up');
      break;
    }
  }

  // XP milestones
  if (state.totalXP >= 100 && !state.unlockedAchievements.includes('xp-100')) {
    newAchievements.push('xp-100');
  }
  if (state.totalXP >= 500 && !state.unlockedAchievements.includes('xp-500')) {
    newAchievements.push('xp-500');
  }
  if (state.totalXP >= 1000 && !state.unlockedAchievements.includes('xp-1000')) {
    newAchievements.push('xp-1000');
  }

  // All lessons
  if (state.completedLessons.length >= totalLessons && !state.unlockedAchievements.includes('all-lessons')) {
    newAchievements.push('all-lessons');
  }

  // All challenges
  if (state.completedChallenges.length >= totalChallenges && !state.unlockedAchievements.includes('all-challenges')) {
    newAchievements.push('all-challenges');
  }

  // Perfectionist - everything
  if (
    state.completedLessons.length >= totalLessons &&
    state.completedQuizzes.length >= totalQuizzes &&
    state.completedChallenges.length >= totalChallenges &&
    !state.unlockedAchievements.includes('perfectionist')
  ) {
    newAchievements.push('perfectionist');
  }

  return newAchievements;
}