import { useState } from 'react';
import { authSignIn, authSignUp } from './supabaseClient';
import './login.css';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [isSignUp, setIsSignUp] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError('');
		setLoading(true);

		try {
			if (isSignUp) {
				await authSignUp(email, password);
				setError('Sign up successful! Please check your email to confirm.');
			} else {
				await authSignIn(email, password);
				window.location.href = '/';
			}
		} catch (err) {
			setError(err.message || 'Authentication failed. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const toggleMode = () => {
		setIsSignUp(!isSignUp);
		setError('');
		setEmail('');
		setPassword('');
	};

	return (
		<main className="login-page">
			<div className="login-container">
				<div className="scanline-login" aria-hidden="true" />

				<div className="login-header">
					<h1>Dev-Grit</h1>
					<p className="login-subtitle">GitHub Commit Timeline</p>
				</div>

				<form className="login-form" onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="email" className="form-label">
							Email
						</label>
						<input
							id="email"
							type="email"
							className="form-input"
							placeholder="your@email.com"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							required
							disabled={loading}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							id="password"
							type="password"
							className="form-input"
							placeholder="••••••••"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							required
							disabled={loading}
						/>
					</div>

					{error && <p className={`form-message ${isSignUp && error.includes('successful') ? 'success' : 'error'}`}>{error}</p>}

					<button type="submit" className="submit-button" disabled={loading}>
						{loading ? (isSignUp ? 'Creating Account...' : 'Signing In...') : isSignUp ? 'Create Account' : 'Sign In'}
					</button>
				</form>

				<div className="login-footer">
					<p>
						{isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
						<button type="button" className="toggle-button" onClick={toggleMode} disabled={loading}>
							{isSignUp ? 'Sign In' : 'Sign Up'}
						</button>
					</p>
				</div>
			</div>
		</main>
	);
}

export default Login;
