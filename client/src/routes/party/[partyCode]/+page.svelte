<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

{#if data.partyCode}
	<div>PARTY! {data.partyCode}</div>
{:else}
	<div>error in party</div>
{/if}
