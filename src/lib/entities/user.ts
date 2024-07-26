import type { Pin } from './pin';

export type User = {
	id: number;
	email: string;
	name: string;
	fullname: string;
	role: Role;
	pins: Pin[];
	createdAt: Date;
	updatedAt: Date;
};

export enum Role {
	ADMIN = 'ADMIN',
	STUDENT = 'STUDENT',
	TEACHER = 'TEACHER'
}
