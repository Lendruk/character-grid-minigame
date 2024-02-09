<script lang="ts">
  export let time: number;
  let formattedDate = '';

  $: formattedDate = (() => {
    const date = new Date(time);

    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  })()
</script>

<div class="flex flex-col flex-1 justify-center items-center">
  {#if time}
    <div>
      System Time
    </div>
    <div>
      {formattedDate}
    </div>
  {/if}
</div>