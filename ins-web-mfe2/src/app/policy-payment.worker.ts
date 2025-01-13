/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  postMessage(response);
});
function processData(data: unknown) {
  // process the data here
  return "Web worker postmessage called for ${data}";
}