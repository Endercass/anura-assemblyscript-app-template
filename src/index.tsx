import { wasm_hello } from "@wasm/dist.js";

(window as any).wasm_hello = wasm_hello;

function App(props: {
  browser: any;
  url: string;
  nameList: string[];
  wasm_hello: (name: string) => string;
}) {
  this.browser ??= props.browser;
  this.url ??= props.url;
  this.wasm_hello ??= props.wasm_hello;
  this.hello_string ??= "Click button to generate a random greeting.";

  return (
    <div>
      <h1>Anura TypeScript and AssemblyScript Example</h1>
      <button on:click={() => this.browser.openTab(props.url)}>
        Open <a href={props.url}>Google</a>
      </button>
      <button
        on:click={() => {
          const name =
            props.nameList[Math.floor(Math.random() * props.nameList.length)] +
            " " +
            props.nameList[Math.floor(Math.random() * props.nameList.length)];
          this.hello_string = this.wasm_hello(name);
        }}
      >
        {use(this.hello_string)}
      </button>
    </div>
  );
}

const browser = await anura.import("anura.libbrowser");

document.body.appendChild(
  <App
    browser={browser}
    wasm_hello={wasm_hello}
    nameList={["Michael", "John", "Jane", "Alice(JS)", "Bob", "Carol", "Dave"]}
    url="https://www.google.com/"
  />
);
