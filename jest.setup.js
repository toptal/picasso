

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
