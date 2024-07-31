import type { Pin } from './pin';

export type User = {
	id: number;
	email: string;
	name: string;
	fullname: string;
	followerIds: number[];
	role: Role;
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
