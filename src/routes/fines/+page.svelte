<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { user } = data;
</script>

<h1>Fines</h1>
<span>Email: {user.email}</span>
