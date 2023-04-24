<script lang="ts">
	import { page } from '$app/stores';
	import { getAccessTokenUrl } from '$lib/api/mts';

	function goToLogin() {
		const redirectUrl = $page.url.searchParams.get('redirectUrl') ?? window.location.origin;
		const loginUrl = getAccessTokenUrl(redirectUrl);
		window.location.href = loginUrl;
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<p>
	You're not logged in. To access this page, please click here to login:
	<button on:click={goToLogin}>Login</button>
</p>

<style>
	p {
		font-family: system-ui;
	}
</style>
