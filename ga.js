/* Google Analytics for Asylum Maze (asylummaze.princetomar.com)
   Same property as princetomar.com (G-G3LPX71J7E), so both sites report together.
   Add ONE line inside <head> of the game's index.html:
     <script src="/ga.js" async></script>
   Sends two events:
     asylum_maze_open  - once, when the page opens
     asylum_maze_time  - when the player leaves / closes / switches tab;
                         engagement_seconds + value = seconds the page was visible */
(function () {
  'use strict';
  var ID = 'G-G3LPX71J7E';

  // Load Google's tag
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' });
  gtag('js', new Date());
  // cookie_domain 'auto' shares the visitor ID with princetomar.com (same parent domain)
  gtag('config', ID, { cookie_domain: 'auto' });

  // 1. Page opened
  gtag('event', 'asylum_maze_open', { page_path: location.pathname });

  // 2. Time spent (only while the tab is visible)
  var ms = 0, since = document.visibilityState === 'visible' ? performance.now() : null;
  function pause() { if (since != null) { ms += performance.now() - since; since = null; } }
  function sendTime() {
    pause();
    var secs = Math.round(ms / 1000);
    if (secs >= 1) {
      gtag('event', 'asylum_maze_time', {
        engagement_seconds: secs, value: secs,
        page_path: location.pathname, transport_type: 'beacon'
      });
    }
    ms = 0;
  }
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') sendTime();
    else if (since == null) since = performance.now();
  });
  window.addEventListener('pagehide', sendTime);
})();
