<script lang="ts">
	export let width: number = 400;
	export let height: number = 100;
</script>

<div class="banner" style="width: {width}px; height: {height}px;">
	<div class="left-edge" style="width: {height}px;"></div>
	<div class="center" style="transform: translateY(-{height / 30}px);"></div>
	<div class="right-edge" style="width: {height}px;"></div>
</div>

<style>
	.banner {
		display: flex;
		align-items: stretch;
		filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
	}

	.left-edge {
		height: 100%;
		background-image: url('/images/ui/tile_0056.png');
		background-size: contain;
		background-repeat: no-repeat;
		flex-shrink: 0;
	}

	.center {
		flex: 1;
		background-image: url('/images/ui/tile_0057.png');
		background-size: 32px 100%;
		background-repeat: repeat-x;
	}

	.right-edge {
		width: 32px;
		height: 100%;
		background-image: url('/images/ui/tile_0058.png');
		background-size: contain;
		background-repeat: no-repeat;
		flex-shrink: 0;
	}
</style> 