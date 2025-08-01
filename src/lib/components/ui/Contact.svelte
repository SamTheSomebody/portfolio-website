<script lang="ts">
	import { onMount } from 'svelte';

	let contactSection;
	let form;
	let name;
	let email;
	let message;
	let submitButton;

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('slide-up');
				}
			});
		}, { threshold: 0.1 });

		if (contactSection) {
			observer.observe(contactSection);
		}

		return () => observer.disconnect();
	});

	function handleSubmit(event: Event) {
		event.preventDefault();
		
		// Here you would typically send the form data to your backend
		// For now, we'll just show a success message
		submitButton.textContent = 'Message Sent!';
		submitButton.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
		
		// Reset form after 2 seconds
		setTimeout(() => {
			form.reset();
			submitButton.textContent = 'Send Message';
			submitButton.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
		}, 2000);
	}
</script>

<div class="container" bind:this={contactSection}>
	<h2 class="section-title">Get In Touch</h2>
	<div class="contact-content">
		<div class="contact-info">
			<h3>Let's work together!</h3>
			<p>I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out!</p>
			
			<div class="contact-methods">
				<div class="contact-method">
					<span class="contact-icon">📧</span>
					<div>
						<h4>Email</h4>
						<p>gamedevsam@pm.me</p>
					</div>
				</div>
				<div class="contact-method">
					<span class="contact-icon">📍</span>
					<div>
						<h4>Location</h4>
						<p>Clifton Hill, Victoria</p>
					</div>
				</div>
				<div class="contact-method">
					<span class="contact-icon">📱</span>
					<div>
						<h4>Phone</h4>
						<p>+61 400 313 887</p>
					</div>
				</div>
				<div class="contact-method">
					<span class="contact-icon">💼</span>
					<div>
						<h4>LinkedIn</h4>
						<p>linkedin.com/in/GameDevSam</p>
					</div>
				</div>
				<div class="contact-method">
					<span class="contact-icon">🐙</span>
					<div>
						<h4>GitHub</h4>
						<p>github.com/SamTheSomebody</p>
					</div>
				</div>
			</div>
		</div>
		
		<form class="contact-form" bind:this={form} on:submit={handleSubmit}>
			<div class="form-group">
				<label for="name">Name</label>
				<input type="text" id="name" bind:this={name} required />
			</div>
			<div class="form-group">
				<label for="email">Email</label>
				<input type="email" id="email" bind:this={email} required />
			</div>
			<div class="form-group">
				<label for="message">Message</label>
				<textarea id="message" rows="5" bind:this={message} required></textarea>
			</div>
			<button type="submit" class="submit-button" bind:this={submitButton}>
				Send Message
			</button>
		</form>
	</div>
</div>

<style>
	.contact-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		margin-top: 3rem;
		align-items: start;
	}

	.contact-info h3 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		color: #333;
	}

	.contact-info p {
		font-size: 1.1rem;
		line-height: 1.6;
		color: #666;
		margin-bottom: 2rem;
	}

	.contact-methods {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.contact-method {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: white;
		border-radius: 10px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}

	.contact-method:hover {
		transform: translateY(-2px);
	}

	.contact-icon {
		font-size: 1.5rem;
	}

	.contact-method h4 {
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 0.25rem;
		color: #333;
	}

	.contact-method p {
		font-size: 0.9rem;
		color: #666;
		margin: 0;
	}

	.contact-form {
		background: white;
		padding: 2rem;
		border-radius: 15px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-group label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: #333;
	}

	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: 1rem;
		border: 2px solid #e1e5e9;
		border-radius: 10px;
		font-size: 1rem;
		transition: border-color 0.3s ease;
		font-family: inherit;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: #667eea;
	}

	.submit-button {
		width: 100%;
		padding: 1rem;
		background: linear-gradient(45deg, #667eea, #764ba2);
		color: white;
		border: none;
		border-radius: 10px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.3s ease;
	}

	.submit-button:hover {
		transform: translateY(-2px);
	}

	@media (max-width: 768px) {
		.contact-content {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style> 