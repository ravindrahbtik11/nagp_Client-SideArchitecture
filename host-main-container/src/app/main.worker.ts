/// <reference lib="webworker" />
addEventListener('message', ({ data }) => {

  if(data === 'Stop') {
    postMessage('Web Worker stop called');
  }
  if(data === 'Start') {
    postMessage('Web Worker start called');
  }
});
