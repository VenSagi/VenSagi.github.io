/**
 * About section 1×4 grid — same pointer-radius “pressed” highlight as the hero grid.
 */
;(function () {
	'use strict';

	var COLS = 4;
	var ROWS = 1;
	/** Radius in cell units; tuned for 4 large cells (1–2 cells lit near edges). */
	var POINTER_RADIUS_CELLS = 1.15;

	var gridEl;
	var ro;
	var gridState = {
		cols: COLS,
		rows: ROWS,
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
			lastLit[i].classList.remove('about-grid-cell--lit');
		}
		lastLit = [];
	}

	function updateHighlight(clientX, clientY) {
		if (!gridEl || !gridState.cells.length) return;

		var rect = gridEl.getBoundingClientRect();
		var mx = clientX - rect.left;
		var my = clientY - rect.top;
		var cols = gridState.cols;
		var rows = gridState.rows;
		var colW = rect.width / cols;
		var rowH = rect.height / rows;

		if (mx < 0 || my < 0 || mx > rect.width || my > rect.height) {
			clearLit();
			return;
		}

		var gx = mx / colW;
		var gy = my / rowH;
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
			lastLit[i].classList.remove('about-grid-cell--lit');
		}
		for (i = 0; i < next.length; i++) {
			next[i].classList.add('about-grid-cell--lit');
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
		gridEl = document.getElementById('about-grid-cells');
		if (!gridEl) return;

		clearLit();

		var nodes = gridEl.querySelectorAll('.about-grid-cell');
		var cells = [];
		var i;
		for (i = 0; i < nodes.length; i++) {
			cells.push(nodes[i]);
		}

		gridState.cols = COLS;
		gridState.rows = ROWS;
		gridState.cells = cells;

		if (cells.length === COLS * ROWS) {
			bindPointerEvents();
		}
	}

	function init() {
		refreshCells();
		if (typeof ResizeObserver !== 'undefined' && gridEl) {
			ro = new ResizeObserver(refreshCells);
			ro.observe(gridEl);
		}
		setTimeout(refreshCells, 200);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
