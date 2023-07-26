<script lang="ts">
	import { getDoc } from '$lib/api/document';
	import type { TFine } from '$lib/api/fines';
	import Calendar from '$lib/icons/Calendar.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let fines: TFine[] = [];
	let loading = true;
	let seconds = 0;
	let requestId: string;

	onMount(async () => {
		const doc = await getDoc(Telegram.WebApp.initData);
		if (doc == null) {
			await goto('/docs', { replaceState: true });
			return;
		}
		const res = await fetch('/api/fines?initData=' + encodeURIComponent(Telegram.WebApp.initData));
		if (!res.ok) {
			const err = await res.json();
			// Data is an error message. Either data not ready or initData not valid
			alert('Error: ' + err.message);
			loading = false;
			return;
		}
		({ requestId } = await res.json());

		const interval = setInterval(async () => {
			seconds++;
			const res = await fetch('/api/fines/' + requestId);
			if (res.ok) {
				clearInterval(interval);
				const data: { fines: TFine[] } = await res.json();
				fines = data.fines;
				loading = false;
			} else if (res.status === 503) {
				// Still loading, do nothing
			} else {
				clearInterval(interval);
				loading = false;
				const err: Error = await res.json();
				alert('An error occurred: ' + err.message);
			}
		}, 1000);
	});
</script>

<svelte:head>
	<title>Fines</title>
</svelte:head>

<div class="fines">
	<div class="header">
		<h1 class="fines__title">Fines</h1>
		<a class="link" href="/docs">Edit docs</a>
	</div>
	{#if loading}
		<p>Waiting for the data to load...</p>
		<p>{seconds} seconds have passed</p>
		<p>If the data doesn't load within 1-2 minutes, try to refresh the page.</p>
	{:else}
		{#each fines.map((fine) => fine) as { amountToPay, billDate, billFor, supplierBillID }}
			<a class="fine" href="/fines/{supplierBillID}?requestId={requestId}">
				<div class="fine__title">{billFor}</div>
				<div class="fine__date-line">
					<Calendar />
					<span class="fine__date">{billDate.split('T')[0]}</span>
				</div>
				<div class="fine__money">
					{Intl.NumberFormat('ru', { style: 'currency', currency: 'RUB' }).format(
						amountToPay / 100,
					)}
				</div>
			</a>
		{:else}
			<p>You have no fines! Congratulations on being a law-abiding citizen ;)</p>
		{/each}
	{/if}
</div>

<style>
	.fines {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;
	}
	.header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}
	.link {
		text-decoration: none;
		color: white;
		background-color: #f20000;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.25);
		padding: 5px 10px;
		border-radius: 10px;
		cursor: pointer;
		border: none;
	}
	.link:hover {
		box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.25);
	}
	.link:active {
		box-shadow: inset 2px 3px rgba(0, 0, 0, 0.25);
	}

	.fines__title {
		align-self: flex-start;
		margin-top: 0;
		margin-bottom: 0;

		font-weight: 600;
		font-size: 26px;
		line-height: 31px;

		color: #222222;
	}

	.fine {
		text-decoration: none;
		padding: 8px 12px;

		gap: 8px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-radius: 10px;
		margin-bottom: 10px;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
		background: #ffffff;
	}

	.fine__title {
		margin: 0;
		font-weight: 600;
		font-size: 16px;
		line-height: 18px;
		color: #444444;
	}

	.fine__date-line {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.fine__date {
		font-weight: 400;
		font-size: 14px;
		line-height: 17px;

		color: #888888;
	}

	.fine__money {
		font-weight: 600;
		font-size: 14px;
		line-height: 17px;
		color: #f20000;
	}
</style>
