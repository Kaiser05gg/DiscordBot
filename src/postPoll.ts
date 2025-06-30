import { Client, TextChannel } from "discord.js";

export async function postPoll(client: Client, channelId: string) {
  const channel = client.channels.cache.get(channelId) as TextChannel;
  if (!channel || !channel.isTextBased()) {
    console.error("❌ チャンネルが見つからないかテキストチャンネルではありません");
    return;
  }

  const message = await channel.send("📊 **今日の予定は？**\n以下の中から選んでください！");
  const reactions = ["🕗", "🕣", "🕘", "🕙", "❓"]; // 〜８, ８〜９, ９, １０〜, 時間未定

  for (const emoji of reactions) {
    await message.react(emoji);
  }
}
