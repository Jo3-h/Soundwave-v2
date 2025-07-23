<script>
	import Stack from '$lib/components/primitives/Stack.svelte';
	import Box from '$lib/components/primitives/Box.svelte';
	import Button from '$lib/components/primitives/Button.svelte';
	import Label from '$lib/components/primitives/Label.svelte';
</script>

<Stack style="padding: 1rem; min-height: 90vh; justify-content: center;">
	<Button navigate="/api/auth/login">
		<Label>Start A Party</Label>
	</Button>
	<Button>
		<Label>Join A Party</Label>
	</Button>
</Stack>
