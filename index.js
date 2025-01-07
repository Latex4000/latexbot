const { AttachmentPayload, ChatInputCommandInteraction, Client, DiscordAPIError, GatewayIntentBits, Message, Partials, REST, Routes } = require("discord.js");

const { TOKEN: token, CLIENT_ID: clientID } = process.env;
if (!token || !clientID)
    throw new Error("Missing environment variables");

const rest = new REST({ version: "10" }).setToken(token);
(async () => {
    console.log("Started refreshing slash (/) commands.");

    await rest.put(
        Routes.applicationCommands(clientID),
        // { body: commands.map(c => c.data) }
    );
})()
    .then(() => console.log(`Successfully refreshed slash (/) command`))
    .catch((error) => console.error("An error has occurred in refreshing slash (/) command", error));

const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Channel,
    ],
});

discordClient.login(token).then(async () => console.log("Logged in as " + discordClient.user?.tag));