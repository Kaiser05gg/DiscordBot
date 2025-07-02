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
