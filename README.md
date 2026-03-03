# Claude Skills Academy 🎓

![Claude Skills Academy](https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=300&fit=crop&auto=format,compress)

An interactive, gamified learning platform that teaches users how to effectively use Claude AI. Progress through 5 skill levels, complete quizzes and prompt challenges, earn XP and achievements, and then put your new skills to the test with Cosmic!

## Features

- 🎮 **5 Progressive Learning Levels** — Basics → Prompting → Conversations → Advanced → Expert
- 📝 **Interactive Quizzes** — Multiple-choice knowledge checks after each lesson
- ✍️ **Prompt Challenges** — Hands-on practice crafting effective Claude prompts
- ⭐ **XP & Achievement System** — Earn points, level up, unlock badges
- 📊 **Visual Progress Dashboard** — Track your journey with animated progress bars
- 🏆 **Level Completion Celebrations** — Animated celebrations when you master a level
- 🚀 **Cosmic CTA Finale** — Graduate and build AI-powered apps with Cosmic CMS
- 📱 **Fully Responsive** — Works beautifully on desktop, tablet, and mobile
- 🌙 **Dark Theme** — Sleek, modern dark interface with purple/blue gradients

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69a6f5402f592b85452c80d3&clone_repository=69a6f7b42f592b85452c8129)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided — app built from existing content structure

### Code Generation Prompt

> Using the Anthropic Guide to using Claude, I want to create a game that teaches users how to use Claude and then when they finish have a call to action to sign up for Cosmic and put their Claude skills to the test.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI component library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe development
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [Framer Motion](https://www.framer.com/motion/) — Animation library

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) runtime installed
- A [Cosmic](https://www.cosmicjs.com) account with a bucket

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd claude-skills-academy

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Start the development server
bun dev
```

## Cosmic SDK Examples

```typescript
import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Fetch all lessons
const { objects: lessons } = await cosmic.objects
  .find({ type: 'lessons' })
  .props(['title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single lesson
const { object: lesson } = await cosmic.objects
  .findOne({ type: 'lessons', slug: 'introduction-to-claude' })
  .props(['title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses Cosmic CMS to manage:
- **Lessons** — Learning content for each level
- **Quizzes** — Quiz questions and answers
- **Achievements** — Badge definitions and unlock criteria
- **Game Settings** — XP values, level thresholds, and CTA content

The game includes built-in content that works out of the box, with the ability to extend via Cosmic.

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy!

### Netlify
1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables and deploy

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com) and [Next.js](https://nextjs.org)
<!-- README_END -->