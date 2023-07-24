<script lang="ts">
	import { DocType, getDoc, updateDoc, docName, type Doc } from '$lib/api/document';
	import { onMount } from 'svelte';
	let type: string;
	let value: string;
	let serverDoc: Doc | null = null;

	const docValues = Object.values(DocType) as DocType[];

	onMount(async () => {
		try {
			serverDoc = await getDoc(Telegram.WebApp.initData);
			if (serverDoc) {
				({ type, value } = serverDoc);
			}
		} catch (e) {
			alert(e);
		}
	});

	async function save() {
		serverDoc = await updateDoc(Telegram.WebApp.initData, type, value);
		({ type, value } = serverDoc);

		alert('Data saved successfully');
	}
</script>

<svelte:head>
	<title>Manage your documents</title>
</svelte:head>

<header>
	<h1>Add your document information</h1>
	{#if serverDoc}
		<a href="/fines" class="link">Go back</a>
	{/if}
</header>

<form class="card" on:submit|preventDefault={save}>
	<label class="doc-type">
		Document type
		<select bind:value={type}>
			{#each docValues as value}
				<option {value}>{docName[value]}</option>
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
	header {
		display: flex;
		justify-content: space-between;
		margin: 20px 0;
	}
	h1 {
		margin: 0;
		font-size: 1.5em;
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
		background-color: #f20000;
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
