import { useEffect, useState } from 'react';
import { authGetUser, authSignOut } from './supabaseClient';

function Dashboard() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const currentUser = await authGetUser();
				if (!currentUser) {
					window.location.href = '/login';
				} else {
					setUser(currentUser);
				}
			} catch (error) {
				console.error('Failed to fetch user:', error);
				window.location.href = '/login';
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, []);

	const handleSignOut = async () => {
		try {
			await authSignOut();
			window.location.href = '/login';
		} catch (error) {
			console.error('Sign out failed:', error);
		}
	};

	if (loading) {
		return <div className="dashboard-loading">Loading...</div>;
	}

	return (
		<div className="dashboard-page">
			<div className="dashboard-header">
				<h1>Welcome back, {user?.email}</h1>
				<button className="signout-button" onClick={handleSignOut}>
					Sign Out
				</button>
			</div>
			<div className="dashboard-content">
				<p>You're logged in! This is your dashboard.</p>
			</div>
		</div>
	);
}

export default Dashboard;
