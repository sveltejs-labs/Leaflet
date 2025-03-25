<script lang="ts">
	import { setContext, type Snippet } from 'svelte';
	import type { ActionReturn } from 'svelte/action';
	import { Map, type LeafletEventHandlerFnMap, type MapOptions } from 'leaflet';

	import EventBridge from '$lib/utils/EventBridge.js';
	import type { MapProvider } from '$lib/utils/context.js';

	interface Props {
		options?: MapOptions;
		events?: LeafletEventHandlerFnMap;
		children?: Snippet;
	}

	let { options = {}, events = {}, children }: Props = $props();

	let map = $state<Map>();
	let eventBridge: EventBridge;

	setContext<MapProvider>(Map, () => map);

	/* eslint-disable  @typescript-eslint/no-explicit-any */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function initialize(container: HTMLElement, parameters?: any): ActionReturn<any> {
		// BEGIN: Hack to support histoire
		if (
			container.getBoundingClientRect().width === 0 &&
			container.getBoundingClientRect().height === 0
		) {
			console.log('[WARNING] skipped map initialization, container width and height is 0');
			return {};
		}
		// END: Hack to support histoire
		map = new Map(container, options);
		eventBridge = new EventBridge(map, events);
		return {
			destroy: () => {
				eventBridge.unregister();
				map?.remove();
			}
		};
	}

	export function getMap(): Map | undefined {
		return map;
	}
</script>

<div style="height:100%; width:100%;" use:initialize>
	{#if map}
		{@render children?.()}
	{/if}
</div>
