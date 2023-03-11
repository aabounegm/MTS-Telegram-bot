<script>
	let email = '';
	let password = '';
	let isLoading = false;
	let isSuccess = false;

	let errors = {
		email: undefined,
		password: undefined,
	};

	const handleSubmit = () => {
		console.log('Email:', email);
		console.log('Password: ', password);
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<h1>Charities</h1>

	<card>
		<charityTextBox>
			<charityTitle> World Charity Fund </charityTitle>
			<charitySubtitle> by World Health Organization </charitySubtitle>
		</charityTextBox>
		<button>Donate</button>
	</card>

	<card>
		<charityTextBox>
			<charityTitle> Russia Charity Fund </charityTitle>
			<charitySubtitle> by Russian Institute of Health </charitySubtitle>
		</charityTextBox>
		<button>Donate</button>
	</card>

	<card>
		<charityTextBox>
			<charityTitle> Red Cross </charityTitle>
			<charitySubtitle> by Red Cross </charitySubtitle>
		</charityTextBox>
		<button>Donate</button>
	</card>

	<card>
		<charityTextBox>
			<charityTitle> Russia Red Cross </charityTitle>
			<charitySubtitle> by Red Cross </charitySubtitle>
		</charityTextBox>
		<button>Donate</button>
	</card>
</form>

<style>
	form {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		background-color: #e9e9e9;
	}
	card {
		width: 88%;
		height: 62px;
		background-color: #f6f6f6;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-radius: 10px;
		margin-bottom: 10px;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
	}
	charityTextBox {
		width: 100%;
		height: 35px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: left;
		margin: 14px 0 13px 15px;
	}
	charityTitle {
		font-size: 16px;
		font-weight: 600;
		line-height: 19px;
		font-style: normal;
		font-family: 'Inter';
		color: #444444;
	}
	charitySubtitle {
		font-size: 11px;
		font-weight: 400;
		line-height: 13px;
		font-style: normal;
		font-family: 'Inter';
		color: #888888;
	}
	button {
		font-size: 14px;
		font-weight: 700;
		color: white;
		background-color: #e30611;
		width: 75px;
		height: 32px;
		border-radius: 5px;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.25);
		float: right;
		margin: 15px 15px 15px 15px;
		padding: 7px 13px 8px 12px;
		cursor: pointer;
		transition: all 300ms ease-in-out;
		border: none;
	}
	button:hover {
		box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.25);
	}
	button:active {
		box-shadow: inset 2px 3px rgba(0, 0, 0, 0.25);
	}
	h1 {
		float: left;
		width: 88%;
		margin: 10px 20px 21px 35px;
		font-size: 26px;
		line-height: 31px;
		font-weight: 600;
	}
</style>
