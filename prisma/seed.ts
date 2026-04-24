import 'dotenv/config';
import * as bcrypt from 'bcryptjs';
import { PostStatus, PrismaClient, Role, User } from './generated/client';
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

  // ─── Services ─────────────────────────────────────────────────────────────
  await prisma.service.deleteMany();
  await prisma.service.createMany({
    data: [
      {
        num: '01',
        name: 'Frontend Development',
        desc: 'Building clean, responsive interfaces with Next.js, React, and Tailwind CSS — turning designs into working, well-structured code.',
        order: 0,
      },
      {
        num: '02',
        name: 'UI/UX Design',
        desc: 'Designing simple, user-friendly interfaces in Figma — focused on clarity, usability, and a consistent visual language.',
        order: 1,
      },
      {
        num: '03',
        name: 'Web App Development',
        desc: 'Building functional web applications from scratch — school tools, dashboards, and internal systems that solve real problems.',
        order: 2,
      },
      {
        num: '04',
        name: 'Open to Collaborate',
        desc: 'Looking for opportunities to grow — internships, freelance projects, or junior roles where I can contribute and keep learning.',
        order: 3,
      },
    ],
  });
  console.log('✅ Services created');

  // Create technologies
  await prisma.technology.deleteMany();
  const techs = await prisma.technology.createManyAndReturn({
    data: [
      { name: 'TypeScript', category: 'LANGUAGE', order: 0 },
      { name: 'JavaScript', category: 'LANGUAGE', order: 1 },
      { name: 'Next.js', category: 'FRAMEWORK', order: 2 },
      { name: 'React', category: 'FRAMEWORK', order: 3 },
      { name: 'Tailwind CSS', category: 'FRAMEWORK', order: 4 },
      { name: 'Figma', category: 'DESIGN', order: 5 },
      { name: 'Shadcn', category: 'FRAMEWORK', order: 6 },
    ],
  });
  console.log('✅ Technologies created');

  const techMap = Object.fromEntries(techs.map((t) => [t.name, t.id]));

  //Create sample experience
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: [
      {
        role: 'Junior Frontend Developer (Internship)',
        companyName: 'PT. Walden Global Service',
        date: 'July 2025 — November 2025',
        year: '2025',
        description:
          'Frontend Developer intern for 5 months through a school internship program, developing a Leave Management System with Next.js, TypeScript, and Tailwind CSS. Focused on building responsive UIs, optimizing component structures, and enhancing usability, application performance, and the efficiency of leave request workflows across devices.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn'],
        order: 0,
      },
      {
        role: 'Frontend Developer & UI/UX Designer (School Project)',
        companyName: 'Sibening — School BK System',
        date: '2025',
        year: '2025',
        description:
          "Designed and built a full guidance & counseling web app for my school's BK department. Included student attendance tracking, late & problem student records, and real-time chat between students and teachers.",
        techStack: ['React.js', 'JavaScript', 'Tailwind CSS'],
        order: 1,
      },
      {
        role: 'Software Development Student',
        companyName: 'SMK — Vocational High School',
        date: '2023 – 2026',
        year: '2023',
        description:
          'Completed a 3-year vocational program in Software Development. Gained hands-on experience in web development, UI design, databases, and software engineering fundamentals alongside real project work.',
        techStack: [],
        order: 2,
      },
    ],
  });
  console.log('✅ Experiences created');

  // ─── Projects ─────────────────────────────────────────────────────────────
  await prisma.project.deleteMany();
  const sibening = await prisma.project.create({
    data: {
      title: 'Sibening',
      slug: 'sibening',
      description:
        'Electronic guidance & counseling system for high school BK teachers.',
      objective:
        'Student guidance and counseling (BK) in schools has long relied on manual, paper-based processes — making it difficult for teachers to monitor attendance patterns, track behavioral issues, and communicate with students in a timely manner.\n\nThe challenge was clear: BK teachers needed a centralized digital platform that could replace scattered spreadsheets and in-person visits with a unified system, accessible from any device, without adding complexity to their daily workflow.',
      solution:
        'Sibening (Sistem Bimbingan Elektronik dan Konseling) was built as a full-featured web application tailored specifically for school BK departments. The system brings together four core modules — attendance management, late arrival tracking, problem student records, and real-time consultation chat — all under one roof.\n\nThe real-time chat feature connects students directly with their BK teacher, enabling immediate counseling without scheduling constraints.',
      thumbnailUrl: '/images/sibening.png',
      images: [
        '/images/sibening1.png',
        '/images/sibening2.png',
        '/images/sibening3.png',
      ],
      statusTags: ['Web Development', 'School App'],
      year: 2025,
      status: 'PUBLISHED',
      features: [
        'Student attendance tracking',
        'Late student monitoring',
        'Problem student records',
        'Real-time counseling chat',
        'Teacher & student dashboards',
      ],
      order: 0,
      technologies: {
        create: [
          { technologyId: techMap['React'] },
          { technologyId: techMap['JavaScript'] },
          { technologyId: techMap['Tailwind CSS'] },
        ],
      },
    },
  });

  const leaveApp = await prisma.project.create({
    data: {
      title: 'Company Leave',
      slug: 'company-leave',
      description:
        'Leave management system built during a 5-month internship at PT. Walden Global Services.',
      objective:
        'Managing employee leave manually is a common pain point for HR teams — tracking quotas, handling requests, and maintaining historical records across dozens or hundreds of employees is error-prone and time-consuming.\n\nDuring my 5-month frontend internship at PT. Walden Global Services, the team needed a dedicated leave management application.',
      solution:
        'As the frontend developer on this project, I built a dual-interface application — one for employees and one for HR admins. Employees can submit leave requests, track their remaining quota across multiple years, and view their full leave history in a clean dashboard.',
      thumbnailUrl: '/images/leave-app.png',
      images: [
        '/images/leave-app1.png',
        '/images/leave-app2.png',
        '/images/leave-app3.png',
      ],
      statusTags: ['Internship', 'Web Development'],
      year: 2025,
      status: 'PUBLISHED',
      features: [
        'Leave request submission',
        'Leave history per employee',
        'Remaining leave quota tracker',
        'Admin leave overview dashboard',
        'Multi-year leave balance support',
        'HR approval workflow',
      ],
      order: 1,
      technologies: {
        create: [
          { technologyId: techMap['Next.js'] },
          { technologyId: techMap['TypeScript'] },
          { technologyId: techMap['Tailwind CSS'] },
          { technologyId: techMap['Shadcn'] },
        ],
      },
    },
  });

  console.log('✅ Projects created:', sibening.slug, leaveApp.slug);

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
