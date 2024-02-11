<script lang='ts'>
  import Router, { link } from 'svelte-spa-router';
  import Game from './pages/Game.svelte';
  import NotFound from './pages/NotFound.svelte';
  import Payments from './pages/Payments.svelte';
    import { backendConnectionStatusStore } from './store';
    import { ConnectionStatus } from './types/ConnectionStatus';

  const routes = {
    '/': Game,
    '/payments': Payments,
    '*': NotFound
  }
</script>

<main class="flex flex-1 flex-col">
  <div class="flex pl-2 pt-4 pb-4 bg-slate-950">
    <a class="pr-2 pl-2" use:link={{ href: "/"}} >Game</a>
    <a use:link={{ href: "/payments"}}>Payments</a>
  </div>
  <Router {routes} />
  {#if $backendConnectionStatusStore === ConnectionStatus.DISCONNECTED} 
    <div class="flex justify-center">
      <div class="bg-red-900 text-xl p-4 rounded-md m-4">
        Connection to the system has been lost, please try refreshing your page
      </div>
    </div>
  {/if}
</main>