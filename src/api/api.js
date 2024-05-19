const BASE_URL = "https://crudcrud.com/api/949745c30bbe49f1aa73d265ec5b8b6e";

export const createUser = async (payload) => {
  await fetch(`${BASE_URL}/users`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.json();
  });
};

export const updateUsers = async (payload, id) => {
  await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    return res;
  });
};

export const getUsers = async () => {
  let response = await fetch(`${BASE_URL}/users`, {
    method: "GET",
    mode: "cors",
  });
  return response.json();
};

export const deleteUser = async (id) => {
  let response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
    mode: "cors",
  });

  return response;
};
