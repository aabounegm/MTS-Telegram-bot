<form method="POST">
	<h1>👤</h1>

	<label for="email">Email</label>
	<input name="email" id="email" placeholder="name@example.com" />

	<label for="password">Password</label>
	<input name="password" id="password" type="password" />

	<button type="submit">
		Log in
	</button>
</form>

<style>
	form {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
	label {
		font-size: 18px;
		margin: 10px 0;
		font-weight: 600;
		width: 80%;
	}
	input {
		font-weight: 300;
		font-size: 16px;
		border: none;
		border-radius: 0;
		border-bottom: 1px solid #ccc;
		margin-bottom: 20px;
		transition: all 300ms ease-in-out;
		width: 80%;
	}
	input:focus {
		outline: 0;
		border-bottom: 1px solid #e30611;
	}
	button {
		font-size: 18px;
		font-weight: 600;
		margin-top: 20px;
		color: white;
		background-color: #e30611;
		padding: 10px 0;
		width: 80%;
		border-radius: 10px;
		text-transform: uppercase;
		cursor: pointer;
		transition: all 300ms ease-in-out;
		border: none;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.25);
	}
    button:hover {
		box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.25);
	}
    button:active {
		box-shadow: inset 2px 3px rgba(0, 0, 0, 0.25);
	}
    h1 {
		margin: 10px 20px 30px 20px;
		font-size: 40px;
	}
	.success {
		font-size: 24px;
		text-align: center;
	}
</style>
