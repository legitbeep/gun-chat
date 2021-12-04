<script>
  import { usename, user, username } from "./auth";

  const signout = () => {
    user.leave(); // gun js stuff
    username.set(""); // remove username from store
  };
</script>

<header>
  <h1>Gun-Chat</h1>
  <!--"$" is used to subscribe to the store and react to updates -->
  {#if $username}
    <nav class="username">
      <h1>{$username}</h1>
      <img
        src={`https://avatars.dicebear.com/api/avataaars/${$username}.svg`}
        alt={$username}
      />
    </nav>
    <button class="logout-btn" on:click={signout}>Logout</button>
  {/if}
</header>
