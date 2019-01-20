const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const config = require("./config.json");

const SQLite = require("better-sqlite3");
const sql = new SQLite("DB/points.sql")

const client = new CommandoClient({
    commandPrefix: "\\",
    owner: "118455061222260736",
    disableEveryone: true
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['points', "Points"],
        ['owner', "Owner Commands"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on("ready", () => {
    console.log("Initialized successfully");
    client.user.setActivity("fantastic indie games.");
});

client.login(config.token);