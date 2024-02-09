<script lang="ts">
  type Col = {
    key: string;
    display: string;
    spacing?: string;
  }

  type Row = {
    [index: string]: unknown;
  }
  export let rows: Row[] = [];
  export let cols: Col[] = [];
  let orderedRows: Row[] = [];

  $: orderedRows = (() => {
    let computedRows: Row[] = [];

    for(const row of rows) {
      let obj: Row = {};
      for(const col of cols) {
        if(Object.keys(row).includes(col.key)) {
          obj[col.key] = row[col.key];
        }
      }
      computedRows.push(obj);
    }

    return computedRows;
  })() 
</script>

<table class="flex flex-col flex-1">
  <thead class="flex flex-1">
    <tr class="flex flex-1 justify-between">
      {#each cols as col}
        <th class={`flex flex-1`}>{col.display}</th>
      {/each}
    </tr>
  </thead>
  <tbody class="flex flex-col flex-1">
    {#each orderedRows as row}
      <tr class="flex flex-1 justify-between">
        {#each Object.values(row) as cell}
          <td class="flex flex-1">{cell}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>