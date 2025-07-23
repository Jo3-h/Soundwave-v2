<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div {...restProps}>
	{@render children?.()}
</div>

<style>
	div {
		font-family: var(--font-family-primary);
		font-weight: 800;
	}
</style>
