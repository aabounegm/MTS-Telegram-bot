<script>
	import '../app.css';
</script>

<main>
	<slot />
</main>

<style>
	main {
		width: calc(100% - 40px);
		min-height: 100vh;
		padding: 24px 20px;

		background-color: #f6f6f6;
	}
</style>
