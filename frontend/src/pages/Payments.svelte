<script lang="ts">
  import { onMount } from "svelte";
  import LiveCodeDisplay from "../lib/LiveCodeDisplay.svelte";
  import type { Payment } from "../types/Payment";
  import SimpleTable from "../lib/SimpleTable.svelte";
  import { buildPaymentsUrl } from "../endpoints";
  import { gameStore } from "../store";

  let payments: Payment[] = [];
  let paymentName: string = "";
  let paymentAmount: number | undefined;
  onMount(async () => {
    const response = await fetch(buildPaymentsUrl());
    const { payments: fetchedPayments } = await response.json();
    payments = fetchedPayments;
  });

  async function createPayment() {
    if(!paymentName || !paymentAmount) {
      return;
    }

    const response = await fetch(buildPaymentsUrl(), {
      method: "POST",
      body: JSON.stringify({
        name: paymentName,
        amount: paymentAmount,
        code: $gameStore?.code,
      }),
    });

    const { payment } = await response.json();
    payments.push(payment);
    
    // This is a svelte quirk for triggering hydration
    // This is fixed in svelte 5 (not out yet)
    payments = payments;

    paymentName = "";
    paymentAmount = undefined;
  }
</script>

<div class="flex flex-col flex-1 m-4">
  <LiveCodeDisplay code={$gameStore?.code} isLive={!!$gameStore} />
  <div class="flex gap-4 mb-10 mt-10">
    <div>
      <p>Name</p>
      <input disabled={!$gameStore} class={`${!$gameStore ? 'cursor-not-allowed' : 'cursor-auto'}`} type="text" placeholder="name" bind:value={paymentName} />
    </div>
    <div>
      <p>Amount</p>
      <input disabled={!$gameStore} class={`${!$gameStore ? 'cursor-not-allowed' : 'cursor-auto'}`} type="number" placeholder="amount" bind:value={paymentAmount} />
    </div>
    <button disabled={!$gameStore} class={`${!$gameStore ? 'cursor-not-allowed' : 'cursor-auto'}`} on:click={createPayment}>+ Add</button>
  </div>
  <div>
    <SimpleTable
      rows={payments}
      cols={[{ display: "Name", key: "name", spacing: "0.75" }, { display: "Amount", key: "amount" }, { display: "Code", key: "code" }]}
    />
  </div>
</div>
