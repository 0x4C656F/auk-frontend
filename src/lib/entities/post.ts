import type { Pin } from './pin';
import type { User } from './user';

export type Post = {
	id: number;
	heading: string;
	subheading: string;
	content: string;
	authorId: number;
	published: boolean;
	relatedPrograms: Program[];
	tags: Tag[];
	pin?: Pin;
	createdAt: Date;
	updatedAt: Date;
};

export type PostWithAuthor = Post & {
	author: User;
};

export enum Tag {
	Technology = 'Technology',
	Event = 'Event',
	Lifestyle = 'Lifestyle',
	Announcement = 'Announcement',
	Research = 'Research',
	Achievement = 'Achievement',
	Career = 'Career',
	Internship = 'Internship',
	News = 'News',
	StudentLife = 'StudentLife',
	Discussion = 'Discussion',
	Question = 'Question'
}

export const tags: Tag[] = [
	Tag.Technology,
	Tag.Event,
	Tag.Lifestyle,
	Tag.Announcement,
	Tag.Research,
	Tag.Achievement,
	Tag.Career,
	Tag.Internship,
	Tag.News,
	Tag.StudentLife,
	Tag.Discussion,
	Tag.Question
];

// Enum definition
export enum Program {
	BGF = 'BGF',
	BBA = 'BBA',
	BGM = 'BGM',
	BDS = 'BDS',
	BMS = 'BMS',
	BSE = 'BSE',
	MGM = 'MGM',
	MSE = 'MSE',
	MTL = 'MTL'
}

// Object mapping enum values to human-readable strings
export const ProgramDisplayNames: Record<Program, string> = {
	[Program.BGF]: 'Bachelor of Global Finance',
	[Program.BBA]: 'Bachelor of Business Administration',
	[Program.BGM]: 'Bachelor of Global Management',
	[Program.BDS]: 'Bachelor of Data Science',
	[Program.BMS]: 'Bachelor of Marketing Science',
	[Program.BSE]: 'Bachelor of Software Engineering',
	[Program.MGM]: 'Master of Global Management',
	[Program.MSE]: 'Master of Software Engineering',
	[Program.MTL]: 'Master of Technology Leadership and AI'
};

// Function to get the display name from enum
export function enumToString(program: Program): string {
	return ProgramDisplayNames[program] || 'Unknown Program';
}

// List of all programs
export const programs: Program[] = Object.values(Program);

// Generator function to iterate over enum
export function* programIterator(): IterableIterator<Program> {
	for (const program of programs) {
		yield program;
	}
}
