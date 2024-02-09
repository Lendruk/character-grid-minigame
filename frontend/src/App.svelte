<script lang="ts">
  import Clock from './lib/Clock.svelte';
  import Grid from './lib/GameGrid.svelte';
  import type { Game } from './types/Game';

  let bias = "";
  let game: Game | undefined = undefined;
  let systemTime: number = 0;
  let pollingIntervalId: number = 0;
  async function startGame() {
    await createGame();
    pollingIntervalId = setInterval(async () => {
      if(game?.id) {
        await refreshGame(game.id);
      }
    }, 2000);
  }

  function stopGame() {
    game = undefined;
    systemTime = 0;
    clearInterval(pollingIntervalId);
  }

  async function createGame() {
    const response = await fetch(`http://localhost:8080/game?bias=${bias}`, { method: "POST" });
    const {game: fetchedGame, systemTime: fetchedSystemTime } = await response.json();
    console.log(fetchedGame);
    game = fetchedGame;
    systemTime = fetchedSystemTime;
  }

  async function refreshGame(gameId: string) {
    const response = await fetch(`http://localhost:8080/game/${gameId}?bias=${bias}`, { method: "PUT" });
    const {game: fetchedGame, systemTime: fetchedSystemTime } = await response.json();
    console.log(fetchedGame);
    game = fetchedGame;
    systemTime = fetchedSystemTime;
  }
</script>

<main class="flex flex-col flex-1 m-4">
  <div class="flex justify-between relative">
    <div class="flex flex-col">
      <p>Bias:</p>
      <input type="text" placeholder="Character" bind:value={bias} />
    </div>
    <div class="absolute left-[50%] right-[50%] translate-x-[-50%] w-[10%]">
      <Clock time={systemTime} />
    </div>
    <div class="min-w-40 flex justify-end">
      <button on:click={() => game ? stopGame() : startGame()}>
        {#if game}
          Stop
        {:else}
          Generate 2D Grid
        {/if}
      </button>
    </div>
  </div>
  <div class="flex items-center justify-center flex-1">
    {#if game}
      <Grid grid={game.grid} />
    {:else}
      <div>
        To start generate a new grid
      </div>
    {/if}
  </div>
  <div class="flex flex-col self-center">
    <div class="flex self-center">
      {#if game}
        LIVE
      {:else}
        IDLE
      {/if}
    </div>
    <div>
      YOUR CODE: {game?.code ?? ''}
    </div>
  </div>
</main>