<script lang="ts">
	import type { PageData } from './$types';
	import CopyIcon from '$lib/icons/Copy.svelte';
	import { FUNDS_ASSETS_BASE } from '$lib/api/charity';

	export let data: PageData;

	const copyCharityUrl = (text: string) => {
		navigator.clipboard.writeText(text);
	};
</script>

<svelte:head>
	<title>Charities</title>
</svelte:head>

<div class="charities">
	<h1 class="charities__title">Charities</h1>
	{#each data.charities.flatMap((c) => c.programs) as { serviceCode, fundLogo, fundName, serviceDescription, fundUrl }}
		<a class="program" id={serviceCode} href="/charities/{serviceCode}">
			<div class="program__info">
				<img
					class="program__logo"
					src={FUNDS_ASSETS_BASE + encodeURIComponent(fundLogo)}
					alt={fundName}
				/>
				<h2 class="program__title">{fundName}</h2>

				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="program__copy" on:click={() => copyCharityUrl(fundUrl)}>
					<CopyIcon />
				</div>
			</div>
			<p class="program__description">{serviceDescription}</p>
		</a>
	{/each}
</div>

<style>
	.charities {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;
	}

	.charities__title {
		align-self: flex-start;
		margin-top: 0;

		font-weight: 600;
		font-size: 26px;
		line-height: 31px;

		color: #222222;
	}

	.program {
		background-color: #f6f6f6;
		text-decoration: none;
		padding: 8px 12px;

		gap: 8px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-radius: 10px;
		margin-bottom: 10px;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
	}

	.program__logo {
		width: 30px;
		height: 30px;
		border-radius: 100%;
	}

	.program__copy {
		width: 20px;
		height: 20px;
	}

	.program__info {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.program__title {
		margin: 0;
		font-weight: 600;
		font-size: 16px;
		line-height: 18px;
		color: #444444;
	}

	.program__description {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		line-height: 16px;
		color: #888888;

		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
