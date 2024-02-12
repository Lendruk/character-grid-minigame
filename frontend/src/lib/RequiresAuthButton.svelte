<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";
  import { userSessionStore } from "../store";
  let cssClasses = '';
  export { cssClasses as class }
  export let disabled = false;
  export let onClick = () => {};
  function onButtonClick() {
    if(!$userSessionStore) {
      toast.push("Please login before using this feature");
    }
    onClick();
  }
</script>

<button disabled={disabled} class={cssClasses} on:click={onButtonClick}><slot/></button>