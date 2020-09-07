const users = [];

const addUser = ({ id, name, testRoom }) => {
  name = name.trim().toLowerCase();
  testRoom = testRoom.trim().toLowerCase();

  const existingUser = users.find(
    user => user.testRoom === testRoom && user.name === name
  );

  if (existingUser) {
    return { error: 'Username is taken' };
  }
  const user = { id, name, testRoom };
  users.push(user);
  console.log(users);
  return { user };
};

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);
  return users.splice(index, 1);
};

const getUser = id => users.find(user => user.id === id);

const getUsersIntestRoom = testRoom =>
  users.find(user => user.testRoom === testRoom);

module.exports = { addUser, removeUser, getUser, getUsersIntestRoom };
