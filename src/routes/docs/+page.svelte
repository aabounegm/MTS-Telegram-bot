<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { getDoc, updateDoc, type DocResponse } from '$lib/api/document';
	import { onMount } from 'svelte';
	let type: string;
	let value: string;
	let serverDoc: DocResponse | null = null;

	const docTypes = {
		passwort: $_('docs.docTypes.passport'),
	};

	onMount(async () => {
		if (Telegram.WebApp.initDataUnsafe.user?.language_code) {
			locale.set(Telegram.WebApp.initDataUnsafe.user?.language_code);
		}

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

		alert($_('docs.success'));
	}
</script>

<svelte:head>
	<title>{$_('docs.title')}</title>
</svelte:head>

<header>
	<h1>{$_('docs.add')}</h1>
	{#if serverDoc}
		<a href="/fines" class="link">{$_('main.back')}</a>
	{/if}
</header>

<form class="card" on:submit|preventDefault={save}>
	<label class="doc-type">
		{$_('docs.type')}
		<select bind:value={type}>
			{#each Object.entries(docTypes) as [value, docName]}
				<option {value}>{docName}</option>
			{/each}
		</select>
	</label>
	<label class="doc-value">
		{$_('docs.value')}
		<input type="text" bind:value />
	</label>

	<button type="submit">{$_('docs.save')}</button>
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
