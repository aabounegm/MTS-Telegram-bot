<form method="POST" class="form">
	<label for="email" class="form__label">Email</label>
	<input name="email" class="form__input" id="email" placeholder="name@example.com" />

	<label for="password" class="form__label">Password</label>
	<input
		name="password"
		class="form__input"
		id="password"
		type="password"
		placeholder="Super password"
	/>

	<button class="form__button" type="submit">Log in</button>
</form>

<style>
	.form {
		width: 100%;
		height: max-content;
		padding: 20px 0;
		border-radius: 10px;
		display: flex;
		background-color: #f6f6f6;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
	}

	.form__label {
		margin: 10px 0;
		width: 80%;
		font-weight: 600;
		font-size: 16px;
		line-height: 18px;
		color: var(--tg-theme-text-color);
	}

	.form__input {
		font-weight: 400;
		font-size: 14px;
		line-height: 16px;
		padding: 8px 0;
		background-color: #f6f6f6;
		border: none;
		border-radius: 0;
		border-bottom: 1px solid #ccc;
		margin-bottom: 20px;
		transition: all 300ms ease-in-out;
		width: 80%;
	}
	.form__input:focus {
		outline: 0;
		border-bottom: 1px solid #e30611;
	}

	.form__button {
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
	.form__button:hover {
		box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.25);
	}
	.form__button:active {
		box-shadow: inset 2px 3px rgba(0, 0, 0, 0.25);
	}
</style>
