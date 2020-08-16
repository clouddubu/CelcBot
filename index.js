const Discord = require("discord.js");
const { Client, RichEmbed } = require("discord.js");
const client = new Client();

const { get } = require("snekfetch");
const http = require("http");
const express = require("express");
const app = express();
const env = process.env;
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get("http://celcbot.glitch.me/");
}, 280000);

let config = require(__dirname + '/config.json');
let prefix = config.prefix;

client.on("message", async message => {
  if (!message.guild || message.author.bot) return;
  if (!message.content.toLowerCase().startsWith(prefix)) return;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  var mutedrole = message.guild.roles.find("name", "♦ Muted ♦");
  
  if (command === "help") {
    let embed = new RichEmbed()
    .setColor("RED") // Color for Embed
    .setTitle("Help Commands of " + config.name) // Title of Help
    .setDescription(
      "**:jigsaw: | General Commands**\n" +
      prefix +
      "help\n" +
      prefix +
      "ping\n" +
      prefix +
      "uptime\n" +
      prefix +
      "avatar\n" +
      prefix +
      "info\n" +
      prefix +
      "math <mathNumber>\n" +
      prefix +
      "eval <evalValue>\n" +
      prefix +
      "afk <customStatus>\n" +
      prefix +
      "unafk\n\n" +
      "**:video_game: | Fun Commands**\n" +
      prefix +
      "embsay\n" +
      prefix +
      "dice\n\n" +
      "**:closed_lock_with_key: | Staff Only**\n" +
      prefix +
      "kick\n" +
      prefix +
      "mute\n" +
      prefix +
      "unmute\n" +
      prefix +
      "ssay <message>\n" +
      prefix +
      "ctc <channel>\n" +
      prefix +
      "dlc <channel>\n" +
      prefix +
      "purge <number>\n" +
      prefix +
      "clear\n"
    ) // Description of Help
    .setFooter("CelticCronze ● CelticStuff Teams 2020")
    message.channel.send(embed);
  } else if (command === "invite") {
    let embed = new RichEmbed()
      .setColor("RED") // Color for Embed
      .setTitle("Click this link for invite this bot") // Title of Help
      .setAuthor("Invite this Bot")
      .setFooter("CelticCronze ● Server CelticStuff Teams 2020") // Footer Text
      .setURL(
        "https://discord.com/oauth2/authorize?client_id="+process.env.ID+"&permissions=8&response_type=code&scope=guilds.join%20bot%20guilds"); //URL for invite
    message.channel.send(embed);
  } else if (command === "math") {
    let i = args.join("").replace("=", "").replace("?", "");
    let a = eval(i.replace("x", "*").replace(":", "/").replace("%", "/100"));
    
    let ans = [
      `Answer of \`${i}\` is ${a}`,
      `Answer : ${a}`,
      `${i}=${a}`
    ]
    
    let answer = ans[Math.floor(Math.random() * ans.length)];
    
    
    if (args.length >= 2 || args[0].length >= 2) {
      message.reply(answer).then(message.react("🤔"));
    } else {
      message.reply("Please input a number bigger than 3");
    }
  } else if (command === "eval") {
    if (!message.member.roles.some(r=>["OWNER", "Owner", "owner",
                                       "ADMIN", "Admin", "admin",
                                       "Staff", "AGENT", "Moderator",
                                       "Bot"].includes(r.name)))
      return message.reply("Sorry, you do not have the permission to do this!");
    
    let i = args.join(" ");
    let a = eval(i);
    
    let embed = new RichEmbed()
    .setColor("ORANGE")
    .setDescription("**Input**"+
                    "```js\n"+i+
                    "\n```\n"+
                    "**Output**"+
                    "```js\n"+a+
                    "\n```\n"
                    ).catch(message.channel.send(embed));
    message.channel.send(embed);
  } else if (command === "say") {
    let i = args.join(" ");
    
    message.delete().catch(O_o => {});
    message.channel.send(`**<${message.author.username}>** ${i}`);
  } else if (command === "ssay") {
    if (!message.member.roles.some(r=>["OWNER", "Owner", "owner",
                                       "ADMIN", "Admin", "admin",
                                       "Staff", "AGENT", "Moderator",
                                       "Bot"].includes(r.name)))
      return message.reply("Sorry, you do not have the permission to do this!");
    
    let server = message.guild.name;
    let channel = message.channel.name;
    const sayMessage = args.join(" ");
    message.delete().catch(O_o => {});
    message.channel.send(`${sayMessage}`);
    console.log(`${message.author.username} using ${prefix}say ${sayMessage} > ${server} | ${channel}`);
  } else if (command === "embsay") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o => {});
    let embed = new RichEmbed()
      .setColor("RED")
      .setTitle(`From @${message.author.tag}`)
      .setDescription("```" + sayMessage + "```")
      .setFooter("CelticCronze ● Server CelticStuff Teams 2020");
    message.channel.send(embed);
  } else if (command === "info") {
    let embed = new RichEmbed()
    .setColor("RED")
    .setTitle(":shield: Bot Info :shield:")
    .setDescription("**Prefix > **`" + prefix + "`\n**Tag > **`" + client.user.tag + "`\n");
    message.channel.send(embed);
  } else if (command === "afk") {
    const afk = args.join(" ");
    if (!afk) {
      message.channel.send(`${message.author} is now AFK.`);
      message.delete().catch(O_o => {});
    } else if (afk) {
      message.delete().catch(O_o => {});
      message.channel.send(`${message.author} is now AFK for : ${afk}.`);
    }
  } else if (command === "unafk") {
    const afk = args.join(" ");
    if (!afk) {
      message.channel.send(`${message.author} is no longer AFK.`);
      message.delete().catch(O_o => {});
    } else if (afk) {
      message.delete().catch(O_o => {});
      message.channel.send(`${message.author} is no longer AFK.`);
    }
  } else if (command === "ping") {
    let ping = client.ping;
    message.channel.send(`:ping_pong: **Pong! Ping this bot : \`${ping}ms\`**`);
  } else if (command === "uptime") {
    let uptime = client.uptime
    message.channel.send(`📊 Uptime to this bot: \`${uptime} Ticks\``);
  } else if (command === "ctc") {
    if (!message.member.roles.some(r=>["OWNER", "Owner", "owner",
                                       "ADMIN", "Admin", "admin",
                                       "Staff", "AGENT", "Moderator",
                                       "Bot"].includes(r.name)))
      return message.reply("Sorry, you do not have the permission to do this!");
    
    message.delete().catch(O_o => {});
    message.guild.createChannel(args.join(" "));
    message.channel.send('Successfully Created `#'+args.join("-")+'` Channel');
  } else if (command === "dlc") {
    if (!message.member.roles.some(r=>["OWNER", "Owner", "owner",
                                       "ADMIN", "Admin", "admin",
                                       "Staff", "AGENT", "Moderator",
                                       "Bot"].includes(r.name)))
      return message.reply("Sorry, you do not have the permission to do this!");
    
    message.delete().catch(O_o => {});
    const channel = message.guild.channels.find(r => r.name === args.join('-'));
    channel.delete()
      .then(deleted => message.channel.send(`Successfully Deleted \`#${deleted.name}\` Channel`));
  } else if (command === "purge") {
    if (isNaN(args[0])) return message.reply('**Please suply a valid amount of messages to purge**');
    if (args[0] > 100) return message.reply('**Please suply a number less than 100**');
    message.channel.bulkDelete(args[0])
      .then( messages => message.channel.send(`**Successfully deleted \`${messages.size}/${args[0]}\` messages**`))
      .then(msg => msg.delete({timeout:1000000}))
      .catch( error => message.channel.send(`**ERROR:** ${error.message}`));
  } else if (command === "clear") {
      message.channel.clone().then(message.channel.send("**Clearing all Messages**"));
      message.channel.delete();
  } else if (command == "kick") { // creates the command kick
    if (!message.member.roles.some(r=>["OWNER", "Owner", "owner",
                                       "ADMIN", "Admin", "admin",
                                       "Staff", "AGENT", "Moderator",
                                       "Bot"].includes(r.name)))
      return message.reply("Sorry, you do not have the permission to do this!");
    
    var kickedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmembe
    if (!kickedmember) return message.reply("Please mention a valid member of this server!") // if there is no kickedmmeber var
    if (!kickedmember.kickable) return message.reply("I cannot kick this member!") // if the member is unkickable
    var kickreasondelete = 10 + kickedmember.user.id.length //sets the length of the kickreasondelete
    var kickreason = message.content.substring(kickreasondelete).split(" "); // deletes the first letters until it reaches the reason
    var kickreason = kickreason.join(" "); // joins the list kickreason into one line
    if (!kickreason) return message.reply("Please indicate a reason for the kick!") // if no reason
    kickedmember.kick(kickreason) //if reason, kick
    .catch(error => message.reply(`Sorry @${message.author} I couldn't kick because of : ${error}`)); //if error, display error
    message.reply(`${kickedmember.user.username} has been kicked by ${message.author.username} because: ${kickreason}`); // sends a message saying he was kicked
  } else if (command === "mute") {
    if (!message.member.roles.some(r=>["OWNER", "Owner", "owner",
                                       "ADMIN", "Admin", "admin",
                                       "Staff", "AGENT", "Moderator",
                                       "Bot"].includes(r.name)))
      return message.reply("Sorry, you do not have the permission to do this!");
    
      var mutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
      if (!mutedmember) return message.reply("Please mention a valid member of this server!") // if there is no kickedmmeber var
      if (mutedmember.hasPermission("ADMINISTRATOR")) return message.reply("I cannot mute this member!") // if memebr is an admin
      var mutereasondelete = 10 + mutedmember.user.id.length //sets the length of the kickreasondelete
      var mutereason = message.content.substring(mutereasondelete).split(" "); // deletes the first letters until it reaches the reason
      var mutereason = mutereason.join(" "); // joins the list kickreason into one line
      if (!mutereason) return message.reply("Please indicate a reason for the mute!") // if no reason
      if(!mutedrole) {
        message.guild.createRole({name: mutedrole});
        message.guild.channels.forEach(f => {
          f.overwritePermissions(mutedrole, {
            SEND_MESSAGES: false
          });
        });
      }
      mutedmember.addRole(mutedrole) //if reason, kick
          .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`)); //if error, display error
      message.reply(`${mutedmember.user} has been muted by ${message.author} because: ${mutereason}`); // sends a message saying he was kicked
  } else if (command == "unmute") { // creates the command unmute
    if (!message.member.roles.some(r=>["OWNER", "Owner", "owner",
                                       "ADMIN", "Admin", "admin",
                                       "Staff", "AGENT", "Moderator",
                                       "Bot"].includes(r.name)))
      return message.reply("Sorry, you do not have the permission to do this!");
    
    var unmutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
    if (!unmutedmember) return message.reply("Please mention a valid member of this server!") // if there is no kickedmmeber var
    unmutedmember.removeRole(mutedrole) //if reason, kick
        .catch(error => message.reply(`Sorry ${message.author} I couldn't unmute because of : ${error}`)); //if error, display error
    message.reply(`${unmutedmember.user} has been unmuted by ${message.author}!`); // sends a message saying he was kicked
  }
});
client.on("message", msg => {
  if (msg.content === "Woi") {
    msg.channel.send(
      `Ada apa ${msg.author}?\nPerlu bantuan? ketik ` +
      "`" +
      prefix +
      `help` +
      "`"
    );
  } else if (msg.content === 'Nanas' || msg.content === 'nanas' || msg.content === 'san' || msg.content === '<@726071404050514011>' || msg.content === '<@726071404050514011> ') {
    let busy = config.busy.content = 'y';
    let bs = config.busystatus;
    let server = msg.guild.name;
    let channel = msg.channel.name;
    
    if (busy) {
      msg.reply(`dia lagi ${bs}.`);
      console.log(`Sibuk Mode : true\nNanasCraft, ${msg.author.username} memanggil kamu di server > ${server} | #${channel}!`);
    } else if (!busy) {
      console.log(`Sibuk Mode : false\nNanasCraft, ${msg.author.username} memanggil kamu di server > ${server} | #${channel}!`);
    }
  } else if (msg.content === "Assalamualaikum") {
    msg.channel.send(`Wa'alaikumussalam, Halo apa kabar ${msg.author}`);
  } else if (msg.content === `Assalamu'alaikum`) {
    msg.channel.send(`Wa'alaikumussalam, Halo apa kabar ${msg.author}`);
  } else if (msg.content === "assalamualaikum") {
    msg.channel.send(`Wa'alaikumussalam, Halo apa kabar ${msg.author}`);
  } else if (msg.content === `assalamual'aikum`) {
    msg.channel.send(`Wa'alaikumussalam, Halo apa kabar ${msg.author}`);
  } else if (msg.content === prefix + "avatar") {
    let embed = new RichEmbed()
      .setColor("GREEN")
      .setTitle(`${msg.author.username} Avatar/Profile`)
      .setDescription(
        `
        :tickets: Name : ${msg.author.tag}
        :paintbrush: Activity : ${msg.author.presence.game}
        :chart_with_upwards_trend: Status : ${msg.author.presence.status.toUpperCase()}
        :pencil: User ID : ${msg.author.id}
        :envelope: User Tag : ${msg.author.tag}
        `
      )
      .setThumbnail(`${msg.author.displayAvatarURL}`)
      .setFooter("CelticCronze ● Server CelticStuff Teams 2020");
    msg.channel.send(embed);
  } else if (msg.content === prefix + "dice") {
    let dices = [
      `1`,
      `2`,
      `3`,
      `4`,
      `5`,
      `6`
    ]
    let dice = dices[Math.floor(Math.random() * dices.length)]
    msg.reply(":game_die: You rolled " + dice + "!");
}});

let activities = [
  `${prefix}help`,
  `${prefix}info`,
  `Woi`,
  `Server`,
  `Channel`,
  `Pengguna`
]

client.on("ready", () => {
  setInterval(() => {
    let activity = activities[Math.floor(Math.random() * activities.length)]
    if (activity == `${prefix}help`) {
      client.user.setActivity(activity, { type: "LISTENING" });
    } else if (activity == `${prefix}info`) {
      client.user.setActivity(activity, { type: "LISTENING" });
    } else if (activity == `Woi`) {
      client.user.setActivity('say '+activity, { type: "LISTENING" });
    } else if (activity == `Server`) {
      client.user.setActivity(`${client.guilds.size} ♦ `+activity, { type: "WATCHING" });
    } else if (activity == `Pengguna`) {
      client.user.setActivity(`${client.users.size} ♦ `+activity, { type: "WATCHING" });
    }
  },5000)
  console.log(`${client.user.username} is now ready!`);
  console.log("Streamed on ID : `"+process.env.ID+"`");
  console.log("Created Website on : " + __dirname + "/website/");
});

client.login(process.env.TOKEN);
