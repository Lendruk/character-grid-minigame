<script lang="ts">
  import { onMount } from "svelte";
  import LiveCodeDisplay from "../lib/LiveCodeDisplay.svelte";
  import type {
    Payment,
    PaymentWithCalculatedGridSize,
  } from "../types/Payment";
  import SimpleTable from "../lib/SimpleTable.svelte";
  import { buildPaymentsUrl } from "../endpoints";
  import { gameStore, paymentStore } from "../store";
  import { HttpService } from "../services/HttpService";

  let payments: PaymentWithCalculatedGridSize[] = [];
  let paymentName: string = "";
  let paymentAmount: number | undefined;
  onMount(async () => {
    const response = await HttpService.get<{ payments: Payment[] }>(
      buildPaymentsUrl(),
    );
    const { payments: fetchedPayments } = response;
    paymentStore.set(fetchedPayments);
  });

  async function createPayment() {
    if (!paymentName || !paymentAmount) {
      return;
    }

    const response = await HttpService.post<{ payment: Payment }>(
      buildPaymentsUrl(),
      {
        name: paymentName,
        amount: paymentAmount,
        code: $gameStore?.code,
      },
    );

    const { payment } = response;
    payments.push({
      ...payment,
      gridSize: payment.grid.sizeX * payment.grid.sizeY,
    });

    // This is a svelte quirk for triggering hydration
    // This is fixed in svelte 5 (not out yet)
    payments = payments;

    paymentName = "";
    paymentAmount = undefined;
  }

  $: {
    payments = $paymentStore.map((payment) => ({
      ...payment,
      gridSize: payment.grid.sizeX * payment.grid.sizeY,
    }));
  }
</script>

<div class="flex flex-col flex-1 m-4">
  <LiveCodeDisplay code={$gameStore?.code ?? ''} isLive={!!$gameStore} />
  <div class="flex gap-4 mb-10 mt-10">
    <div>
      <p>Name</p>
      <input
        disabled={!$gameStore}
        class={`${!$gameStore ? "cursor-not-allowed" : "cursor-auto"}`}
        type="text"
        placeholder="name"
        bind:value={paymentName}
      />
    </div>
    <div>
      <p>Amount</p>
      <input
        disabled={!$gameStore}
        class={`${!$gameStore ? "cursor-not-allowed" : "cursor-auto"}`}
        type="number"
        placeholder="amount"
        bind:value={paymentAmount}
      />
    </div>
    <button
      disabled={!$gameStore}
      class={`${!$gameStore ? "cursor-not-allowed" : "cursor-auto"}`}
      on:click={createPayment}>+ Add</button
    >
  </div>
  <div>
    <SimpleTable
      rows={payments}
      cols={[
        { display: "Name", key: "name", spacing: "0.75" },
        { display: "Amount", key: "amount" },
        { display: "Code", key: "code" },
        { display: "Grid", key: "gridSize" },
      ]}
    />
  </div>
</div>
