<script lang="ts">
  import { writable } from "svelte/store";
  import Clock from "../lib/Clock.svelte";
  import GameGrid from "../lib/GameGrid.svelte";
  import LiveCodeDisplay from "../lib/LiveCodeDisplay.svelte";
  import { gameStore, pollingIntervalIdStore, systemTimeStore } from "../store";
    import { buildGameUrl, buildGamesUrl } from "../endpoints";
  let bias = "";

  async function startGame() {
    await createGame();
    pollingIntervalIdStore.set(setInterval(async () => {
      if($gameStore?.id) {
        await refreshGame($gameStore.id);
      }
    }, 2000));
  }

  function stopGame() {
    gameStore.set(undefined)
    systemTimeStore.set(0);
    clearInterval($pollingIntervalIdStore);
  }

  async function createGame() {
    const response = await fetch(`${buildGamesUrl()}?bias=${bias}`, { method: "POST" });
    const {game: fetchedGame, systemTime: fetchedSystemTime } = await response.json();
    console.log(fetchedGame);
    gameStore.set(fetchedGame);
    systemTimeStore.set(fetchedSystemTime);
  }

  async function refreshGame(gameId: string) {
    const response = await fetch(`${buildGameUrl(gameId)}?bias=${bias}`, { method: "PUT" });
    const {game: fetchedGame, systemTime: fetchedSystemTime } = await response.json();
    console.log(fetchedGame);
    gameStore.set(fetchedGame);
    systemTimeStore.set(fetchedSystemTime);
  }
</script>

<div class="flex flex-col flex-1 m-4">
  <div class="flex justify-between relative">
    <div class="flex flex-col">
      <p>Bias:</p>
      <input type="text" placeholder="Character" bind:value={bias} />
    </div>
    <div class="absolute left-[50%] right-[50%] translate-x-[-50%] w-[10%]">
      <Clock time={$systemTimeStore} />
    </div>
    <div class="min-w-40 flex justify-end">
      <button on:click={() => $gameStore ? stopGame() : startGame()}>
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
      <div>
        To start generate a new grid
      </div>
    {/if}
  </div>
  <LiveCodeDisplay isLive={!!$gameStore} code={$gameStore?.code ?? ''} />
</div>