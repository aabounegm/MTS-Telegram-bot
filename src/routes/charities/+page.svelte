<script lang="ts" context="module">
	import type { TCharity } from '$lib/types/charity';

	const charityLogoUrl = 'https://test.mospay.mos.ru/mospaynew/newportal/assets/images/charity/';

	export const charityPrograms: TCharity[] = [
		{
			code: 'ADULTS0001',
			name: 'Взрослые',
			programs: [
				{
					serviceName: 'Наука, образование и технологии',
					serviceCode: 'AAAA99341800000000001',
					fundName: 'Фонд поддержки слепоглухих «Со-единение»',
					serviceDescription:
						'Обеспечение нового качества жизни и реабилитации слепоглухих путем развития инновационных отечественных ассистивных технологий и проведения перспективных исследований в области комплексной социализации инвалидов с нарушенным слухом и зрением',
					fundUrl: 'https://so-edinenie.org/o-fonde/programmi/nauka-obrazovanie-i-tehnologii',
					fundLogo: charityLogoUrl + encodeURIComponent('logo color-1@2x.png'),
					minimum: 1,
				},
			],
		},
	];

	const copyFoundUrl = (text: string) => {
		navigator.clipboard.writeText(text);
	};
</script>

<div class="charities">
	<h1 class="charities__title">Charities</h1>

	{#await charityPrograms}
		<p>...loading</p>
	{:then result}
		{#each result as charityProgram}
			{#each charityProgram.programs as program}
				<div class="program" id={program.serviceCode}>
					<div class="program__info">
						<img class="program__logo" src={program.fundLogo} alt={program.fundName} />
						<h2 class="program__title">{program.fundName}</h2>

						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div class="program__copy" on:click={() => copyFoundUrl(program.fundUrl)}>
							<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
								><path
									d="M6 6V2c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4v4a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h4zm2 0h4a2 2 0 0 1 2 2v4h4V2H8v4zM2 8v10h10V8H2z"
								/></svg
							>
						</div>
					</div>
					<p class="program__description">{program.serviceDescription}</p>
				</div>
			{/each}
		{/each}
	{:catch error}
		<p>Upps! {error}</p>
	{/await}
</div>

<style>
	.charities {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.charities__title {
		align-self: flex-start;
		margin-top: 0;

		font-weight: 600;
		font-size: 26px;
		line-height: 31px;

		color: #222222;
	}

	.program {
		background-color: #f6f6f6;

		padding: 8px 12px;

		gap: 8px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-radius: 10px;
		margin-bottom: 10px;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
	}

	.program__logo {
		width: 30px;
		height: 30px;
		border-radius: 100%;
	}

	.program__copy {
		width: 20px;
		height: 20px;
	}

	.program__info {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.program__title {
		margin: 0;
		font-weight: 600;
		font-size: 16px;
		line-height: 18px;
		color: #444444;
	}

	.program__description {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		line-height: 16px;
		color: #888888;

		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
