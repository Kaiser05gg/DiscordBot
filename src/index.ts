// import dotenv from 'dotenv';
// dotenv.config();
import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import { scheduleDailyPoll } from "./schedule";

config();



const client = new Client({
  intents: [GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
     GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessageReactions]
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user?.tag}`);
  scheduleDailyPoll(client);
});

client.login(process.env.DISCORD_TOKEN);




import { Events } from "discord.js";

client.on(Events.MessageReactionAdd, async (reaction, user) => {
  if (user.bot) return;

  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("リアクション取得エラー:", error);
      return;
    }
  }

  const message = reaction.message;
  const userReactions = message.reactions.cache.filter(r =>
    r.users.cache.has(user.id)
  );

  for (const r of userReactions.values()) {
    if (r.emoji.name !== reaction.emoji.name) {
      await r.users.remove(user.id);
    }
  }
});




import { postPoll } from "./postPoll"; // ← 追加（すでにしてあればOK）
const channelId = process.env.CHANNEL_ID as string;
client.once("ready", async () => {
  console.log(`Logged in as ${client.user?.tag}`);
  await postPoll(client,channelId); // ← 強制実行！
  // scheduleDailyPoll(client); ← コメントアウトしてもOK
});
