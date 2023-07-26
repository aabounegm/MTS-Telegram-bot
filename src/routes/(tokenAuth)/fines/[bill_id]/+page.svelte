<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getDoc } from '$lib/api/document';
	import type { TFine } from '$lib/api/fines';
	import { getFinePaymentUrl } from '$lib/api/payment';
	import { onMount } from 'svelte';

	let fine: TFine | undefined;

	onMount(async () => {
		const doc = await getDoc(Telegram.WebApp.initData);
		if (doc == null) {
			await goto('/docs', { replaceState: true });
			return;
		}
		const requestId = $page.url.searchParams.get('requestId');
		if (requestId === null) {
			alert('Missing the request ID');
			await goto('/fines', { replaceState: true });
			return;
		}
		const res = await fetch('/api/fines/' + requestId);
		if (!res.ok) {
			const err = await res.json();
			// Data is an error message. Either data not ready or initData not valid
			alert('Error: ' + err.message);
			return;
		}
		const data: { fines: TFine[] } = await res.json();
		fine = data.fines.find((f) => f.supplierBillID === $page.params.bill_id);
	});

	async function triggerPayment() {
		try {
			const paymentUrl = await getFinePaymentUrl(fine!);
			window.location.href = paymentUrl;
		} catch (e) {
			const err = e as Error;
			console.log(err);
			alert('An error occurred: ' + err.message);
		}
	}
</script>

<svelte:head>
	<title>Fines | {fine?.billFor}</title>
</svelte:head>

<section>
	{#if fine}
		<div class="content">
			<div class="header">
				<span class="subtitle">{fine.supplierOrgInfo.name}</span>
				<a href="/fines" class="link">Back</a>
			</div>
			<h1 class="title">{fine.billFor}</h1>
			<p class="description">
				{Intl.NumberFormat('ru', { style: 'currency', currency: 'RUB' }).format(
					fine.amountToPay / 100,
				)}
			</p>
		</div>
		<button class="button" on:click={triggerPayment}>Pay</button>
	{:else}
		<p>Loading...</p>
	{/if}
</section>

<style>
	section {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		width: 100%;
	}

	.title {
		font-weight: 600;
		font-size: 26px;
		line-height: 31px;
		color: #222222;
	}

	.subtitle {
		align-self: self-start;
		font-weight: 300;
		font-size: 18px;
		line-height: 20px;
		color: #444444;
	}

	.description {
		width: calc(100% - 24px);

		background-color: #f6f6f6;
		padding: 8px 12px;
		border-radius: 10px;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);

		font-weight: 400;
		font-size: 32px;
		line-height: 36px;
		margin: 8px;
		color: #666666;
	}

	.link {
		text-decoration: none;
		width: max-content;
		padding: 4px 11px;
		color: #ffffff;
		background-color: #f20000;
		border-radius: 10px;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.25);
	}

	.button:hover,
	.link:hover {
		box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.25);
	}
	.button:active,
	.link:active {
		box-shadow: inset 2px 3px rgba(0, 0, 0, 0.25);
	}

	.button {
		width: 100%;
		font-size: 18px;
		font-weight: 600;
		margin-top: 20px;

		color: white;
		background-color: #f20000;
		padding: 10px 0;
		border-radius: 10px;
		text-transform: uppercase;
		cursor: pointer;
		transition: all 300ms ease-in-out;
		border: none;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.25);
	}
</style>
