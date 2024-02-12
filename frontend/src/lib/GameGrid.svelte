<script lang="ts">
  import type { Grid } from "../types/Grid";
  export let grid: Grid;
  let orderedGridCells: string[] = [];

  $: orderedGridCells = (() => {
    let newArr: string[] = [];
    for (let x = 0; x < grid.size.x; x++) {
      for (let y = 0; y < grid.size.y; y++) {
        newArr.push(grid.cells[grid.size.x * y + x]);
      }
    }

    return newArr;
  })();
</script>

<div
  class="grid"
  style={`grid-template-rows: repeat(${grid.size.x}, minmax(0, 1fr)); grid-template-columns: repeat(${grid.size.y}, minmax(0, 1fr));`}
>
  {#each orderedGridCells as cell}
    <div
      class="border-slate-700 border w-16 h-16 flex-1 flex items-center justify-center"
    >
      {cell}
    </div>
  {/each}
</div>
