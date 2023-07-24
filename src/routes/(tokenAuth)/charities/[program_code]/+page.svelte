<script lang="ts">
	import { getPaymentUrl } from '$lib/api/payment';
	import type { PageData } from './$types';

	export let data: PageData;

	$: program = data.charityProgram;

	let value: number | null = null;

	const amounts = [50, 100, 200, 500];

	async function triggerPayment() {
		if (value == null || value <= 0) {
			alert('Please enter a valid amount');
			return;
		}
		if (value < program.minimum) {
			alert('This minimum amount for this charity is ' + program.minimum);
			return;
		}
		try {
			const paymentUrl = await getPaymentUrl(program, value);
			window.location.href = paymentUrl;
		} catch (e) {
			const err = e as Error;
			alert('An error occurred: ' + err.message);
		}
	}
</script>

<svelte:head>
	<title>Charities | {program.serviceName}</title>
</svelte:head>

<div class="charityPay">
	<div class="charityPay__content">
		<span class="charityPay__subtitle">{program.fundName}</span>
		<div class="charityPay__header">
			<h1 class="charityPay__title">{program.serviceName}</h1>
			<a href="/charities" class="charityPay__link">Back</a>
		</div>
		<p class="charityPay__description">{program.serviceDescription}</p>
		<div class="charityPay__pay">
			<h2 class="charityPay__pay_title">Select amount to donate</h2>
			<input placeholder="250 ₽" class="charityPay__pay_input" type="number" bind:value />
			<div class="charityPay__pay_amounts">
				{#each amounts as amount}
					<button on:click={() => (value = amount)} class="charityPay__pay_token">
						{amount} ₽
					</button>
				{/each}
			</div>
		</div>
	</div>
	<button class="charityPay__button" on:click={triggerPayment}>Pay</button>
</div>

<style>
	.charityPay {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.charityPay__content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}

	.charityPay__header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		width: 100%;
	}

	.charityPay__title {
		font-weight: 600;
		font-size: 26px;
		line-height: 31px;
		color: #222222;
	}

	.charityPay__subtitle {
		align-self: self-start;
		font-weight: 300;
		font-size: 18px;
		line-height: 20px;
		color: #444444;
	}

	.charityPay__description {
		width: calc(100% - 24px);

		background-color: #f6f6f6;
		padding: 8px 12px;
		border-radius: 10px;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);

		font-weight: 400;
		font-size: 16px;
		line-height: 18px;
		color: #666666;
	}

	.charityPay__pay {
		width: calc(100% - 30px);
		padding: 20px 15px;
		display: flex;
		flex-direction: column;
		align-items: center;

		background-color: #f6f6f6;
		border-radius: 10px;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
	}

	.charityPay__pay_title {
		font-weight: 600;
		font-size: 20px;
		line-height: 24px;
		text-align: center;
		margin-top: 0;
		margin-bottom: 20px;

		color: #666666;
	}

	.charityPay__pay_input {
		width: calc(100% - 30px);
		background: #f1f1f1;
		padding: 10px 12px;
		border: 0.5px solid #aaaaaa;
		border-radius: 10px;
	}

	.charityPay__pay_input:focus {
		outline: 0;
		border: 1px solid #f20000;
	}

	.charityPay__pay_amounts {
		width: 100%;
		margin-top: 10px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 6px;
	}

	.charityPay__link {
		text-decoration: none;
	}

	.charityPay__pay_token,
	.charityPay__link {
		width: max-content;
		padding: 4px 11px;
		color: #ffffff;
		background-color: #f20000;
		border-radius: 10px;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.25);
	}

	.charityPay__pay_token:hover,
	.charityPay__button:hover,
	.charityPay__link:hover {
		box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.25);
	}
	.charityPay__pay_token:active,
	.charityPay__button:active,
	.charityPay__link:active {
		box-shadow: inset 2px 3px rgba(0, 0, 0, 0.25);
	}

	.charityPay__button {
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
