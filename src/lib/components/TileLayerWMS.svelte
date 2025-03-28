<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { Map, TileLayer, type LeafletEventHandlerFnMap, type WMSOptions } from 'leaflet';

	import EventBridge from '$lib/utils/EventBridge.js';
	import type { MapProvider } from '$lib/utils/context.js';

	const mapProvider = getContext<MapProvider>(Map);

	interface Props {
		url: string;
		opacity?: number;
		zIndex?: number;
		options?: WMSOptions;
		events?: LeafletEventHandlerFnMap;
	}

	let { url, opacity = 1.0, zIndex = 1, options = {}, events = {} }: Props = $props();

	let tileLayer = $state<TileLayer.WMS>();
	let eventBridge = $state<EventBridge>();

	$effect(() => {
		const map = mapProvider();
		if (!map) {
			return;
		}
		if (!tileLayer) {
			tileLayer = new TileLayer.WMS(url, options).addTo(map);
			eventBridge = new EventBridge(tileLayer, events);
		}
		tileLayer.setUrl(url);
		tileLayer.setOpacity(opacity);
		tileLayer.setZIndex(zIndex);
	});

	onDestroy(() => {
		eventBridge?.unregister();

		const map = mapProvider();
		if (map) {
			tileLayer?.removeFrom(map);
		}
	});

	export function getTileLayer(): TileLayer.WMS | undefined {
		return tileLayer;
	}
</script>
