import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import { scheduleDailyPoll } from "./schedule";
import { Events } from "discord.js";
import  express from "express";
config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Bot is running!');
});

app.listen(PORT, () => {
  console.log(`Web server listening on port ${PORT}`);
});


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




//以下はテスト用

// import { postPoll } from "./postPoll"; 
// const channelId = process.env.CHANNEL_ID as string;
// client.once("ready", async () => {
//   console.log(`Logged in as ${client.user?.tag}`);
//   await postPoll(client,channelId);
// });
