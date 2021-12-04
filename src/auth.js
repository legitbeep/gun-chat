import GUN from "gun";
import "gun/sea";
import "gun/axe";
import { writable } from "svelte/store"; // reactive store

export const db = GUN();

// current user
export const curUser = db.user().recall({ sessionStorage: true });

// get user name
// user.get("alias");

// set up username in store
export const username = writable("");

// update username throughout the store
curUser.get("alias").on((newName) => username.set(newName));

// handle auth state
db.on("auth", async (e) => {
  const newName = await curUser.get("alias");
  // update user
  username.set(newName);
});
