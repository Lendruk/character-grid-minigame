<script lang="ts">
  import Clock from "../lib/Clock.svelte";
  import GameGrid from "../lib/GameGrid.svelte";
  import LiveCodeDisplay from "../lib/LiveCodeDisplay.svelte";
  import { biasStore, gameStore, systemTimeStore } from "../store";
  import { buildGamesUrl, buildSetBiasUrl } from "../endpoints";
  import { HttpService } from "../services/HttpService";
  import type { Game as GameDef } from "../types/Game";
  import RequiresAuthButton from "../lib/RequiresAuthButton.svelte";

  async function startGame() {
    await createGame();
  }

  async function stopGame() {
    await HttpService.delete(`${buildGamesUrl()}`);
    gameStore.set(undefined);
    systemTimeStore.set(0);
    biasStore.set("");
  }

  async function createGame() {
    const { game: fetchedGame, systemTime: fetchedSystemTime } =
      await await HttpService.post<{ game: GameDef; systemTime: number }>(
        `${buildGamesUrl()}?bias=${$biasStore.charAt(0)}`,
        {},
      );
    gameStore.set(fetchedGame);
    systemTimeStore.set(fetchedSystemTime);
  }

  async function onCharacterInputChange() {
    await HttpService.put(buildSetBiasUrl($biasStore.charAt(0)), {});
    //TODO: Give feedback on error
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
        class={`${$gameStore ? "cursor-auto" : "cursor-not-allowed"}`}
        on:change={onCharacterInputChange}
        bind:value={$biasStore}
      />
    </div>
    <div class="absolute left-[50%] right-[50%] translate-x-[-50%] w-[10%]">
      <Clock time={$systemTimeStore} />
    </div>
    <div class="min-w-40 flex justify-end">
      <RequiresAuthButton onClick={() => ($gameStore ? stopGame() : startGame())}>
        {#if $gameStore}
          Stop
        {:else}
          Generate 2D Grid
        {/if}
      </RequiresAuthButton>
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
