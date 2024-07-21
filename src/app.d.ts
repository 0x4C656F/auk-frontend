// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import 'unplugin-icons/types/svelte';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Session {
			token: string;
		}

		// used to thread information between plugins
		interface Stuff {}

		// used to pass one-off configuration for a request
		interface Metadata {
			doTheThing?: boolean | null;
		}
	}
	declare namespace svelteHTML {
		interface HTMLAttributes<T> {
			'on:click_outside'?: CompositionEventHandler<T>;
		}
	}
}

// declare namespace App {
// 	// user-specific information passed to each query
// }
