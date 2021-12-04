<script>
  import { curUser } from "./auth";
  let username, password;

  const login = () => {
    curUser.authn(username, password, ({ err }) => err && alert(err));
  };

  const signup = () => {
    curUser.create(username, password, ({ err }) => {
      if (err) alert(err);
      else login();
    });
  };
</script>

<article>
  <label for="username">Username</label>
  <!-- bind used for 2-way binding, works like state -->
  <input
    name="username"
    bind:value={username}
    type="text"
    minlength="3"
    maxlength="16"
  />

  <label for="pass">Password</label>
  <input
    name="pass"
    bind:value={password}
    type="password"
    minlength="3"
    maxlength="16"
  />

  <button class="login" on:click={login}>Login</button>
  <button class="login" on:click={signup}>Sign Up</button>
</article>
