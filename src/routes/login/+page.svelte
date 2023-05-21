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

<div>
	<p>You're not logged in. To access this page, please click on the button below</p>
	<button class="button" on:click={goToLogin}>Login</button>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;

		gap: 20px;
	}

	p {
		font-family: system-ui;
	}

	.button:hover {
		box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.25);
	}

	.button:active {
		box-shadow: inset 2px 3px rgba(0, 0, 0, 0.25);
	}

	.button {
		margin-top: auto;
		width: 100%;
		font-size: 18px;
		font-weight: 600;
		margin-top: 20px;

		color: white;
		background-color: #e30611;
		padding: 10px 0;
		border-radius: 10px;
		text-transform: uppercase;
		cursor: pointer;
		transition: all 300ms ease-in-out;
		border: none;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.25);
	}
</style>
