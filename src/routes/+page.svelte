<script>
	import { _, locale } from 'svelte-i18n';

	const handleLocaleChange = (e: any) => {
		e.preventDefault();
		locale.set(e.target.value);
	};
</script>

<svelte:head>
	<title>MTS Mos Pay</title>
</svelte:head>

<main>
	<select on:change={handleLocaleChange}>
		<option value="en">en</option>
		<option value="ru">ru</option>
	</select>

	<a href="/fines">{$_('nav.fines')}</a>
	<a href="/docs">{$_('nav.docs')}</a>
	<a href="/charities">{$_('nav.charities')}</a>
	<a href="/login">{$_('nav.login')}</a>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		flex: 1;
		gap: 8px;
	}
</style>
