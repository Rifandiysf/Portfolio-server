import 'dotenv/config';
import * as bcrypt from 'bcryptjs';
import {
  PostStatus,
  PrismaClient,
  Project,
  ProjectStatus,
  Role,
  TechCategory,
  Technology,
  User,
} from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin: User = await prisma.user.upsert({
    where: { email: 'admin@portfolio.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@portfolio.com',
      password: hashedPassword,
      role: Role.ADMIN,
      provider: 'local',
      bio: 'Portfolio owner and admin.',
    },
  });
  console.log(`✅ Admin user created: ${admin.email}`);

  // Create technologies
  const techs: Technology[] = await Promise.all([
    prisma.technology.upsert({
      where: { id: 'tech-nextjs' },
      update: {},
      create: {
        id: 'tech-nextjs',
        name: 'Next.js',
        category: TechCategory.FRAMEWORK,
        iconUrl: 'https://cdn.simpleicons.org/nextdotjs',
      },
    }),
    prisma.technology.upsert({
      where: { id: 'tech-nestjs' },
      update: {},
      create: {
        id: 'tech-nestjs',
        name: 'NestJS',
        category: TechCategory.FRAMEWORK,
        iconUrl: 'https://cdn.simpleicons.org/nestjs',
      },
    }),
    prisma.technology.upsert({
      where: { id: 'tech-typescript' },
      update: {},
      create: {
        id: 'tech-typescript',
        name: 'TypeScript',
        category: TechCategory.LANGUAGE,
        iconUrl: 'https://cdn.simpleicons.org/typescript',
      },
    }),
    prisma.technology.upsert({
      where: { id: 'tech-postgresql' },
      update: {},
      create: {
        id: 'tech-postgresql',
        name: 'PostgreSQL',
        category: TechCategory.DATABASE,
        iconUrl: 'https://cdn.simpleicons.org/postgresql',
      },
    }),
    prisma.technology.upsert({
      where: { id: 'tech-prisma' },
      update: {},
      create: {
        id: 'tech-prisma',
        name: 'Prisma',
        category: TechCategory.TOOL,
        iconUrl: 'https://cdn.simpleicons.org/prisma',
      },
    }),
  ]);
  console.log(`✅ ${techs.length} technologies created`);

  // Create sample project
  const project: Project = await prisma.project.upsert({
    where: { slug: 'portfolio-website' },
    update: {},
    create: {
      title: 'Portfolio Website',
      slug: 'portfolio-website',
      description:
        'A full-stack portfolio website built with Next.js and NestJS, featuring a CMS-like admin panel to manage content without touching code.',
      status: ProjectStatus.PUBLISHED,
      demoUrl: 'https://yourportfolio.com',
      repoUrl: 'https://github.com/yourusername/portfolio',
      technologies: {
        create: [
          { technologyId: 'tech-nextjs' },
          { technologyId: 'tech-nestjs' },
          { technologyId: 'tech-typescript' },
          { technologyId: 'tech-postgresql' },
          { technologyId: 'tech-prisma' },
        ],
      },
    },
  });
  console.log(`✅ Sample project created: ${project.title}`);

  // Create tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'tutorial' },
      update: {},
      create: { name: 'Tutorial', slug: 'tutorial' },
    }),
    prisma.tag.upsert({
      where: { slug: 'nestjs' },
      update: {},
      create: { name: 'NestJS', slug: 'nestjs' },
    }),
    prisma.tag.upsert({
      where: { slug: 'typescript' },
      update: {},
      create: { name: 'TypeScript', slug: 'typescript' },
    }),
  ]);
  console.log(`✅ ${tags.length} tags created`);

  // Create sample blog post
  const post = await prisma.blogPost.upsert({
    where: { slug: 'building-portfolio-with-nestjs' },
    update: {},
    create: {
      title: 'Building a Portfolio Backend with NestJS',
      slug: 'building-portfolio-with-nestjs',
      content: `# Building a Portfolio Backend with NestJS\n\nIn this post, I'll walk you through how I built a full-stack portfolio backend using NestJS, Prisma, and PostgreSQL...\n\n## Why NestJS?\n\nNestJS provides a structured, opinionated framework that makes building scalable APIs straightforward. With built-in support for TypeScript, dependency injection, and modular architecture, it's a perfect choice for a portfolio backend.\n\n## Getting Started\n\nFirst, install the NestJS CLI and create a new project...`,
      status: PostStatus.PUBLISHED,
      publishedAt: new Date(),
      authorId: admin.id,
      tags: {
        create: [
          { tagId: tags[0].id },
          { tagId: tags[1].id },
          { tagId: tags[2].id },
        ],
      },
    },
  });
  console.log(`✅ Sample blog post created: ${post.title}`);

  console.log('\n🎉 Seeding complete!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Admin credentials:');
  console.log('  Email:    admin@portfolio.com');
  console.log('  Password: admin123');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
