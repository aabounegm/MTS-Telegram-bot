<script>
	import '../app.css';
	import { _, getLocaleFromNavigator, isLoading, register, init } from 'svelte-i18n';

	register('en', () => import('../langs/en.json'));
	register('ru', () => import('../langs/ru.json'));
	init({
		fallbackLocale: 'en',
		initialLocale: getLocaleFromNavigator(),
	});
</script>

{#if $isLoading}
	<p>Loading</p>
{:else}
	<main>
		<slot />
	</main>
{/if}

<style>
	main {
		width: calc(100% - 40px);
		min-height: 100vh;
		padding: 24px 20px;

		background-color: #f6f6f6;
	}
</style>
