
let userMap = new Map();

class User {
    constructor(username, password) {
        this._id = Math.floor(Math.random() * 10);
        this.username = username;
        this.password = password;
    }

    save(callback) {
        if (!userMap.has(this.username)) {
            userMap.set(this.username, this);
        }
        callback(null);
    }
}

User.getUser = function (username) {
    if (userMap.has(username)) {
        return userMap.get(username);
    }
    else {
        throw new Error("user was not found");
    }
};

User.getUserById = function (id) {
    let user = null;
    userMap.forEach(v => {
        if (v._id = id) {
            user = v;
            return;
        }
    });
    return user;
};



User.getAllUsers = function () {
    return userMap.values();
}

let initUser = new User("bob", "secret");
userMap.set(initUser.username, initUser);

module.exports = User;