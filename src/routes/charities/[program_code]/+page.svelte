<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: program = data.charityProgram;
</script>

<p>Organization: {program.fundName}</p>
<p>Name: {program.serviceName}</p>
<p>Description: {program.serviceDescription}</p>
