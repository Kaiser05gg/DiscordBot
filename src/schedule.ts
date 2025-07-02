import { Client } from "discord.js";
import cron from "node-cron";
import { postPoll } from "./postPoll";

export function scheduleDailyPoll(client: Client) {
  cron.schedule("0 12 * * *", () => {
    const channelId = process.env.CHANNEL_ID;
    if (!channelId) {
      console.error("❌ CHANNEL_ID is not defined in .env");
      return;
    }
    postPoll(client, channelId);
  });
}


// schedule.ts
import cron from "node-cron";
import * as cronTimeGenerator from "cron-time-generator";
import { TextChannel, Client } from "discord.js";

// JSTに合わせたスケジューラ
export function scheduleClosePoll(client: Client, channelId: string, messageId: string, closeTime: Date) {
  // JSTに変換（UTC + 9時間）
  const jstTime = new Date(closeTime.getTime() + 9 * 60 * 60 * 1000);

  // cron-time-generatorでcron式を生成（JSTに合わせる）
  const cronExpr = cronTimeGenerator.at(jstTime);

  cron.schedule(cronExpr, async () => {
    const channel = await client.channels.fetch(channelId);
    if (!channel?.isTextBased()) return;

    const message = await channel.messages.fetch(messageId);
    const reactionCounts = message.reactions.cache.map(
      r => `${r.emoji.name}: ${r.count - 1}`
    ).join("\n");

    await message.reply(`🛑 投票を締め切りました！\n📊 結果:\n${reactionCounts}`);
  });

  console.log(`[⏰] 投票締切をJST ${jstTime.toLocaleString('ja-JP')} に設定しました`);
}
