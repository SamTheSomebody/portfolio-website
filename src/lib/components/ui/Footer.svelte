<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-content">
					<div class="footer-section">
			<h3>Sam Muller</h3>
			<p>Full-Stack Developer & Game Developer</p>
		</div>
			<div class="footer-section">
				<h4>Connect</h4>
				<div class="social-links">
					<a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
					<a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
					<a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">Twitter</a>
				</div>
			</div>
			<div class="footer-section">
				<h4>Quick Links</h4>
				<div class="footer-links">
					<a href="#about">About</a>
					<a href="#projects">Projects</a>
					<a href="#skills">Skills</a>
					<a href="#contact">Contact</a>
				</div>
			</div>
		</div>
		<div class="footer-bottom">
			<p>&copy; {currentYear} Your Name. All rights reserved.</p>
			<p>Built with ❤️ using Svelte & PixiJS</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: #333;
		color: white;
		padding: 3rem 0 1rem;
	}

	.footer-content {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.footer-section h3 {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
		color: #fff;
	}

	.footer-section h4 {
		font-size: 1.1rem;
		margin-bottom: 1rem;
		color: #fff;
	}

	.footer-section p {
		color: #ccc;
		line-height: 1.6;
	}

	.social-links,
	.footer-links {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.social-links a,
	.footer-links a {
		color: #ccc;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.social-links a:hover,
	.footer-links a:hover {
		color: #667eea;
	}

	.footer-bottom {
		border-top: 1px solid #555;
		padding-top: 1rem;
		text-align: center;
		color: #ccc;
	}

	.footer-bottom p {
		margin: 0.25rem 0;
		font-size: 0.9rem;
	}

	@media (max-width: 768px) {
		.footer-content {
			grid-template-columns: 1fr;
			text-align: center;
		}
	}
</style> 