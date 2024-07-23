import type { User } from './user';

export type Post = {
	id: number;
	heading: string;
	subheading: string;
	content: string;
	authorId: number;
	published: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export type PostWithAuthor = Post & {
	author: User;
};
