# FortiGate Log Search Filter auto clear

Tampermonkey Script to automatically clear the Log Search Filters when navigating in the Webinterface.

## Site Matching

URL Matching is done inside the script itself. Depending on your Environment this needs to be customized.

```js
if (title.includes('FortiGate') && (host.startsWith('fw-') || host.includes('-fw')))
```


# Proxmox Block No Subscription Popup

Tampermonkey Script to block the "No valid Subscription" Popup in the Proxmox VE Webinterface.
