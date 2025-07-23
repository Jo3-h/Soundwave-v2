<!-- @component

Uses CSS flexbox to create a vertical stack of child components

@example
<Stack>
    <div>Some info</div>
    <p>some more information</p>
</Stack>

Overriding CSS can be done using inline styling - i.e
<Stack style="gap: 3rem;">
    <h1>Some</h1>
    <p>Increased spacing</p>
</Stack>

-->

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div {...restProps}>
	{@render children?.()}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
