<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { user } = data;
</script>

<svelte:head>
	<title>Fines</title>
</svelte:head>

<h1>Fines</h1>
<span>Email: {user.email}</span>
