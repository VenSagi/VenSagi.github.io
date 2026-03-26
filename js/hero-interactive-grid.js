/**
 * Interactive hero grid — DOM cells for hover/tap feedback (static hosting OK).
 */
;(function () {
	'use strict';

	var MAX_CELLS = 1000;
	var BASE_CELL = 48;
	var gridEl;
	var slideEl;
	var resizeTimer;
	var ro;

	function buildGrid() {
		gridEl = document.getElementById('hero-grid-cells');
		if (!gridEl) return;
		slideEl = gridEl.closest('.hero-slide-grid');
		if (!slideEl) return;

		var w = slideEl.clientWidth;
		var h = slideEl.clientHeight;
		if (w < 16 || h < 16) return;

		var cell = BASE_CELL;
		var cols = Math.ceil(w / cell);
		var rows = Math.ceil(h / cell);
		while (cols * rows > MAX_CELLS && cell < 88) {
			cell += 8;
			cols = Math.ceil(w / cell);
			rows = Math.ceil(h / cell);
		}

		/* Exact column width so cols * colW === w (no horizontal gap or clip drift). */
		var colW = w / cols;
		rows = Math.ceil(h / colW);

		gridEl.innerHTML = '';
		gridEl.style.gridTemplateColumns = 'repeat(' + cols + ', ' + colW + 'px)';
		gridEl.style.gridAutoRows = colW + 'px';

		var total = cols * rows;
		var frag = document.createDocumentFragment();
		for (var i = 0; i < total; i++) {
			var div = document.createElement('div');
			div.className = 'hero-grid-cell';
			frag.appendChild(div);
		}
		gridEl.appendChild(frag);
	}

	function debouncedBuild() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(buildGrid, 100);
	}

	function init() {
		buildGrid();
		window.addEventListener('resize', debouncedBuild);
		window.addEventListener('orientationchange', debouncedBuild);
		slideEl = document.querySelector('.hero-slide-grid');
		if (slideEl && typeof ResizeObserver !== 'undefined') {
			ro = new ResizeObserver(debouncedBuild);
			ro.observe(slideEl);
		}
		setTimeout(buildGrid, 200);
		setTimeout(buildGrid, 600);
	}

	window.heroInteractiveGridRebuild = buildGrid;

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
