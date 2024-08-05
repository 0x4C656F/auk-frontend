import type { Pin } from './pin';
import type { Program } from './post';

export type User = {
	id: number;
	email: string;
	name: string;
	fullname: string;
	followerIds: number[];
	role: Role;
	program: Program;
	bio?: string;
	avatar?: string;
	pins: Pin[];
	createdAt: Date;
	updatedAt: Date;
};

export enum Role {
	ADMIN = 'ADMIN',
	STUDENT = 'STUDENT',
	TEACHER = 'TEACHER'
}
