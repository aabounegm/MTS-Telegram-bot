<script lang="ts">
	import { DocType, getDoc, updateDoc } from '$lib/api/document';
	import { onMount } from 'svelte';
	let type: string;
	let value: string;

	onMount(async () => {
		const data = await getDoc(Telegram.WebApp.initData);
		if (data) {
			({ type, value } = data);
		}
	});

	async function save() {
		const data = await updateDoc(Telegram.WebApp.initData, type, value);
		({ type, value } = data);

		alert('Data saved successfully');
	}
</script>

<svelte:head>
	<title>Manage your documents</title>
</svelte:head>

<h1>Add your document information</h1>

<form class="card" on:submit|preventDefault={save}>
	<label class="doc-type">
		Document type
		<select bind:value={type}>
			{#each Object.entries(DocType) as [value, docName]}
				<option {value}>{docName}</option>
			{/each}
		</select>
	</label>
	<label class="doc-value">
		Value
		<input type="text" bind:value />
	</label>

	<button type="submit">Save</button>
</form>

<style>
	.card {
		background-color: white;
		border-radius: 10px;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
		padding: 10px;
	}
	select,
	input {
		width: 100%;
		height: 2.5rem;
		margin-top: 5px;
		border-radius: 5px;
		font-size: 1.2em;
		padding: 2px 5px;
		box-sizing: border-box;
	}
	label {
		display: block;
		margin-bottom: 10px;
		padding: 5px;
	}
	button {
		width: 100%;
		font-size: 1.5rem;
		margin-top: 40px;

		color: white;
		background-color: #e30611;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.25);
		padding: 10px 0;
		border-radius: 10px;
		cursor: pointer;
		border: none;
	}
	button:hover {
		box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.25);
	}
	button:active {
		box-shadow: inset 2px 3px rgba(0, 0, 0, 0.25);
	}
</style>
