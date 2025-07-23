<!-- @component

Uses CSS flexbox to create a horizontal stack of child components

@example
<HStack>
    <div>Some info</div>
    <p>some more information</p>
</HStack>

Overriding CSS can be done using inline styling - i.e
<HStack style="gap: 3rem;">
    <h1>Some</h1>
    <p>Increased spacing</p>
</HStack>

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
		flex-direction: row;
		gap: 0.5rem;
	}
</style>
