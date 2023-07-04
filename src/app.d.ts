// See https://kit.svelte.dev/docs/types#app

import type { Sql } from 'postgres';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			sql: Sql;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
