window.onload = function() {
  setTimeout(function() {
    var fonter = document.getElementById('fonter');
		fonter.style.fontFamily = 'Envy Code R';
		fonter.innerHTML = 'Envy Code R';
		setTimeout(function() {
			fonter.style.fontFamily = 'New Geneva Nine ICG';
			fonter.innerHTML = 'New Geneva Nine ICG';
			setTimeout(function() {
				fonter.style.fontFamily = 'Daniel';
			  fonter.innerHTML = 'Daniel';
        setTimeout(function() {
          fonter.style.fontFamily = 'SansBlack';
          fonter.innerHTML = 'SansBlack';
          fonter.innerHTML = '';
          fonter.style.display = 'none';
        }, 10);
			}, 10);
		}, 10);
	}, 10);

    var AUTOMATIC_MODE = false;
    var PASO = 1;
    var MINUTOS = 60 / PASO;
    var duracion = 45 * MINUTOS;
    var s = document.getElementsByTagName('div'), cur = 0;
    var big = { current: 0, go: go, length: s.length };
    window.big = big;
    var l = s.length;
    var notes = [];
    for (var idx = 0; idx<l; idx++) {
      var slideNotes = s[idx].getElementsByTagName('notes');
      notes.push([]);
      while(slideNotes.length) {
        var nota = slideNotes[0];
        notes[idx].push(nota.innerHTML.trim());
        nota.parentNode.removeChild(nota);
      }
    }

    var pro = document.getElementById('progress');
    if (!s) return;
    function go(n) {
        cur = n;
        console && notes[n].length && console.clear && console.clear();
        for (var idx = 0; typeof console === 'object' && idx < notes[n].length; idx++) {
          console.log('%c%s: %s', 'padding:12px;font-family:sans-serif;font-size:24px;font-weight:bold;line-height:150%;color:darkgreen;', n, notes[n][idx]);
        }
        var i = 1e3, e = s[n];
        for (var k = 0; k < s.length; k++) s[k].style.display = 'none';
        e.style.display = 'inline';
        e.style.fontSize = i + 'px';
        if (e.firstChild.nodeName === 'IMG') {
            document.body.style.backgroundImage = 'url(' + e.firstChild.src + ')';
            e.firstChild.style.display = 'none';
        } else {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundColor = e.style.backgroundColor;
        }
        while (
            e.offsetWidth > window.innerWidth ||
            e.offsetHeight > window.innerHeight) {
            e.style.fontSize = (i -= 10) + 'px';
            if (i < 0) break;
        }
        e.style.fontSize = (i*0.8) + 'px';
        e.style.marginLeft = ((window.innerWidth - e.offsetWidth) / 2) + 'px';
        e.style.marginTop = ((window.innerHeight - e.offsetHeight) / 2) + 'px';
        if (window.location.hash !== n) window.location.hash = n;
        e.dataset.title && (document.title = e.dataset.title || e.textContent || e.innerText);
        pro.style.width = (100 / (l - 1) * n).toFixed(2) + '%';
    }
    /*
    document.onclick = function() {
        go(++cur % (s.length));
		};
		*/
    document.onkeydown = function(e) {
        ((e.which === 39) || (e.which === 34)) && go(Math.min(s.length - 1, ++cur));
        ((e.which === 37) || (e.which === 33)) && go(Math.max(0, --cur));
    };
    function parse_hash() {
        return Math.max(Math.min(
            s.length - 1,
            parseInt(window.location.hash.substring(1), 10)), 0);
    }
    if (window.location.hash) cur = parse_hash() || cur;
    window.onhashchange = function() {
        var c = parse_hash();
        if (c !== cur) go(c);
    };

    go(cur);
    var now = 0;
    var tim = document.getElementById('time');
    function updateTime() {
        tim.style.width = (100 / (duracion - 1) * (now++)).toFixed(2) + '%';
        if (now < duracion) setTimeout(updateTime,1000 * PASO);
    }
    setTimeout(updateTime,1000 * PASO);
    if (AUTOMATIC_MODE) { setInterval(function() { go(++cur % (s.length)); },duracion/l*1000); }
};
