// ==UserScript==
// @name         FortiGate Log Search Filter auto clear
// @description  automatically clears Log Search Filter on the FortiGates Webinterface
// @author       Johannes Fankhauser
// @version      2025-08-20
// @updateURL    https://raw.githubusercontent.com/fankijo/FortiGate-Log-Search-Filter-auto-clear/refs/heads/main/script.js
// @downloadURL  https://raw.githubusercontent.com/fankijo/FortiGate-Log-Search-Filter-auto-clear/refs/heads/main/script.js
// @grant        none
// ==/UserScript==

//URL Matching has to be done in the Tampermonkey Script Settings because these Settings can work with Regex ant the @match cant.

const host = window.location.hostname;
const title = document.title;


if (title.includes('FortiGate') && (host.startsWith('fw-') || host.includes('-fw'))) {

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


        //Event Listener for URL Changes
        let lastPath = getPath(location.href);
        clearLogFilter(); //Initial Call

        new MutationObserver(() => {
            const currentPath = getPath(location.href);
            if (currentPath !== lastPath) {
                lastPath = currentPath;
                clearLogFilter();
            }
        }).observe(document, {subtree: true, childList: true});


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
