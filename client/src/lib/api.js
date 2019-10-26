async function getAllUsers() {
  const APIURL = new URL("http://localhost:5000/users");

  return fetch(APIURL).then(result => {
    return result.json();
  });
}

async function getUserByUsername(username) {
  const APIURL = new URL("http://localhost:5000/users/" + username);

  return fetch(APIURL).then(result => {
    return result.json();
  });
}

async function updateUserTweet(user) {
  const APIURL = new URL("http://localhost:5000/users/" + user.username);

  return fetch(APIURL.href, {
    method: "PUT",
    body: JSON.stringify({tweet: user.tweet}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

async function addUser(user) {
  const APIURL = new URL("http://localhost:5000/users/");

  return fetch(APIURL.href, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

const API = {
  getAllUsers,
  getUserByUsername,
  updateUserTweet,
  addUser
};
export default API;
