<script lang="ts">
  import type { Grid } from "../types/Grid";
  export let grid: Grid;
  let orderedGridCells: string[] = [];

  $: orderedGridCells = (() => {
    let newArr: string[] = [];
    for (let x = 0; x < grid.size.x; x++) {
      for (let y = 0; y < grid.size.y; y ++) {
        newArr.push(grid.cells[grid.size.x * y + x]);
      }
    }

    return newArr;
  })()
</script>

<div class="grid grid-rows-10 grid-cols-10">
  {#each orderedGridCells as cell}
    <div class="border-slate-700 border p-8 w-10 h-10 flex items-center justify-center">
      {cell}
    </div>
  {/each}
</div>