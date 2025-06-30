// import dotenv from 'dotenv';
// dotenv.config();
import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import { scheduleDailyPoll } from "./schedule";

config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user?.tag}`);
  scheduleDailyPoll(client);
});

client.login(process.env.DISCORD_TOKEN);
