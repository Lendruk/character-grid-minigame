<script lang="ts">
  export let time: number;
  let formattedDate = '';

  $: formattedDate = (() => {
    const date = new Date(time);
    const formattedHours = `${date.getHours() <= 9 ? '0': ''}${date.getHours()}`;
    const formattedMinutes = `${date.getMinutes() <= 9 ? '0': ''}${date.getMinutes()}`;
    const formattedSeconds = `${date.getSeconds() <= 9 ? '0': ''}${date.getSeconds()}`;
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
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