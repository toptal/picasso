

// Mock for IntersectionObserver
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
    this.observables = [];
  }

  observe(element) {
    this.observables.push(element);
    this.callback([{ isIntersecting: true, target: element }]); // Customize as needed
  }

  unobserve(element) {
    this.observables = this.observables.filter(obs => obs !== element);
  }

  disconnect() {
    this.observables = [];
  }
}

// Mock global IntersectionObserver
global.IntersectionObserver = IntersectionObserverMock;
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// jsdom does not implement PointerEvent, which components dispatch when
// activating controls (e.g. a control that forwards clicks to a hidden input).
// Extend MouseEvent so modifier-key params still flow through.
if (typeof global.PointerEvent === 'undefined') {
  global.PointerEvent = class PointerEvent extends MouseEvent {
    constructor(type, params = {}) {
      super(type, params);
      this.pointerId = params.pointerId;
      this.pointerType = params.pointerType;
    }
  };
}
