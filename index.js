const {
    CommandoClient
} = require('discord.js-commando');
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

    // Initialize the SQL table
    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
    if (!table['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
        // Ensure that the "id" row is always unique and indexed.
        sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }

    // And then we have two prepared statements to get and set the score data.
    client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
    client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
});

client.login(config.token);