<script lang="ts">
	import { getDoc } from '$lib/api/document';
	import type { TFines } from '$lib/api/fines';
	import Calendar from '$lib/icons/Calendar.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let fines: TFines = { chargeResponseList: [] };

	onMount(async () => {
		const doc = await getDoc(Telegram.WebApp.initData);
		if (doc == null) {
			await goto('/docs', { replaceState: true });
			return;
		}
		const res = await fetch('/api/fines', {
			method: 'POST',
			body: JSON.stringify({
				initData: Telegram.WebApp.initData,
			}),
			headers: {
				'content-type': 'application/json',
			},
		});
		const data = await res.json();
		if (!res.ok) {
			// Data is an error message. Probably something with validating
			alert('Error: ' + data.message);
			return;
		}
		fines = data.fines;
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
	{#each fines.chargeResponseList.map((fine) => fine) as { amountToPay, billDate, billFor }}
		<a class="fine" href="/fines/{billFor}">
			<div class="fine__title">{billFor}</div>
			<div class="fine__date-line">
				<Calendar /><span class="fine__date">{billDate.split('T')[0]}</span>
			</div>
			<div class="fine__money">
				{Intl.NumberFormat('ru', { style: 'currency', currency: 'RUB' }).format(amountToPay)}
			</div>
		</a>
	{/each}
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
		background-color: #e30611;
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
		color: #e30611;
	}
</style>
