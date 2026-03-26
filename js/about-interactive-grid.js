/**
 * Interactive grids (About 1×4, Skills 4×2) — pointer-radius “pressed” highlight like the hero.
 */
;(function () {
	'use strict';

	var DEFAULT_RADIUS = 1.15;

	function initInteractiveGrid(config) {
		var gridId = config.id;
		var cols = config.cols;
		var rows = config.rows;
		var radius = config.radius != null ? config.radius : DEFAULT_RADIUS;
		var cellSelector = config.cellSelector || '.interactive-grid-cell';
		var litClass = config.litClass || 'interactive-grid-cell--lit';

		var gridEl = null;
		var ro = null;
		var gridState = { cols: cols, rows: rows, cells: [] };
		var lastLit = [];
		var rafId = 0;
		var pendingEvent = null;
		var pointerBound = false;

		function clearLit() {
			var i;
			for (i = 0; i < lastLit.length; i++) {
				lastLit[i].classList.remove(litClass);
			}
			lastLit = [];
		}

		function updateHighlight(clientX, clientY) {
			if (!gridEl || !gridState.cells.length) return;

			var rect = gridEl.getBoundingClientRect();
			var mx = clientX - rect.left;
			var my = clientY - rect.top;
			var gc = gridState.cols;
			var gr = gridState.rows;
			var colW = rect.width / gc;
			var rowH = rect.height / gr;

			if (mx < 0 || my < 0 || mx > rect.width || my > rect.height) {
				clearLit();
				return;
			}

			var gx = mx / colW;
			var gy = my / rowH;
			var R = radius;
			var R2 = R * R;

			var c0 = Math.max(0, Math.floor(gx - R - 0.5));
			var c1 = Math.min(gc - 1, Math.ceil(gx + R + 0.5));
			var r0 = Math.max(0, Math.floor(gy - R - 0.5));
			var r1 = Math.min(gr - 1, Math.ceil(gy + R + 0.5));

			var next = [];
			var cr, cc, idx, dx, dy, d2, el;

			for (cr = r0; cr <= r1; cr++) {
				for (cc = c0; cc <= c1; cc++) {
					dx = cc + 0.5 - gx;
					dy = cr + 0.5 - gy;
					d2 = dx * dx + dy * dy;
					if (d2 > R2) continue;
					idx = cr * gc + cc;
					el = gridState.cells[idx];
					if (el) next.push(el);
				}
			}

			var i;
			for (i = 0; i < lastLit.length; i++) {
				lastLit[i].classList.remove(litClass);
			}
			for (i = 0; i < next.length; i++) {
				next[i].classList.add(litClass);
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

		function refreshCells() {
			gridEl = document.getElementById(gridId);
			if (!gridEl) return;

			clearLit();

			var nodes = gridEl.querySelectorAll(cellSelector);
			var cells = [];
			var i;
			for (i = 0; i < nodes.length; i++) {
				cells.push(nodes[i]);
			}

			gridState.cols = cols;
			gridState.rows = rows;
			gridState.cells = cells;

			if (cells.length === cols * rows) {
				bindPointerEvents();
			}
		}

		function initOne() {
			refreshCells();
			if (typeof ResizeObserver !== 'undefined' && gridEl) {
				ro = new ResizeObserver(refreshCells);
				ro.observe(gridEl);
			}
			setTimeout(refreshCells, 200);
		}

		return initOne;
	}

	function boot() {
		var inits = [
			initInteractiveGrid({
				id: 'about-grid-cells',
				cols: 4,
				rows: 1,
				cellSelector: '.about-grid-cell',
				litClass: 'about-grid-cell--lit'
			}),
			initInteractiveGrid({
				id: 'skills-grid-cells',
				cols: 4,
				rows: 2,
				cellSelector: '.skills-grid-cell',
				litClass: 'skills-grid-cell--lit',
				radius: 1.05
			})
		];

		var j;
		for (j = 0; j < inits.length; j++) {
			inits[j]();
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', boot);
	} else {
		boot();
	}
})();
