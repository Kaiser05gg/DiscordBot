import { Client } from "discord.js";
import cron from "node-cron";
import { postPoll } from "./postPoll";

export function scheduleDailyPoll(client: Client) {
  // 毎日正午に実行（JST）
  cron.schedule("0 12 * * *", () => {
    const channelId = process.env.CHANNEL_ID;
    if (!channelId) {
      console.error("❌ CHANNEL_ID is not defined in .env");
      return;
    }
    postPoll(client, channelId);
  });
}
