<script>
  import Login from "./Login.svelte";
  import { username, curUser } from "./auth";
  import { onMount } from "svelte";

  import GUN from "gun";
  const db = GUN();

  let newMsg;
  let messages = [];
  // Runs only when component is initialized
  onMount(() => {
    db.get("chat")
      .map()
      .once(async (data, id) => {
        if (data) {
          // for encryption
          const key = "#boo";

          var message = {
            // convert data
            who: await db.user(data).get("alias"), // user that sent
            what: (await SEA.decrypt(data.what, key)) + "", // data that sent
            when: GUN.state.is(data, "what"), // when sent
          };

          if (message.what) {
            // only store 100 messages at a time
            messages = [...messages.slice(-100), message];
          }
        }
      });
  });

  const sendMessage = async () => {
    const secret = await SEA.encrypt(newMessage, "#boo"); // same key for decryption required
    const message = curUser.get("all").set({ what: secret });
    const index = new Date().toISOString();
    db.get("chat").get(index).put(message);
  };
</script>

<main class="container">
  {#if $username}
    <article>
      <!-- to sort messages using when key -->
      {#each messages as message (message.when)}
        <p>{message.what}</p>
      {/each}
    </article>
    <form on:submit|preventDefault={sendMessage} />
  {:else}
    <article><Login /></article>
  {/if}
</main>
