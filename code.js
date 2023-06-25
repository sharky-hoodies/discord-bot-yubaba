const { Client } = require("discord.js");
const options = { intents: ["GUILDS", "GUILD_MESSAGES"] };
const client = new Client(options);

client.on("ready", (message) => {
  console.log("Bot準備完了！");
});

// どのチャンネルでも湯婆婆botにメンションつけたコメントをすれば発火する
client.on("message", (msg) => {
  if (msg.author.id === client.user.id) {
    return msg;
  }
  if (msg.mentions.has(client.user)) {
    // Discordサーバ管理者の名前は権限的に名前を変更できないため別扱い
    if (msg.author.id === process.env.DISCORD_ADMIN_ID) {
      msg.channel.send(
        `お客様とて許せん。大戸を空けなぁ、お帰りだ！！！！！！！`
      );
      msg.channel.send({
        embeds: [
          {
            description: "八百長の神様のご来店",
            footer: { text: "海神さまのおかえり" },
            image: { url: "https://www.ghibli.jp/gallery/chihiro048.jpg" },
          },
        ],
      });
      return;
    }
    const dspName = msg.member.displayName;
    // 2文字の名前の人(名前を取られた人)
    if (dspName.length <= 2) {
      msg.guild.members.cache.get(msg.author.id).setNickname(null);
      msg.channel.send(
        `ここはね、人間の来るところじゃないんだ。八百万の神様達が疲れをいやしに来るお湯屋なんだよ。`
      );
      msg.channel.send(`分かったらさっさとお帰り、、<@!${msg.author.id}>。`);
    } else if (2 < dspName.length) {
      const random = Math.round(Math.random() * dspName.length - 2);
      const newName = dspName.substring(random, random + 2);
      msg.guild.members.cache.get(msg.author.id).setNickname(newName);
      msg.channel.send("贅沢な名だね. ");
      msg.channel.send(
        `いまからお前の名前は<@!${msg.author.id}>だ。いいかい...<@!${msg.author.id}>だよ。わかったら返事をするんだ、<@!${msg.author.id}>！！！！`
      );
    } else {
      msg.guild.members.cache.get(msg.author.id).setNickname(null);
      msg.channel.send("貧相な名だね. ");
    }
    return;
  }
});
// おみくじbotくんもできたり..
// client.on('message', message =>{
//   if (message.author.id == client.user.id || message.author.bot){
//     return;
//   }
//   if (message.content.match(/^！おみくじ/) ||
//       (message.isMemberMentioned(client.user) && message.content.match(/おみくじ/))){
//     let arr = ["大吉", "吉", "凶", "ぽてと", "にゃ～ん", "しゅうまい君"];
//     lottery(message.channel.id, arr);
//   }else if (message.isMemberMentioned(client.user)) {
//     sendReply(message, "呼びましたか？");
//   }
// });

// function lottery(channelId, arr){
//   let random = Math.floor( Math.random() * arr.length);
//   sendMsg(channelId, arr[random]);
// }
// function sendReply(message, text){
//  message.reply(text)
//    .then(console.log("リプライ送信: " + text))
//    .catch(console.error);
// }

// function sendMsg(channelId, text, option={}){
//  client.channels.get(channelId).send(text, option)
//    .then(console.log("メッセージ送信: " + text + JSON.stringify(option)))
//    .catch(console.error);
// }
client.login(process.env.DISCORD_BOT_TOKEN);
