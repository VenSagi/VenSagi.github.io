/**
 * Interactive hero grid — multi-cell highlight around cursor (static hosting OK).
 */
;(function () {
	'use strict';

	var MAX_CELLS = 1000;
	var BASE_CELL = 48;
	/** Radius in cell units: ~2.3 ≈ 5 cells across; increase for a wider brush. */
	var POINTER_RADIUS_CELLS = 2.35;

	var gridEl;
	var slideEl;
	var resizeTimer;
	var ro;

	var gridState = {
		cols: 0,
		rows: 0,
		colW: 1,
		cells: []
	};

	var lastLit = [];
	var rafId = 0;
	var pendingEvent = null;
	var pointerBound = false;

	function clearLit() {
		var i;
		for (i = 0; i < lastLit.length; i++) {
			lastLit[i].classList.remove('hero-grid-cell--lit');
		}
		lastLit = [];
	}

	function updateHighlight(clientX, clientY) {
		if (!gridEl || !gridState.cols) return;

		var rect = gridEl.getBoundingClientRect();
		var mx = clientX - rect.left;
		var my = clientY - rect.top;
		var colW = gridState.colW;
		var cols = gridState.cols;
		var rows = gridState.rows;

		if (mx < 0 || my < 0 || mx > rect.width || my > rect.height) {
			clearLit();
			return;
		}

		var gx = mx / colW;
		var gy = my / colW;
		var R = POINTER_RADIUS_CELLS;
		var R2 = R * R;

		var c0 = Math.max(0, Math.floor(gx - R - 0.5));
		var c1 = Math.min(cols - 1, Math.ceil(gx + R + 0.5));
		var r0 = Math.max(0, Math.floor(gy - R - 0.5));
		var r1 = Math.min(rows - 1, Math.ceil(gy + R + 0.5));

		var next = [];
		var cr, cc, idx, dx, dy, d2, el;

		for (cr = r0; cr <= r1; cr++) {
			for (cc = c0; cc <= c1; cc++) {
				dx = cc + 0.5 - gx;
				dy = cr + 0.5 - gy;
				d2 = dx * dx + dy * dy;
				if (d2 > R2) continue;
				idx = cr * cols + cc;
				el = gridState.cells[idx];
				if (el) next.push(el);
			}
		}

		var i;
		for (i = 0; i < lastLit.length; i++) {
			lastLit[i].classList.remove('hero-grid-cell--lit');
		}
		for (i = 0; i < next.length; i++) {
			next[i].classList.add('hero-grid-cell--lit');
		}
		lastLit = next;
	}

	function scheduleHighlight(e) {
		pendingEvent = e;
		if (rafId) return;
		rafId = window.requestAnimationFrame(function () {
			rafId = 0;
			var ev = pendingEvent;
			pendingEvent = null;
			if (!ev) return;
			updateHighlight(ev.clientX, ev.clientY);
		});
	}

	function bindPointerEvents() {
		if (pointerBound || !gridEl) return;
		pointerBound = true;

		gridEl.addEventListener('mousemove', scheduleHighlight, { passive: true });
		gridEl.addEventListener('mouseleave', function () {
			clearLit();
		});

		gridEl.addEventListener(
			'touchmove',
			function (e) {
				if (!e.touches || !e.touches[0]) return;
				var t = e.touches[0];
				updateHighlight(t.clientX, t.clientY);
			},
			{ passive: true }
		);
		gridEl.addEventListener('touchend', function () {
			clearLit();
		});
		gridEl.addEventListener('touchcancel', function () {
			clearLit();
		});
	}

	function buildGrid() {
		gridEl = document.getElementById('hero-grid-cells');
		if (!gridEl) return;
		slideEl = gridEl.closest('.hero-slide-grid');
		if (!slideEl) return;

		clearLit();

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

		var colW = w / cols;
		rows = Math.ceil(h / colW);

		gridEl.innerHTML = '';
		gridEl.style.gridTemplateColumns = 'repeat(' + cols + ', ' + colW + 'px)';
		gridEl.style.gridAutoRows = colW + 'px';

		var total = cols * rows;
		var frag = document.createDocumentFragment();
		var i;
		var cells = new Array(total);
		for (i = 0; i < total; i++) {
			var div = document.createElement('div');
			div.className = 'hero-grid-cell';
			cells[i] = div;
			frag.appendChild(div);
		}
		gridEl.appendChild(frag);

		gridState.cols = cols;
		gridState.rows = rows;
		gridState.colW = colW;
		gridState.cells = cells;

		bindPointerEvents();
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
