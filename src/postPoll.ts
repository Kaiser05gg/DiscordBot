import { Client, TextChannel } from "discord.js";

export async function postPoll(client: Client, channelId: string) {
  const channel = client.channels.cache.get(channelId) as TextChannel;
  if (!channel || !channel.isTextBased()) {
    console.error("❌ チャンネルが見つからないかテキストチャンネルではありません");
    return;
  }

  const reactions: { [emoji: string]: string } = {
    "1️⃣": "〜８時",
    "2️⃣": "８時〜９時",
    "3️⃣": "９時",
    "4️⃣": "１０時以降",
    "🤔": "時間不明",
    "❎": "不参加"
  };
  const description = Object.entries(reactions)
    .map(([emoji, label]) => `${emoji}：${label}`)
    .join("\n");

  const message = await channel.send(`**本日のVALORANT**\n以下から選んでください\n\n${description}`);
  for (const emoji of Object.keys(reactions)) {
    await message.react(emoji);
  }
}