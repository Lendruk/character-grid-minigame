<script lang="ts">
  import { buildLoginUrl, buildRegisterUrl } from "../endpoints";
  import { HttpService } from "../services/HttpService";
  import { userSessionStore } from "../store";
  import Modal from "./Modal.svelte";
  type RegisterPayload = {
    user: { name: string };
    token: string;
  };

  type LoginPayload = {
    token: string;
  };
  export let isOpen = false;

  let showSignup = false;
  let userName = "";
  let password = "";
  let loginError = false;

  async function login() {
    try {
      const response = await HttpService.post<LoginPayload>(buildLoginUrl(), {
        name: userName,
        password,
      });
      userSessionStore.set({ name: userName, token: response.token });
      cleanModal();
    } catch (error) {
      loginError = true;
    }
  }

  async function registerUser() {
    try {
      const response = await HttpService.post<RegisterPayload>(
        buildRegisterUrl(),
        { name: userName, password },
      );
      userSessionStore.set({ name: response.user.name, token: response.token });
    } catch (error) {
      //TODO: Give feedback on error
    }
    cleanModal();
  }

  function cleanModal() {
    userName = "";
    password = "";
    isOpen = false;
    showSignup = false;
    loginError = false;
  }
</script>

<Modal bind:showModal={isOpen}>
  <div class="flex justify-center mt-4">
    {#if showSignup}
      <div>Sign up</div>
    {:else}
      <div>Sign in</div>
    {/if}
  </div>
  <div class="m-4 flex flex-col flex-1 gap-2">
    <div class="flex gap-2 flex-1 flex-col">
      <p>Name</p>
      <input type="text" placeholder="name" bind:value={userName} />
    </div>
    <div class="flex gap-2 flex-1 flex-col">
      <p>Password</p>
      <input type="password" placeholder="password" bind:value={password} />
    </div>
    {#if loginError}
      <span class={"text-red-700"}
        >Wrong password or account does not exist</span
      >
    {/if}
    <div class="flex justify-end mt-4">
      <button
        disabled={!userName || !password}
        class={`${!userName || !password ? "cursor-not-allowed" : ""}`}
        on:click={() => (showSignup ? registerUser() : login())}
      >
        {#if showSignup}
          Create Account
        {:else}
          Login
        {/if}
      </button>
    </div>
  </div>
  <div class="mb-4">
    {#if showSignup}
      <div>
        Sign up or <a
          class="cursor-pointer"
          on:click={() => (showSignup = false)}>login</a
        >
      </div>
    {:else}
      <div>
        Sign in or <a
          class="cursor-pointer"
          on:click={() => (showSignup = true)}>create a new account</a
        >
      </div>
    {/if}
  </div>
</Modal>
