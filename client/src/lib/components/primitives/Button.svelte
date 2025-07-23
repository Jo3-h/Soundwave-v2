<!-- @component

-->

<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { fade } from 'svelte/transition';
	import { sineInOut } from 'svelte/easing';
	//import { loading } from '$lib/stores';
	//import { navigating } from '$lib/state';

	interface Props extends HTMLButtonAttributes {
		directive?: 'default' | 'primary' | 'secondary' | 'success' | 'danger';
		size?: 'small' | 'medium' | 'large';
		width?: 'small' | 'medium' | 'large';
		navigate?: string;
	}

	let {
		directive = 'default',
		size = 'medium',
		width = 'medium',
		navigate = '',
		children,
		...restProps
	}: Props = $props();
</script>

{#if navigate === ''}
	<a>
		<button
			class:default={directive === 'default'}
			class:primary={directive === 'primary'}
			class:secondary={directive === 'secondary'}
			class:success={directive === 'success'}
			class:danger={directive === 'danger'}
			class:small={size === 'small'}
			class:large={size === 'large'}
			class:small-width={width === 'small'}
			class:large-width={width === 'large'}
			{...restProps}
		>
			{@render children?.()}
		</button>
	</a>
{:else}
	<a href={navigate}>
		<button
			class:default={directive === 'default'}
			class:primary={directive === 'primary'}
			class:secondary={directive === 'secondary'}
			class:success={directive === 'success'}
			class:danger={directive === 'danger'}
			class:small={size === 'small'}
			class:large={size === 'large'}
			class:small-width={width === 'small'}
			class:large-width={width === 'large'}
			{...restProps}
		>
			{@render children?.()}
		</button>
	</a>
{/if}

<style>
	a {
		border: 1px solid;
		border-radius: 0.5rem;
		box-shadow: 3px 3px;
		padding: 0.5rem 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition-all: 0.3s ease-in-out;
	}

	a * {
		cursor: pointer;
	}

	a:hover {
		box-shadow: 2px 2px;
		transform: translateY(2px) translateX(2px);
		filter: brightness(110%);
	}

	a:active {
		box-shadow: 1px 1px;
		transform: translateY(2px);
		filter: brightness(0.9);
	}
</style>
