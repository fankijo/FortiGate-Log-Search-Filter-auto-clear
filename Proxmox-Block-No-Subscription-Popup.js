// ==UserScript==
// @name         Proxmox Block No Subscription Popup
// @description  Suppresses the "No valid subscription" Dialog in Proxmox VE.
// @author       fankijo
// @version      2025-09-15
// @updateURL    https://raw.githubusercontent.com/fankijo/Tampermonkey-Scripts/refs/heads/main/Proxmox-Block-No-Subscription-Popup.js
// @downloadURL  https://raw.githubusercontent.com/fankijo/Tampermonkey-Scripts/refs/heads/main/Proxmox-Block-No-Subscription-Popup.js
// @grant        none
// ==/UserScript==

// Manually add your Proxmox URL (https://pve.example.org/*) to User Match
// It is not necessary to specify the port in the URL

(function () {
  'use strict';

  function tryWrap() {
    if (window.Ext && Ext.Msg && typeof Ext.Msg.show === 'function') {
      const origShow = Ext.Msg.show.bind(Ext.Msg);

      Ext.Msg.show = function (cfg) {
        try {
          const title = (cfg && cfg.title) || (arguments.length && arguments[0]) || '';
          if (String(title).toLowerCase().includes('no valid subscription')) {
            console.log('🚫 Proxmox No Subscription Popup blocked');
            if (cfg && typeof cfg.callback === 'function') {
              setTimeout(() => {
                try { cfg.callback('ok'); } catch (e) { console.error(e); }
              }, 0);
            }
            return; // Dont show Dialog
          }
        } catch (e) {
          console.error('🚫 Error in Ext.Msg.show wrapper', e);
        }
        return origShow.apply(this, arguments);
      };

      console.log('✅ No Subscription Popup Blocker active');
      return true;
    }
    return false;
  }

  // Polling until Ext is loaded
  const handle = setInterval(() => {
    if (tryWrap()) clearInterval(handle);
  }, 100);

  // end after 10s
  setTimeout(() => clearInterval(handle), 10000);
})();
