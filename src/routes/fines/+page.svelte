<script lang="ts">
	import { getDoc } from '$lib/api/document';
	import type { TFines } from '$lib/api/fines';
	import Calendar from '$lib/icons/Calendar.svelte';
	import { redirect } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	let fines: TFines = { chargeResponseList: [] };

	onMount(async () => {
		const doc = await getDoc(Telegram.WebApp.initData);
		if (doc == null) {
			throw redirect(307, '/docs');
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
	<h1 class="fines__title">Fines</h1>
	{#each fines.chargeResponseList.map((fine) => fine) as { amountToPay, billDate, billFor }}
		<a class="fine" id={billFor} href="/fines/{billFor}">
			<div class="fine__title">{billFor}</div>
			<div class="fine__date-line">
				<Calendar /><span class="fine__date">{billDate.split('T')[0]}</span>
			</div>
			<div class="fine__money">{amountToPay}₽</div>
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

	.fines__title {
		align-self: flex-start;
		margin-top: 0;

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
