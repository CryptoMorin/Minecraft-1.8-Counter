// Only add setZeroTimeout to the window object, and hide everything
// else in a closure.
(function() {
    var timeouts = [];
    const timeoutMessage = "zero-timeout",
        intervalMessage = "zero-interval";

    // Like setTimeout, but only takes a function argument.  There's
    // no time argument (always zero) and no arguments (you have to
    // use a closure).
    function setZeroTimeout(fn) {
        timeouts.push(fn);
        window.postMessage(timeoutMessage, "*");
    }

    function handleMessage(event) {
        if (event.source == window) {
            if (event.data == timeoutMessage) {
                event.stopPropagation();
                if (timeouts.length > 0) {
                    const fn = timeouts.shift();
                    fn();
                }
            } else if (event.data == intervalMessage) {
                event.stopPropagation();
            }
        }
    }

    window.addEventListener("message", handleMessage, true);

    // Add the one thing we want added to the window object.
    window.setZeroTimeout = setZeroTimeout;
})();

function ZeroInterval(handle) {
    const DOM_MIN_TIMEOUT_VALUE = 10;
    this.handle = handle;
    this.timers = [];

    // Constructor
    for (let i = 0; i < DOM_MIN_TIMEOUT_VALUE; i++) {
        this.timers[i] = setInterval(handle, 10);
    }

    function clearInterval() {
        for (const timer of timers) clearInterval(timer);
    }
}