<script lang="ts">
  import Clock from "../lib/Clock.svelte";
  import GameGrid from "../lib/GameGrid.svelte";
  import LiveCodeDisplay from "../lib/LiveCodeDisplay.svelte";
  import { biasStore, gameStore, systemTimeStore } from "../store";
  import { buildGamesUrl, buildSetBiasUrl } from "../endpoints";

  async function startGame() {
    await createGame();
  }

  async function stopGame() {
    gameStore.set(undefined);
    systemTimeStore.set(0);
    biasStore.set('');
    await fetch(`${buildGamesUrl()}`, { method: "DELETE" });
  }

  async function createGame() {
    const response = await fetch(`${buildGamesUrl()}?bias=${$biasStore.charAt(0)}`, {
      method: "POST",
    });
    const { game: fetchedGame, systemTime: fetchedSystemTime } =
      await response.json();
    console.log(fetchedGame);
    gameStore.set(fetchedGame);
    systemTimeStore.set(fetchedSystemTime);
  }

  async function onCharacterInputChange() {
    const response = await fetch(buildSetBiasUrl($biasStore.charAt(0)), {
      method: "PUT",
    });
    const responseBody = await response.json();

    // if(!responseBody.isUpdateSuccessful) {
    // }
  }

</script>

<div class="flex flex-col flex-1 m-4">
  <div class="flex justify-between relative">
    <div class="flex flex-col">
      <p>Bias:</p>
      <input
        type="text"
        placeholder="Character"
        disabled={!$gameStore}
        class={`${$gameStore ? 'cursor-auto' : 'cursor-not-allowed'}`}
        on:change={onCharacterInputChange}
        bind:value={$biasStore}
      />
    </div>
    <div class="absolute left-[50%] right-[50%] translate-x-[-50%] w-[10%]">
      <Clock time={$systemTimeStore} />
    </div>
    <div class="min-w-40 flex justify-end">
      <button on:click={() => ($gameStore ? stopGame() : startGame())}>
        {#if $gameStore}
          Stop
        {:else}
          Generate 2D Grid
        {/if}
      </button>
    </div>
  </div>
  <div class="flex items-center justify-center flex-1">
    {#if $gameStore}
      <GameGrid grid={$gameStore.grid} />
    {:else}
      <div>To start generate a new grid</div>
    {/if}
  </div>
  <LiveCodeDisplay isLive={!!$gameStore} code={$gameStore?.code ?? ""} />
</div>
