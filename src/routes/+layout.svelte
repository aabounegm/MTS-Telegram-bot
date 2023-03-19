<main>
	<slot />
</main>

<style>
	:global(body) {
		margin: 0;
		width: 100vw;
		height: 100vh;

		overflow-x: hidden;
		overflow-y: auto;
	}

	main {
		width: calc(100% - 40px);
		height: calc(100% - 48px);
		padding: 24px 20px;

		background-color: #e9e9e9;
	}
</style>
