<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/navigation/Navbar.svelte';
	import Footer from '$lib/components/navigation/Footer.svelte';

	let { children } = $props();
</script>

<Navbar />

{@render children()}

<Footer />
