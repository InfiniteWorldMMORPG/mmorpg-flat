import { config } from '../../server/src/modules/Config/config.dev.ts'

const signIn = async (httpHost: string) => {
  const res = await fetch(`${httpHost}sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      login: 'testuser',
      password: 'testuser',
    }),
  });

  const token = await res.text();
  console.log(token);
  return token;
};

const listenConnect = async (sseHost: string, token: string) => {

  // const source = new EventSource(sseHost);
  // source.onmessage = (event) => {
  //   console.log("Received", event.data);
  // };

  const response = await fetch(`${sseHost}connect`, { method: "GET", headers: { "Authorization": `Bearer ${token}` } });
  const reader = response.body?.getReader();
  if (reader === null || reader === undefined) {
    console.log("No reader");
    console.log(response);
    return;
  }
  const decoder = new TextDecoder("utf-8");
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    console.log("Received", decoder.decode(value));
  }
};

const main = async () => {
  const sseHost = `${config.sseTransport.host}:${config.sseTransport.port}/`
  const httpHost = `${config.httpTransport.host}:${config.httpTransport.port}/`

  const token = await signIn(httpHost);
  listenConnect(sseHost, token);

  const data = {
    sourceCreatureId: 'bbc932e0-e3fa-42ca-9446-1528c8f47e8e',
    skillId
    targetCreatureId
    targetGlobalLocationId
  }
}

main();