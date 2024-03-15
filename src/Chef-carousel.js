import singleSpaSvelte from "single-spa-svelte";
import App from "./App.svelte";

const svelteLifecycles = singleSpaSvelte({
  component: App,
});

export let mountParcel = undefined
export const bootstrap = [
  (props) => {
    mountParcel = props.mountParcel
    return Promise.resolve()
  }
]

export const { mount, unmount } = svelteLifecycles;
