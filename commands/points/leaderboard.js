var { Command } = require('discord.js-commando');
const  SQLite = require('better-sqlite3');
const pointsDb = new SQLite('../../DB/points.sqlite');

module.exports = class LeaderboardCommand extends Command {
    constructor(client) {
        super(client, {
            name: "leaderboard",
            aliases: ["lb"],
            memberName: "leaderboard",
            group: "points",
            description: "Shows the server leaderboard",
            guildOnly: true
        });
    }

    run(msg) {

    }
}