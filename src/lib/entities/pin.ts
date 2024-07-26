export type Pin = {
	id: number;
	postId: number;
	userId: number;
	pinnedAt: Date;
	unpinAt: Date | null;
};
