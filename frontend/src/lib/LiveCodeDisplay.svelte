<script lang="ts">
  export let isLive = false;
  export let code = '';
</script>

<div class="flex flex-col self-center">
  <div class="flex self-center">
    {#if isLive}
      LIVE
    {:else}
      IDLE
    {/if}
  </div>
  <div>
    YOUR CODE: {code}
  </div>
</div>