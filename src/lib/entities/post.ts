import type { User } from './user';

export type Post = {
	id: number;
	heading: string;
	subheading: string;
	content: string;
	authorId: number;
	published: boolean;
	tags: Tag[];
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
