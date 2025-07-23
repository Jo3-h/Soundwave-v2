<!-- @component

Uses CSS and props to define a standard styling for boxes

Directive prop can be passed to specify the styling of the desired box.

Style override can be achieved by passing inline styles to component. i.e.

@example
<Box style="margin: 1rem;">
    <h1>Inside box</h1>
</Box>

-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children?: Snippet;
		directive?: 'primary' | 'secondary' | 'danger' | 'success' | 'default';
	}
	let { children, directive = 'default', ...restProps }: Props = $props();
</script>

<div
	class:primary={directive === 'primary'}
	class:secondary={directive === 'secondary'}
	class:danger={directive === 'danger'}
	class:success={directive === 'success'}
	class:default={directive === 'default'}
	{...restProps}
>
	{@render children?.()}
</div>

<style>
	div {
		display: flex;
		padding: 1rem;
		flex-direction: column;
		width: 100%;
		border-radius: 0.5rem;
		border: 1px solid;
		backdrop-filter: brightness(110%);
		transition: all 0.3s ease-in-out;

		&.primary {
			background-color: var(--color-primary);
		}

		&.secondary {
			background-color: rgb(255, 190, 255);
		}

		&.danger {
			background-color: rgb(255, 176, 176);
		}

		&.success {
			background-color: rgb(190, 255, 190);
		}

		&.default {
			background-color: white;
		}
	}
</style>
