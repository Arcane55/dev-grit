import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('Missing Supabase credentials. Check your .env.local file for VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Sign up a new user with email and password
 */
export async function authSignUp(email, password) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) throw error;
	return data;
}

/**
 * Sign in with email and password
 */
export async function authSignIn(email, password) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw error;
	return data;
}

/**
 * Sign out the current user
 */
export async function authSignOut() {
	const { error } = await supabase.auth.signOut();
	if (error) throw error;
}

/**
 * Get the current user session
 */
export async function authGetSession() {
	const { data, error } = await supabase.auth.getSession();
	if (error) throw error;
	return data.session;
}

/**
 * Get the current user
 */
export async function authGetUser() {
	const { data, error } = await supabase.auth.getUser();
	if (error) throw error;
	return data.user;
}

/**
 * Send password reset email
 */
export async function authResetPassword(email) {
	const { data, error } = await supabase.auth.resetPasswordForEmail(email);
	if (error) throw error;
	return data;
}

/**
 * Listen for auth state changes
 */
export function authOnAuthStateChange(callback) {
	return supabase.auth.onAuthStateChange(callback);
}
