// ==UserScript==
// @name         FortiGate Log Search Filter auto clear
// @version      2025-08-19
// @description  leert automatisch die Log Search Filter
// @author       Johannes Fankhauser
// @match        *://*/*
// @grant        none
// ==/UserScript==

const host = window.location.hostname;

if (host.startsWith('fw-') || host.includes('-fw')) {

    (function() {
        'use strict';

        //check if URL has changed
        function getPath(url) {
            const a = document.createElement('a');
            a.href = url;
            return a.pathname;
        }


        //Delete Log Filters
        function clearLogFilter() {

            //Check for and delete LogViewer Keys
            const regexLogViewer = /LogViewer::.+::filters/;
            for (let key in localStorage) {
                if (regexLogViewer.test(key)) {
                    localStorage.removeItem(key);
                    console.log('Deleted localStorage Key:', key);
                }
            }


            //Check for and delete LogViewer Keys
            const regexTimeFrame = /LOG_VIEWER_TABLE::.+::timeframe/;
            for (let key in localStorage) {
                if (regexTimeFrame.test(key)) {
                    localStorage.removeItem(key);
                    console.log('Deleted localStorage Key:', key);
                }
            }
        }



        let lastPath = getPath(location.href);
        clearLogFilter(); // Initialer Aufruf

        new MutationObserver(() => {
            const currentPath = getPath(location.href);
            if (currentPath !== lastPath) {
                lastPath = currentPath;
                clearLogFilter();
            }
        }).observe(document, {subtree: true, childList: true});


        //Event Listener for URL Changes
        window.addEventListener('popstate', () => {
            const currentPath = getPath(location.href);
            if (currentPath !== lastPath) {
                lastPath = currentPath;
                clearLogFilter();
            }
        });


        window.addEventListener('hashchange', () => {
            const currentPath = getPath(location.href);
            if (currentPath !== lastPath) {
                lastPath = currentPath;
                clearLogFilter();
            }
        });
    })();
}
