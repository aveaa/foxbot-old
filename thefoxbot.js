 //Info about current version
 let musicchanging = true
 const superagent = require("superagent");
 var version = "2.1" //Bot version.
 var botname = "TheFoxBot" //Bot name.
 var homechannelid = "244210872237424651" //The ID of the home channel that will write reports.
 var authorid = "209765088196821012" //Your ID.
 var prefix = "f." //Prefix for the bot to use.
 var invitelink = "http://thefoxsgdps.rf.gd/thefoxbot" //your invite to the bot
 var token = "no" //Bot token.
 const catFacts = require('cat-facts');
 var users = require('./users.json')
 var randomphrases = require('./foxphrases.json')
 var Cleverbot = require('cleverbot-node');
 cleverbot = new Cleverbot;
 const booru = require('booru')
 var guildSettings = require("./guildSettings")
 var supportReportsIDs = []
 var casenum = 0
 var osuKey = "no"
 const osu = require("osu")(osuKey);
 //Plugins and requires + some other shit
 //gduser
 var gdGlobal = { popular: { list: ["geomania", "Taman", "Terron", "Xaro", "Jayuff", "Michigun", "B1n4ry", "Crisis Master"], size: 8 } }
 var gdUser = { friends: { list: ["Agg2005", "ZEKEK", "Morbi", "BioCat", "Bloodwake24", "brodawg", "Clubb3n", "Dubstep Synx", "GDsp0ki", "gdwarrior", "GusDira12", "iIiHubrostatiIi", "iIHubrostatIi", "iIiTraxisiIi", "MarcoGamer", "Nightmare23", "ParismaX", "ratig", "SkilLeS", "theoryofdobby", "True Spooky", "Wolfies", "ZenthicLegend", "KandyMan"], size: 24 }, name: "TrueTheFox", trueFriends: { list: ["Morbi", "ParismaX", "ZenthicLegend", "Clubb3n", "Dubstep Synx", "MarcoGamer", "True Spooky"], size: 7 } }
     //gdclient
 const GDClient = require("node-geometry-dash");

 const GD = new GDClient({
     username: "", // doesn't work yet :/
     password: "" // doesn't work yet :/
 });
 const tags = require("./tags.json");
 //pokemon
 //webhooks
 var Webhook = require("webhook-discord")
     //urban
 var urban = require('urban');
 var randomCat = require('random-cat');
 var url = randomCat.get();
 //ms
 var ms = require('ms');
 //console colors
 var colors = require('colors');
 var Discord = require("discord.js");
 var bot = new Discord.Client();
 const fs = require('fs');
 const objectname = require("./pvp.json");
 var jimp = require("jimp");

 var currentEvent = null

 //Custom functions
 function clean(text) {
     if (typeof(text) === "string")
         return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
     else
         return text;
 }

 function getMention(mention) {
     userid = mention.replace("<@", "").replace("<!@", "").replace(">", "")
     if (bot.users.get(userid) !== undefined) return bot.users.get(userid);
     else return null;
 }

 //When ready, the bot does that kind of... shit.
 bot.on("ready", function() {
     console.log("Succesfully started. Running on " + bot.guilds.size + " servers.");
     setInterval(function() {
         var music = ["t+pazolite vs RoughSketch - Readymade Luv", "Pegboard Nerds - We Are One", "Aero Chord - 4U", "Aero Chord - Break Them", "t+pazolite - CENSORED!!", "Crypt Of The Necrodancer: The Melody Mixes", "Childish Gambino - Bonfire", "DM DOKURO - CINNAMON AGITATION", "The Protogent Rap", "my mixtape (its fire)", "people dying over and over"]
         var choice = music[Math.floor(Math.random() * music.length)]
         if (musicchanging) {
             bot.user.setPresence({
                 game: {
                     name: choice,
                     type: 2
                 }
             })
         }
     }, 60000)
     superagent.post("https://bots.discord.pw/api/bots/239493437089513474/stats").send({ "server_count": bot.guilds.size }).set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIyMDk3NjUwODgxOTY4MjEwMTIiLCJyYW5kIjo3MjIsImlhdCI6MTQ5MjU5MjQ4Mn0.mbssrl4ekromNdFnkaJCJKhinUy73LnhZK_knEWUI_c").end()
 });

 bot.on("message", phrase => {
     if (phrase.guild === null) {
         //console.log(phrase.author.username.rainbow+" | PM | ".blue+phrase.content.bold)
     } else {
         if (phrase.guild.id !== "110373943822540800" && phrase.channel.id !== "285739344910745600") {
             //console.log(phrase.author.username.rainbow+" | "+phrase.channel.name.blue+" ("+phrase.channel.id+") | "+phrase.guild.name.blue+" | "+phrase.content.bold)
         }
     };
 });
 try {
     //Word triggers!
     bot.on("message", phrase => {
         if (phrase.guild.id !== 363291167250448384) {
             if (phrase.content.toLowerCase().includes("gay") || phrase.content.toLowerCase().includes("gey")) {
                 phrase.react(bot.emojis.get("287402139217559552"))
             }
             if (phrase.content.toLowerCase().includes("🅱") || phrase.content.toLowerCase().includes(":b:")) {
                 phrase.react("🅱")
             }
             if (phrase.content.toLowerCase().includes("nig")) {
                 phrase.react(bot.emojis.get("294627165457350656"))
             }
             if (phrase.content.toLowerCase().includes("sakuje")) {
                 phrase.react(bot.emojis.get("294153703559266304"))
             }
         }
         if (!phrase.guild === null) {
             //Checks if this is not a command.
             if (!phrase.content.startsWith(prefix) && phrase.author.bot === false && phrase.guild.id !== "110373943822540800") {
                 if (guildSettings[phrase.guild.id] === undefined) {
                     guildSettings[phrase.guild.id] = { tags: { help: { content: "`To add a tag, do f.tag add (name) (content)\nTo delete, do f.tag del (name) (content)\nA tag can only be deleted by someone who has the permission \"Manage Server\" or is owner of the tag\nTo get a tag, do f.tag (tag)\nDon't try adding tags with names like \"del\" or \"add\", that wont work silly`", ownerID: null, ownerName: "oooOOOoooo spooky person" } }, mute: false }
                 }
                 try {
                     if (users[phrase.author.id] === undefined) {
                         users[phrase.author.id] = { name: phrase.author.username, level: 1, xp: 0, muted: false, coins: 0 }
                         fs.writeFile("./users.json", JSON.stringify(users))
                     } else {
                         if (users[foxmsg.author.id].coins === undefined) {
                             users[foxmsg.author.id].coins === 0
                         }
                         users[phrase.author.id].xp = users[phrase.author.id].xp + Math.floor(Math.random() * 24)
                         if (users[phrase.author.id].xp > 250 * users[phrase.author.id].level) {
                             users[phrase.author.id].xp = 0
                             users[phrase.author.id].coins = users[phrase.author.id].coins + Math.floor(Math.random() * 100) + 20
                             users[phrase.author.id].level++
                                 if (!users[phrase.author.id].muted || !users[phrase.guild.id].mute) {
                                     phrase.reply("**congrats! 🎉 you leveled up!**\nnow you're level " + users[phrase.author.id].level + "!\ndo f.mute to mute this, f.guildmute to disable for the whole guild")
                                 }
                             fs.writeFile("./users.json", JSON.stringify(users))
                         }
                     }
                 } catch (err) {
                     console.log("oh shit waddup, " + err)
                 }

                 // tableflip check
                 if (phrase.content.includes("(╯°□°）╯︵ ┻━┻")) {
                     phrase.channel.sendMessage("spare the tables ;-;")
                 };

                 if (phrase.author.id === authorid) {
                     randomphrases.push({ "content": phrase.content, "createdAt": phrase.createdAt, "author": phrase.author })
                     try {
                         fs.writeFile("./foxphrases.json", JSON.stringify(randomphrases))
                         console.log("added new phrase succesfully!")
                     } catch (err) {
                         console.log("failed adding new phrase\n" + err)
                     }
                 }

                 try {
                     if (phrase.content === "ayy" && phrase.guild.id !== "232091524492558336") {
                         phrase.channel.sendMessage("lmao")
                     }
                 } catch (err) {}

                 // tableunflip
                 if (phrase.content.includes("┬─┬﻿ ノ( ゜-゜ノ)")) {
                     phrase.channel.sendMessage("yes im feeling better now thank you ")
                 };

                 var input = phrase.content.toUpperCase();

                 if (input.includes("<@239493437089513474>") && input.includes("KICK")) {
                     phrase.channel.sendMessage("dont kick me, bots have feelings too >;v")
                 }
                 if (input.includes("<@239493437089513474>") && input.includes("BAN")) {
                     phrase.channel.sendMessage("dont ban me, bots have feelings too >;v")
                 }
                 if (input.includes("<!@239493437089513474>") && input.includes("KICK")) {
                     phrase.channel.sendMessage("dont kick me, bots have feelings too >;v")
                 }
                 if (input.includes("<!@239493437089513474>") && input.includes("BAN")) {
                     phrase.channel.sendMessage("dont ban me, bots have feelings too >;v")
                 }

                 if (phrase.isMentioned("239493437089513474")) {
                     phrase.channel.sendMessage("maybe you meant <@" + authorid + ">?")
                 }

                 if (input.startsWith("HEY FOX") || input.startsWith("FOX") || input.startsWith("FOXY") || input.startsWith("OK FOX") || input.startsWith("<@239493437089513474>") || input.startsWith("<@!239493437089513474>")) {


                     if (input.includes("AVATAR") || input.includes("ICON")) {
                         phrase.channel.sendMessage("https://discordapp.com/api/users/" + phrase.author.id + "/avatars/" + phrase.author.avatar + ".jpg")
                     }



                 }
             }

         }
     });
 } catch (err) {}
 //Oh BOY. Here are the commands.
 bot.on("message", foxmsg => {
     try {
         if (foxmsg.guild !== null) {
             if (foxmsg.channel.id === "311927686106841089") {
                 if (foxmsg.content.toLowerCase() === "oddf") {
                     foxmsg.author.sendMessage("congrats! your verification went in success. you can now chat in TheFox's MTWOW!")
                     foxmsg.guild.members.get(foxmsg.author.id).addRole("311914890359209995")
                 }
             }
         }


         if (guildSettings[foxmsg.guild.id] === undefined || guildSettings[foxmsg.guild.id].tags === undefined) {
             guildSettings[foxmsg.guild.id] = { tags: { help: { content: "`To add a tag, do f.tag add (name) (content)\nTo delete, do f.tag del (name) (content)\nA tag can only be deleted by someone who has the permission \"Manage Server\" or is owner of the tag\nTo get a tag, do f.tag (tag)\nDon't try adding tags with names like \"del\" or \"add\", that wont work silly`", ownerID: null, ownerName: "oooOOOoooo spooky person" } }, mute: false }
         }
     } catch (err) {}
     //Checks if message is releated to him xdddddddddddddd
     if (foxmsg.content.startsWith(prefix)) {
         //Var-s for the bot to work
         var temp_num = Math.floor(Math.random() * 5)
         if (temp_num === 0) {
             var randomphrase = "why"
         } else if (temp_num === 1) {
             var randomphrase = "WHHHHHOOOOOOOOOAAAAAAAA"
         } else if (temp_num === 2) {
             var randomphrase = "have you a bad time"
         } else if (temp_num === 3) {
             var randomphrase = "nice"
         } else {
             var randomphrase = "hey that's pretty good"
         };
         var user = foxmsg.author;
         var input = foxmsg.content
         var role;
         var roleName = foxmsg.content.split(" "); // roleName[0] = "ADDROLE", roleName[1] = "GivenRole"
         //var channels = foxmsg.channel.server.channels;
         var channel;
         var reserved;
         var giphy_config = {
             "api_key": "dc6zaTOxFJmzC",
             "rating": "r",
             "url": "http://api.giphy.com/v1/gifs/random",
             "permission": ["NORMAL"]
         };

         //youTube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU');

         //Temp_msg for split commands to work
         var temp_msg = input.replace("F.SPEAK ", "");
         let params = foxmsg.content.split(" ").splice(1);
         //rank tatsumaki thing
         if (foxmsg.content === prefix + "mute") {
             if (users[foxmsg.author.id] === undefined) {
                 foxmsg.channel.sendMessage("you are too quiet! start speaking to be ranked in thefoxbot's leaderboards and get levels!")
             } else {
                 users[foxmsg.author.id].muted = true
                 foxmsg.channel.sendMessage(":ok_hand:\nto unmute, do f.unmute")
             }
         }
         if (foxmsg.content === prefix + "unmute") {
             if (users[foxmsg.author.id] === undefined) {
                 foxmsg.channel.sendMessage("you are too quiet! start speaking to be ranked in thefoxbot's leaderboards and get levels!")
             } else {
                 users[foxmsg.author.id].muted = false
                 foxmsg.channel.sendMessage(":ok_hand:\nto mute, do f.mute")
             }
         }
         if (foxmsg.content === prefix + "guildmute") {
             if (foxmsg.guild.members.get(foxmsg.author.id).hasPermission('MANAGE_GUILD') || foxmsg.author.id === authorid) {
                 guildSettings[foxmsg.guild.id].mute = true
                 fs.writeFile("./guildSettings.json", JSON.stringify(guildSettings))
                 foxmsg.channel.sendMessage(":ok_hand:\nto unmute, do f.unguildmute")
             } else {
                 foxmsg.channel.sendMessage("you dont have permissions for that! `you need manage_server perms`")
             }
         }
         if (foxmsg.content === prefix + "unguildmute") {
             if (foxmsg.guild.members.get(foxmsg.author.id).hasPermission('MANAGE_GUILD') || foxmsg.author.id === authorid) {
                 guildSettings[foxmsg.guild.id].mute = false
                 foxmsg.channel.sendMessage(":ok_hand:\nto mute, do f.guildmute")
             } else {
                 foxmsg.channel.sendMessage("you dont have permissions for that! `you need manage_server perms`")
             }
         }
         if (foxmsg.content === prefix + "rank") {
             if (users[foxmsg.author.id] === undefined) {
                 foxmsg.channel.sendMessage("you are too quiet! start speaking to be ranked in thefoxbot's leaderboards and get levels!")
             } else {
                 if (users[foxmsg.author.id].coins === undefined) {
                     users[foxmsg.author.id].coins === 0
                 }
                 let embed = {
                     title: foxmsg.author.username + "'s profile page - TheFoxBot",
                     color: "990000",
                     fields: [{
                             name: "Level",
                             value: users[foxmsg.author.id].level,
                             inline: true
                         },
                         {
                             name: "XP",
                             value: users[foxmsg.author.id].xp + "/" + 250 * users[foxmsg.author.id].level,
                             inline: true
                         }
                     ],
                     description: "do f.mute to mute level-up announcments"
                 }
                 foxmsg.channel.sendMessage("", { embed })
             }
         }

         //you really left them hanging this morning, you know?
         /*
         list of features that should work:
          -[o] normal f.ddlchang (no params, avatar)
          -[o] mention
          -[o] user id
          -[o] attachments (no params)
         */
         if (foxmsg.content.startsWith("f.ddlchang")) {
             var x = 34
             var y = 112

             var w = 179
             var h = 179

             try {
                 if (params[0] === undefined) {
                     if (foxmsg.attachments.size > 0) {
                         if (foxmsg.attachments.first().filename.endsWith(".png") || foxmsg.attachments.first().filename.endsWith(".jpg") || foxmsg.attachments.first().filename.endsWith(".bmp")) {
                             var images = [foxmsg.attachments.first().url, "sayorihangtemplate.png"]
                         } else { throw new Error("Invalid file type (.png, .jpg and .bmp only)") }
                     } else {
                         if (foxmsg.author.avatarURL === null) { throw new Error("No avatar/profile picture") } else {
                             var images = [foxmsg.author.avatarURL.replace(".gif", ".png"), "sayorihangtemplate.png"]
                         }
                     }
                 } else if (params[0].startsWith("<")) {
                     var user = getMention(params[0])
                     if (user === null) { throw new Error("User not found (double-check if there are any spaces or use userid)") } else {
                         if (user.avatarURL === null) { throw new Error("No avatar/profile picture") } else {
                             var images = [user.avatarURL, "sayorihangtemplate.png"]
                         }
                     }
                 } else if (!isNaN(params[0])) {
                     var user = bot.users.get(params[0])
                     if (user === null) { throw new Error("User not found (double-check if there are any spaces)") } else {
                         if (user.avatarURL === null) { throw new Error("No avatar/profile picture") } else {
                             var images = [user.avatarURL, "sayorihangtemplate.png"]
                         }
                     }
                 }
                 var jimps = []

                 for (var i = 0; i < images.length; i++) {
                     jimps.push(jimp.read(images[i]))
                 }

                 Promise.all(jimps).then(function(data) {
                     return Promise.all(jimps)
                 }).then(function(data) {
                     data[1].composite(data[0].resize(w, h).rotate(-10, true), x, y).write("sayoresult.png")
                     setTimeout(function() { foxmsg.channel.sendFile("sayoresult.png") }, 500)
                 })
             } catch (err) {
                 foxmsg.channel.sendMessage("um, an error???\n" + err)
             }
         }
         /*
         //currently WIP, and probably is staying like that forever
         if(input.startsWith("f.mine")) {
         if(mine.users[foxmsg.author.id] === undefined) {
         foxmsg.channel.sendMessage("hold on while i make an account for you...")
         mine.users[foxmsg.author.id] = {level: 0, inventory: {slot1: null, slot2: null, slot3: null, slot4: null, slot5: null}, pickaxe: null, mineNum: 0, gold: 10}
         foxmsg.channel.sendMessage("great! your account is done. buy a pickaxe with `f.mine buy wooden_pickaxe`")
         } else {
         if(params[0] === "buy") {
         if(params[1] === "wooden_pickaxe") {
         if(mine.users[foxmsg.author.id].gold > 9) {
         foxmsg.channel.sendMessage("okey, bought wooden pickaxe and trashed old one if existed")
         mine.users[foxmsg.author.id].gold = mine.users[foxmsg.author.id].gold-10
         mine.users[foxmsg.author.id].pickaxe = "wooden_pickaxe"
         } else {
         foxmsg.channel.sendMessage("not enough money xd")
         }
         }
         }
         }
         }
         */
         if (foxmsg.content.startsWith("f.foxsay ") && foxmsg.author.id === authorid) {
             foxmsg.channel.sendMessage("```" + foxmsg.content.replace("f.foxsay ", "") + "```")
             foxmsg.delete()
         }
         //Ahh... the ping command. What about we play some Ping-Pong?
         if (input === prefix + "ping") {
             var time1 = Date.now()
             foxmsg.channel.sendMessage("sending you a borf...").then(m => {
                 var time2 = Date.now()
                 var timeresult = time2 - time1
                 var borfVariants = ["borf!", "bark", "borf", "bark!", "woof"]
                 m.edit("**" + borfVariants[Math.floor(Math.random() * 5)] + "** (took " + timeresult + "ms)")
             })
         };
         if (input.startsWith(prefix + "setrank ") && foxmsg.author.id === authorid) {
             userid = params[0]
             option = params[1]
             try {
                 users[userid][option] = params[2]
                 foxmsg.channel.sendMessage("oke! everything went smoothly.")
             } catch (err) {
                 foxmsg.channel.sendMessage("send help it didnt work\nerror: `" + err + "`")
             }
         }
         //oh boy more json commands

         if (input.startsWith(prefix + "tag ")) {
             if (params[0] === "add") {
                 try {
                     if (guildSettings[foxmsg.guild.id].tags[params[1]] === undefined) {

                         if (params[1] === undefined || params[2] === undefined) {
                             foxmsg.channel.sendMessage("incorrect usage! usage: `f.tag add (name) (content)`")
                         } else {
                             guildSettings[foxmsg.guild.id].tags[params[1]] = { content: foxmsg.content.replace("f.tag " + params[0] + " " + params[1] + " ", ""), ownerID: foxmsg.author.id, ownerName: foxmsg.author.username, name: params[1] }
                             foxmsg.channel.sendMessage("done")
                             fs.writeFile("./guildSettings.json", JSON.stringify(guildSettings))
                         }
                     } else {
                         if (guildSettings[foxmsg.guild.id].tags[params[1]].ownerID !== null) {
                             foxmsg.channel.sendMessage("thats already a tag!")
                         } else {
                             if (params[1] === undefined || params[2] === undefined) {
                                 foxmsg.channel.sendMessage("incorrect usage! usage: `f.tag add (name) (content)`")
                             } else {
                                 guildSettings[foxmsg.guild.id].tags[params[1]] = { content: foxmsg.content.replace("f.tag " + params[0] + " " + params[1] + " ", ""), ownerID: foxmsg.author.id, ownerName: foxmsg.author.username, name: params[1] }
                                 foxmsg.channel.sendMessage("done")
                                 fs.writeFile("./guildSettings.json", JSON.stringify(guildSettings))
                             }
                         }
                     }
                 } catch (err) {}
             } else if (params[0] === "del") {
                 if (guildSettings[foxmsg.guild.id].tags[params[1]] === undefined) {
                     foxmsg.channel.sendMessage("that tag doesnt exist!")
                 } else {
                     if (guildSettings[foxmsg.guild.id].tags[params[1]].ownerID === foxmsg.author.id || foxmsg.guild.members.get(foxmsg.author.id).permissions.hasPermission('MANAGE_GUILD') || guildSettings[foxmsg.guild.id].tags[params[1]].ownerID === null) {
                         if (guildSettings[foxmsg.guild.id].tags[params[1]].ownerID === null) {
                             foxmsg.channel.sendMessage("that tag no longer exists!")
                         } else {
                             guildSettings[foxmsg.guild.id].tags[params[1]].ownerID = null
                             guildSettings[foxmsg.guild.id].tags[params[1]].content = "that isnt a tag! add one with `f.tag add (name) (content)`"
                             foxmsg.channel.sendMessage("done")
                             fs.writeFile("./guildSettings.json", JSON.stringify(guildSettings))
                         }
                     } else {
                         foxmsg.channel.sendMessage("you dont have permissions! you need to be either the owner of the tag (" + guildSettings[foxmsg.guild.id].tags[params[1]].ownerName + ") or have the permission \"manage server\".")
                     }
                 }
             } else {
                 if (guildSettings[foxmsg.guild.id].tags[params[0]] === undefined) {
                     foxmsg.channel.sendMessage("that isnt a tag! add one with `f.tag add (name) (content)`")
                 } else {
                     foxmsg.channel.sendMessage(guildSettings[foxmsg.guild.id].tags[params[0]].content)
                 }
             }
         }
         //here lies f.repeat, the command that caused the 30.04.2017 memory leak
         //heres a file command
         if (foxmsg.content === "f.roleids" && foxmsg.guild !== undefined) {
             foxmsg.reply("check your DMs")
             fs.writeFile("./idList.txt", JSON.stringify(foxmsg.guild.roles.map(r => r.name + " - " + r.id)))
             foxmsg.author.sendFile("idList.txt")
         }
         //HI.
         if (input === prefix + "hello") {
             foxmsg.channel.sendFile("hi.png", "png", "hi!")
         };
         if (input === prefix + "func" && foxmsg.author.id === authorid) {
             foxmsg.channel.sendMessage(" ", {
                 color: 12434093,
                 author: {
                     name: bot.user.username,
                     icon_url: bot.user.avatarURL
                 },
                 title: ' <:ZZAttention:252384022561292288>  Правила сервера  <:ZZAttention:252384022561292288>   ',
                 description: 'Обязательно прочти, чтобы не нарушать в дальнейшем.',
                 fields: [{
                         name: ' <:ZZAttention:252384022561292288>  Правила 1 категории  <:ZZAttention:252384022561292288>  ',
                         value: '- Запрещено нарушать правила с помощью ников и игровых статусов, также нельзя использовать `[BOT]` в нике;\n- Не следует писать команды к боту в <#235144365897416704>. Для этого есть <#277429202821840896>;\n- Нельзя перечить управлению сервера (статусникам), если они указывают вам на что-либо в вашем поведении или делают предупреждение. Если кто-либо из них нарушает правила, обращайтесь к <@240049874333073408>;- Запрещено общаться на канале <#277501583913385984> на любые темы. Этот канал предназначен только для профайлов. (Исключение - напоминание от статусников).'
                     },
                     {
                         name: ' <:ZZAttention:252384022561292288>  Правила 2 категории  <:ZZAttention:252384022561292288>  ',
                         value: '- Запрещены флуд, спам и капс. Нельзя отправлять больше одного сообщения в секунду, писать бессмыслицу, злоупотреблять эмоциями и смайлами;\n- Запрещено выдавать себя за кого-либо другого, будь то пользователь Фэндома или музыкант. Однако можно использовать ники игроков или персонажей чего-либо;\n- Запрещены оскорбления в сторону любого участника, а также устраивание массовых и личных конфликтов, провокации;\n- Запрещено затрагивание религиозных, политических и прочих провокационных тем;\n- Запрещено нарушать правила через ботов;\n- Флуд, спам или капс в огромном количестве наказываются как 4 категория;\n- Нецензурная лексика на любых языках запрещена;\n- Запрещено использовать музыкального бота в плохих целях (прокрутка оскорбительного, нецензурного материала);\n- Запрещено пропагандировать суицид, а также постоянно писать "Хочу застрелиться", "Почему я жив?" и так далее;\n- Запрещена пропаганда наркотических средств, а также фашизма/нацизма/фанатизма;\n- Запрещено спамить реакциями;\n- Запрещено распостранение порнографии/шок-контента.'
                     },
                     {
                         name: ' <:ZZAttention:252384022561292288>  Правила для статусников  <:ZZAttention:252384022561292288> ',
                         value: '- Нельзя страйковать, кикать или банить кого-либо без объективной причины;\n- Статусники также могут получать страйки за нарушение правил 2 категории.\nЗа нарушение правил 1 категории - предупреждение. Если слишком много таких нарушений, вы можете довести это до страйка'
                     },
                     {
                         name: ' <:ZZAttention:252384022561292288>  Система страйков  <:ZZAttention:252384022561292288> ',
                         value: 'За нарушение правил 2 категории вы рискуете получить страйк.\nПосле получения более трёх страйков, вы будете забанены. Сроки ниже:\n1) Бан на неделю;\n2)Бан на месяц;\n3) Бан навсегда.\nСтрайки убираются через неделю со дня получения.'
                     },
                     {
                         name: 'Давай, пока!',
                         value: 'Удачи тебе в работе со мной.'
                     }
                 ],
                 timestamp: new Date(),
                 footer: {
                     icon_url: bot.user.avatarURL,
                     text: 'Служебный бот'
                 }
             })
         }
         if (input.startsWith("f.translate ")) {
             if (params[0] === undefined || params[1] === undefined) {
                 foxmsg.reply("invalid syntax\n`f.translate (language to translate to, 2 letters)`")
             } else {
                 googleTranslate.translate(foxmsg.content.replace("f.translate " + params[0] + " ", ""), params[0], function(err, translation) {
                     console.log(translation)
                     console.log(err)
                 })
             }
         }
         if (input === prefix + "checkmanager") {
             if (foxmsg.guild.members.get(foxmsg.author.id).roles.filter(role => role.name === "Fox's Manager").size === 1) {
                 foxmsg.reply("you're a manager! hooray!")
             } else {
                 foxmsg.reply("you are not a manager! to add yourself to manager, get the role with the name `Fox's Manager`.")
             }
         }
         //changing game yay
         if (foxmsg.author.id === authorid) {
             if (input.startsWith(prefix + "setgame ")) {
                 musicchanging = false
                 var type = 0
                 var game = foxmsg.content.replace("f.setgame ", "")
                 if (!isNaN(params[0])) {
                     var type = params[0]
                     var game = foxmsg.content.replace(params[0] + " ", "").replace("f.setgame ", "")
                 }
                 bot.user.setPresence({ game: { name: game, type: type } })
                 foxmsg.channel.sendMessage("ok, done! (music playing status has been disabled, enable with f.musicplaylistenable)")
             }
             if (input.startsWith(prefix + "musicplaylistenable")) {
                 foxmsg.channel.sendMessage("ok, done! disable it by setting a game (f.setgame)")
                 musicchanging = true
             }
         } else {
             if (input.startsWith(prefix + "setgame ") || input === prefix + "musicplaylistenable") {
                 foxmsg.channel.sendMessage("im really sorry, but setgame has been set to owner only!\ncheck back later though, as it might be enabled for everyone later on!")
             }
         }

         //kys command
         if (input.startsWith(prefix + "kys ")) {
             try {
                 foxmsg.react(":regional_indicator_k:")
                 foxmsg.react(":regional_indicator_y:")
                 foxmsg.react(":regional_indicator_s:")
                 var userid = params[0].replace("<", "")
                 var userid = userid.replace("@", "")
                 var userid = userid.replace(">", "")
                 var userid = userid.replace("!", "")
                 var user = bot.users.get(userid)
                 foxmsg.channel.sendMessage("kill your self " + user + "\n```----------------\n     |          |\n     |          |\n     O < " + user.username + "\n    /|)         |\n    /)          |\n                |```")
             } catch (err) {
                 foxmsg.channel.sendMessage("kill your self " + params[0] + "\n```----------------\n     |          |\n     |          |\n     O < " + params[0] + "\n    /|)         |\n    /)          |\n                |```")
             }
         }
         //coins, flip pls
         if (foxmsg.content === prefix + "coinflip") {
             var coinsHeads = Math.floor(Math.random() * 2)
             foxmsg.channel.sendMessage("the coin lands on...")
             setTimeout(function() {
                 if (coinsHeads === 0) {
                     foxmsg.channel.messages.get(foxmsg.guild.members.get(bot.user.id).lastMessageID).edit("the coin landed on heads!")
                 } else {
                     foxmsg.channel.messages.get(foxmsg.guild.members.get(bot.user.id).lastMessageID).edit("the coin landed on tails!")
                 }
             }, 1000)
         }
         //insulting
         if (foxmsg.content.startsWith(prefix + "insult")) {
             var array = ["You smell like your mom made fried onions and made you eat them.", "You're so ugly there's no insult for it.", "I would punch you, but that would be called animal abuse.", "I wish you were Half Life 3.", "I'm sure your stupidness could get you to nothing. Oh, i know, it would bring you back to your school.", "You're so ugly you're a crime.", "Ugh, i can't stand stupid dicks. Get away from me.", "What is that smell? Oh, it's you.", "The way you fight cannot be called girl fighting, it's called 'Mommy, he punched me!!1'.", "Can you leave? Oh, you don't know that word. Right.", "I would insult you, but you don't know neither of the words i would use", "Damn, you*r* re*ly* sma*t* aren*t u*?", "I shouldn't insult you. You're too stupid for that.", "I shouldn't insult you; you ARE an insult.", "Sing a song, i dare you. All i want is the cheese you hold in your mouth every day.", ""]
             var insult = array[Math.floor(Math.random() * array.length)]
             if (params[0] === undefined) {
                 foxmsg.reply(insult)
             } else {
                 foxmsg.channel.sendMessage(foxmsg.content.replace("f.insult ", "") + ", " + insult)
             }
         }
         if (foxmsg.content === "f.secret" && foxmsg.guild.id !== "235144365897416704") {
             var array = ["i want to be fucked by Zebot", "Zebot is my bae", "i want to fuck DoaxBot very hardly untill i cum", "i have 500 fleshlights that i never share", "i am secretly the real thefox, the other thefox is my slave", "i am actually bisexual", "my dreams are to have real pussy", "my slave is a sex slave", "i never realized i am on more than 50 servers", "i dont have cum, my slave cums every day and i collect it", "i have tentacles", "f.fuck is a thing, and if not, it's coming soon"]
             var secret = array[Math.floor(Math.random() * array.length)]
             foxmsg.author.sendMessage("psst... you! here's a secret, don't tell anyone: `" + secret + "`")
             foxmsg.channel.sendMessage("told a secret to " + foxmsg.author + " in DMs")
         }

         if (foxmsg.content.startsWith("f.fuck") && foxmsg.guild.id !== "235144365897416704") {
             if (params[0] === undefined) {
                 foxmsg.channel.sendMessage("to use this, select a person to fuck")
             } else {
                 var array = [foxmsg.author + " grabs " + params[0] + " by their legs and inserts their dick into their ass. " + params[0] + "starts moaning, as fast as " + foxmsg.author + " thrusts their dick. Soon " + foxmsg.author + " cums.", foxmsg.author + " walks up to " + params[0] + " and puts them in the bed. Then " + foxmsg.author + " sits on them and starts thrusting their dick. " + params[0] + " starts moaning and screaming for help, meanwhile " + foxmsg.author + " is having a lot of fun. Then " + foxmsg.author + " cums and lets them free.", foxmsg.author + " grabs " + params[0] + " by their head and starts thrusting their dick without any warning. " + params[0] + " tries to tell him to stop, but is unable to. When " + foxmsg.author + " cums " + params[0] + " escapes from the bedroom."]
                 var scene = array[Math.floor(Math.random() * array.length)]
                 foxmsg.channel.sendMessage(scene)
             }
         }

         //rpc
         if (foxmsg.content.startsWith(prefix + "rpc ")) {
             if (params[0] === "rock" || params[0] === "paper" || params[0] === "scissors") {
                 foxmsg.channel.sendMessage("rock...")
                 setTimeout(function() {
                     foxmsg.channel.messages.get(foxmsg.guild.members.get(bot.user.id).lastMessageID).edit("rock...\npaper...")
                     setTimeout(function() {
                         foxmsg.channel.messages.get(foxmsg.guild.members.get(bot.user.id).lastMessageID).edit("rock...\npaper...\nscissors!")
                         setTimeout(function() {
                             var rpc = Math.floor(Math.random() * 3)

                             if (rpc === 0) {
                                 var rpc = "rock"
                             } else if (rpc === 1) {
                                 var rpc = "paper"
                             } else {
                                 var rpc = "scissors"
                             }

                             if (params[0] === "rock") {
                                 if (rpc === "rock") {
                                     foxmsg.channel.messages.get(foxmsg.guild.members.get(bot.user.id).lastMessageID).edit("rock = rock\ntie, lol lets do that again")
                                 } else if (rpc === "paper") {
                                     foxmsg.channel.messages.get(foxmsg.guild.members.get(bot.user.id).lastMessageID).edit("rock < paper\nyou lose")
                                 } else {
                                     foxmsg.channel.messages.get(foxmsg.guild.members.get(bot.user.id).lastMessageID).edit("rock > scissors\nyou win, rip me")
                                 }
                             } else if (params[0] === "paper") {
                                 if (rpc === "rock") {
                                     foxmsg.channel.messages.get(foxmsg.guild.members.get(bot.user.id).lastMessageID).edit("paper > rock\nyou win, rip me")
                                 } else if (rpc === "paper") {
                                     foxmsg.channel.messages.get(foxmsg.guild.members.get(bot.user.id).lastMessageID).edit("paper = paper\ntie, lol lets do that again")
                                 } else {
                                     foxmsg.channel.messages.get(foxmsg.guild.members.get(bot.user.id).lastMessageID).edit("paper < scissors\nyou lose")
                                 }
                             } else {
                                 if (rpc === "rock") {
                                     foxmsg.channel.messages.get(foxmsg.guild.members.get(bot.user.id).lastMessageID).edit("scissors < rock\nyou lose")
                                 } else if (rpc === "paper") {
                                     foxmsg.channel.messages.get(foxmsg.guild.members.get(bot.user.id).lastMessageID).edit("scissors > paper\nyou win, rip me")
                                 } else {
                                     foxmsg.channel.messages.get(foxmsg.guild.members.get(bot.user.id).lastMessageID).edit("scissors = scissors\ntie, lol lets do that again")
                                 }
                             }


                         }, 100)
                     }, 500)
                 }, 500)
             } else {
                 foxmsg.channel.sendMessage("pick rock, paper or scissors please.")
             }
         }
         //reverse
         if (input.startsWith(prefix + "reverse ")) {
             foxmsg.channel.sendMessage("‮" + foxmsg.content.replace("f.reverse ", ""))
         }

         //geometry dash
         if (input.startsWith(prefix + "gd ")) {
             if (params[0] === "level") {
                 try {
                     GD.levels(foxmsg.content.replace(prefix + "gd level ", "")).then(levels => {
                         if (levels[0].author.name === gdUser.name) {
                             foxmsg.channel.sendMessage("Name: **" + levels[0].name + "**\nID: **" + levels[0].id + "**\nAuthor: **" + levels[0].author.name + " (creator of the bot)**\nSong: **" + levels[0].song.name + "** by **" + levels[0].song.author + "** (" + levels[0].song.url + ")\nDifficulty: **" + levels[0].difficulty + "**\nDownloads: **" + levels[0].downloads + "** :arrow_down_small:\nLikes: **" + levels[0].likes + "**\nStars: **" + levels[0].stars + "**\nFeatured?: " + levels[0].featured + "\nDescription: ***" + levels[0].description + "***\nCoins: **" + levels[0].coins + "**, verified?: " + levels[0].verifiedCoins + "\nVersion N" + levels[0].version)
                         } else {
                             foxmsg.channel.sendMessage("Name: **" + levels[0].name + "**\nID: **" + levels[0].id + "**\nAuthor: **" + levels[0].author.name + "**\nSong: **" + levels[0].song.name + "** by **" + levels[0].song.author + "** (" + levels[0].song.url + ")\nDifficulty: **" + levels[0].difficulty + "**\nDownloads: **" + levels[0].downloads + "** :arrow_down_small:\nLikes: **" + levels[0].likes + "**\nStars: **" + levels[0].stars + "**\nFeatured?: " + levels[0].featured + "\nDescription: ***" + levels[0].description + "***\nCoins: **" + levels[0].coins + "**, verified?: " + levels[0].verifiedCoins + "\nVersion N" + levels[0].version)
                         }
                     })
                 } catch (err) {
                     foxmsg.channel.sendMessage("level not found, or something weird happened.")
                 }
             } else if (params[0] === "user") {
                 try {
                     GD.users(foxmsg.content.replace(prefix + "gd user ", "")).then(users => {
                         if (users[0].username === "GDHackedFox") {
                             foxmsg.channel.sendMessage("`Account corrupted; cannnot read from memory.`")
                         } else if (users[0].username === gdUser.name) {
                             foxmsg.channel.sendMessage("Name: **" + users[0].username + "**\nID: **" + users[0].id + "**\nCP: **" + users[0].creatorPoints + "**\nCoins: **" + users[0].coins + "**, User Coins: **" + users[0].userCoins + "**\nStars: **" + users[0].stars + "**\nDemons: **" + users[0].demons + "**\n**The god, the creator of the bot.**")
                         } else if (gdGlobal.popular.list.includes(users[0].username)) {
                             foxmsg.channel.sendMessage("Name: **" + users[0].username + "**\nID: **" + users[0].id + "**\nCP: **" + users[0].creatorPoints + "**\nCoins: **" + users[0].coins + "**, User Coins: **" + users[0].userCoins + "**\nStars: **" + users[0].stars + "**\nDemons: **" + users[0].demons + "**\n**Popular person!**")
                         } else if (gdUser.trueFriends.list.includes(users[0].username)) {
                             foxmsg.channel.sendMessage("Name: **" + users[0].username + "**\nID: **" + users[0].id + "**\nCP: **" + users[0].creatorPoints + "**\nCoins: **" + users[0].coins + "**, User Coins: **" + users[0].userCoins + "**\nStars: **" + users[0].stars + "**\nDemons: **" + users[0].demons + "**\n**Good friends with TrueTheFox (bot creator)**")
                         } else if (gdUser.friends.list.includes(users[0].username)) {
                             foxmsg.channel.sendMessage("Name: **" + users[0].username + "**\nID: **" + users[0].id + "**\nCP: **" + users[0].creatorPoints + "**\nCoins: **" + users[0].coins + "**, User Coins: **" + users[0].userCoins + "**\nStars: **" + users[0].stars + "**\nDemons: **" + users[0].demons + "**\n**Friends with TrueTheFox (bot creator)**")
                         } else {
                             foxmsg.channel.sendMessage("Name: **" + users[0].username + "**\nID: **" + users[0].id + "**\nCP: **" + users[0].creatorPoints + "**\nCoins: **" + users[0].coins + "**, User Coins: **" + users[0].userCoins + "**\nStars: **" + users[0].stars + "**\nDemons: **" + users[0].demons + "**")
                         }
                     })
                 } catch (err) {
                     foxmsg.channel.sendMessage("user not found, or something weird happened.")
                 }
             }
         }
         //urban dic
         if (input.startsWith(prefix + "urban ")) {
             try {
                 urban(params[0]).first(function(json) {
                     foxmsg.channel.sendMessage("**" + json.word + "**\nby **" + json.author + "**\n`" + json.definition + "`\n **example:**\n`" + json.example + "`\n likes: **" + json.thumbs_up + "** :thumbsup:, dislikes: **" + json.thumbs_down + "** :thumbsdown: \n Read it here: " + json.permalink);
                 })
             } catch (err) {
                 foxmsg.channel.sendMessage("error: not found or somethin' else")
             }
         }
         //webhook
         if (input.startsWith(prefix + "webhook ")) {

             try {
                 var Hook = new Webhook(params[0])
                 Hook.info(params[1], foxmsg.content.replace(prefix + "webhook " + params[0] + " " + params[1] + " ", ""))
                 foxmsg.channel.sendFile("ok.png", "png", "ok, done")
             } catch (err) {
                 foxmsg.channel.sendMessage("failed for some reason.\nusage: `f.webhook (webhook link) (name) (text)")
             }
         }
         //Google thingy
         if (foxmsg.content.startsWith(prefix + "google")) {
             var query1 = params[0];
             var query = query1.replace(prefix, ' ');
             var limit = params[1];
             var options = {
                 query: query,
                 limit: limit,
                 age: 'y'
             };

             var n = 1;
             google.search(options, function(err, url) {
                 if (err) console.log(err);
                 if ((n - 1) < limit) {
                     foxmsg.channel.sendMessage("\n**result #" + n + "**\n" + url);
                     n++;
                 }
             });
         }


         if (input.startsWith(prefix + "osu ")) {
             if (params[0] === "beatmap") {
                 osu.get_beatmaps({
                     "s": params[1],
                     "limit": 1
                 }, function(result) {
                     try {
                         var mapOne = result[0]
                         let embed = {
                             title: "**" + mapOne.artist + " - " + mapOne.title + "**\nmapped by " + mapOne.creator,
                             fields: [{
                                     name: "Plays",
                                     value: ":arrow_forward: " + mapOne.playcount + "\n:checkered_flag: Passes: " + mapOne.passcount + " (" + mapOne.playcount / mapOne.passcount + "%)",
                                     inline: true
                                 },
                                 {
                                     name: "Loves",
                                     value: ":heart: " + mapOne.favourite_count,
                                     inline: true
                                 },
                                 {
                                     name: "Tags",
                                     value: "`" + mapOne.tags + "`",
                                     inline: true
                                 },
                                 {
                                     name: "Source",
                                     value: "`" + mapOne.source + "`",
                                     inline: true
                                 },
                                 {
                                     name: "Last updated",
                                     value: mapOne.last_update,
                                     inline: true
                                 },
                                 {
                                     name: "Link",
                                     value: "https://osu.ppy.sh/s/" + mapOne.user_id,
                                     inline: false
                                 }

                             ],
                             color: 12597,
                         }
                         foxmsg.channel.sendMessage("(embed) [NOT FULLY TRANFERRED TO EMBED YET]", { embed })
                     } catch (err) {
                         foxmsg.channel.sendMessage("hah, error, i think the beatmap wasnt found\nerror: `" + err + "`")
                     }
                 });
             } else if (params[0] === "user") {
                 osu.get_user({
                     "u": params[1],
                     "limit": 1
                 }, function(result) {
                     try {
                         var userOne = result[0]
                         let embed = {
                             title: "Showing stats for **" + userOne.username + "**",
                             fields: [{
                                     name: "Performance",
                                     value: parseInt(userOne.pp_raw) + "pp \n#" + userOne.pp_rank + " on global leaderboard\n#" + userOne.pp_country_rank + " on " + userOne.country + " :flag_" + userOne.country.toLowerCase() + ": leaderboard",
                                     inline: false
                                 },
                                 {
                                     name: "Gameplay Statistics (ranked, approved and loved maps only)",
                                     value: "Played " + userOne.playcount + " times\nAchieved ranks: \n" + userOne.count_rank_ss + " SS \n" + userOne.count_rank_s + " S \n" + userOne.count_rank_a + " A\nAccuracy: " + parseInt(userOne.accuracy) + "%\nScored in total: " + userOne.total_score + "\nMaximum score: " + userOne.ranked_score,
                                     inline: true
                                 },
                                 {
                                     name: "Link",
                                     value: "https://osu.ppy.sh/u/" + userOne.user_id,
                                     inline: false
                                 }
                             ],
                             color: 82897,
                         }
                         foxmsg.channel.sendMessage("Stats for **" + userOne.username + "**: (embed) [NOT FULLY BUG TESTED]", { embed })
                     } catch (err) {
                         foxmsg.channel.sendMessage("hah, error, i think the user wasnt found\nerror: `" + err + "`")
                     }
                 });
             }
         }

         //Coffee
         if (input.startsWith(prefix + "cafe ")) {
             if (foxmsg.guild.name === "ru.GDwsch") {
                 var details = foxmsg.content.replace(prefix + "cafe ", "");
                 if (details.startsWith("food ")) {
                     var details = details.replace("food ", "");
                     var foodverified = true
                     if (details === "food") {
                         foxmsg.channel.sendMessage("что-бы увидеть меню, сделай `f.cafe menu`.")
                         var foodverified = false
                     } else if (details === "muffin") {
                         foxmsg.delete(foxmsg.id)
                         foxmsg.channel.sendMessage("Делаю маффин для " + foxmsg.author + "...")
                         var waittime = 12731
                     } else if (details === "custard") {
                         foxmsg.delete(foxmsg.id)
                         foxmsg.channel.sendMessage("Делаю пасту для " + foxmsg.author + "...")
                         var waittime = 21732
                     } else if (details === "french fries") {
                         foxmsg.delete(foxmsg.id)
                         foxmsg.channel.sendMessage("Делаю картошку фри для " + foxmsg.author + "...")
                         var waittime = 7928
                     } else if (details === "cheeseburger") {
                         foxmsg.delete(foxmsg.id)
                         foxmsg.channel.sendMessage("Делаю чизбургер для " + foxmsg.author + "...")
                         var waittime = 25341
                     } else if (details === "taco") {
                         foxmsg.delete(foxmsg.id)
                         foxmsg.channel.sendMessage("Делаю шаурму для " + foxmsg.author + "...")
                         var waittime = 23816
                     } else {
                         foxmsg.channel.sendMessage("простите, у нас нет " + details + ". напишите `f.cafe menu food`.")
                         var foodverified = false
                     };
                     if (foodverified === true) {
                         setTimeout(function() {
                             var emote = ":fork_and_knife:"
                             if (details === "custard") {
                                 var emote = ":custard:"
                             } else if (details === "taco") {
                                 var emote = ":taco:"
                             } else if (details === "cheeseburger") {
                                 var emote = ":hamburger:"
                             } else if (details === "french fries") {
                                 var emote = ":fries:"
                             }
                             foxmsg.channel.sendMessage("Вот ваш " + details + ", " + foxmsg.author + "! " + emote)
                         }, waittime)
                     }
                 } else if (details.startsWith("drink ")) {
                     var details = details.replace("drink ", "");
                     var foodverified = true
                     if (details === "drink") {
                         foxmsg.channel.sendMessage("что-бы посмотреть меню, напиши `f.cafe menu drink`.")
                         var foodverified = false
                     } else if (details === "coffee") {
                         foxmsg.delete(foxmsg.id)
                         foxmsg.channel.sendMessage("Делаю кофе для " + foxmsg.author + "...")
                         var waittime = 11731
                     } else if (details === "tea") {
                         foxmsg.delete(foxmsg.id)
                         foxmsg.channel.sendMessage("Делаю чай для " + foxmsg.author + "...")
                         var waittime = 11735
                     } else if (details === "coke") {
                         foxmsg.delete(foxmsg.id)
                         foxmsg.channel.sendMessage("Достаю колу для " + foxmsg.author + "...")
                         var waittime = 11928
                     } else if (details === "water") {
                         foxmsg.delete(foxmsg.id)
                         foxmsg.channel.sendMessage("Достаю стакан воды для " + foxmsg.author + "...")
                         var waittime = 2300
                     } else {
                         foxmsg.channel.sendMessage("простите, у нас нет " + details + ". напиши `f.cafe menu drink`.")
                         var foodverified = false
                     };
                     if (foodverified === true) {
                         setTimeout(function() {
                             var emote = ":tumbler_glass:"
                             if (details === "water") {
                                 var emote = ":potable_water:"
                             }
                             foxmsg.channel.sendMessage("Вот ваш " + details + ", " + foxmsg.author + "! " + emote)
                         }, waittime)
                     };
                 } else if (details.startsWith("custom ")) {
                     var details = details.replace("custom ", "");
                     foxmsg.delete(foxmsg.id)
                     foxmsg.channel.sendMessage("Делаю " + details + " for " + foxmsg.author + "...");
                     setTimeout(function() {
                         foxmsg.channel.sendMessage("Вот ваш " + details + ", " + foxmsg.author + "!");
                         console.log("Served " + details + ".")
                     }, 10000)
                 } else if (details.startsWith("menu")) {
                     var details = details.replace("menu ", "");
                     if (details === "menu") {
                         foxmsg.delete(foxmsg.id)
                         let embed = {
                             title: "Меню Кафетерии",
                             author: {
                                 icon_url: "https://discordapp.com/api/users/239493437089513474/avatars/b77153eec12b7a6cb641813327da696b.jpg",
                                 name: "Школьная Кафетерия"
                             },
                             fields: [{
                                     name: "Напитки",
                                     value: "Кола - Мы все её знаем, вкусная, старая кола.\nКофе - напиток из кофе-бобов. Отличный для утра.\nЧай - Отличный напиток для дня и вечера.\nВода - вода)0)",
                                     inline: false
                                 },
                                 {
                                     name: "Еда",
                                     value: "Маффин - Вкусный шоколадный маффин. Маленький, но вкусный.\nПаста - Вкусная паста, с кетчупом или сыром.\nКартошка Фри - Не может быть пересолена. Картошка в виде палок. \nЧизбургер - бургер с сыром. Достаточно сказано.\nШаурма - очень популярная мексиканская еда. Всё закручивается в ролл. Очень вкусно.",
                                     inline: false
                                 }
                             ],
                             color: 20991,
                         }
                         foxmsg.channel.sendMessage("", { embed })
                     } else if (details === "food") {
                         foxmsg.delete(foxmsg.id)
                         let embed = {
                             title: "Меню Кафетерии",
                             author: {
                                 icon_url: "https://discordapp.com/api/users/239493437089513474/avatars/b77153eec12b7a6cb641813327da696b.jpg",
                                 name: "Школьная Кафетерия"
                             },
                             fields: [{
                                 name: "Еда",
                                 value: "Маффин - Вкусный шоколадный маффин. Маленький, но вкусный.\nПаста - Вкусная паста, с кетчупом или сыром.\nКартошка Фри - Не может быть пересолена. Картошка в виде палок. \nЧизбургер - бургер с сыром. Достаточно сказано.\nШаурма - очень популярная мексиканская еда. Всё закручивается в ролл. Очень вкусно.",
                                 inline: false
                             }],
                             color: 20991,
                         }
                         foxmsg.channel.sendMessage("", { embed })
                     } else if (details === "drink") {
                         foxmsg.delete(foxmsg.id)
                         let embed = {
                             title: "Cafe Menu\nTo order something, do f.cafe <drink/food> <thing>, and if you don't see your favorite food, do f.cafe custom <item>",
                             author: {
                                 icon_url: "https://discordapp.com/api/users/239493437089513474/avatars/b77153eec12b7a6cb641813327da696b.jpg",
                                 name: "TheFox Bot's"
                             },
                             fields: [{
                                 name: "Напитки",
                                 value: "Кола - Мы все её знаем, вкусная, старая кола.\nКофе - напиток из кофе-бобов. Отличный для утра.\nЧай - Отличный напиток для дня и вечера.\nВода - вода)0)",
                                 inline: false
                             }, ],
                             color: 20991,
                         }
                         foxmsg.channel.sendMessage("", { embed })
                     } else {
                         foxmsg.channel.sendMessage("у нас нет " + details + "!")
                     };
                 };
             } else {
                 var details = foxmsg.content.replace(prefix + "cafe ", "");
                 if (details.startsWith("food ")) {
                     var details = details.replace("food ", "");
                     var foodverified = true
                     if (details === "food") {
                         foxmsg.channel.sendMessage("to see menu of food, type `f.cafe menu food`")
                         var foodverified = false
                     } else if (details === "muffin") {
                         foxmsg.delete(foxmsg.id)
                         foxmsg.channel.sendMessage("Making a muffin for " + foxmsg.author + "...")
                         var waittime = 12731
                     } else if (details === "custard") {
                         foxmsg.delete(foxmsg.id)
                         foxmsg.channel.sendMessage("Making some custard for " + foxmsg.author + "...")
                         var waittime = 21732
                     } else if (details === "french fries") {
                         foxmsg.delete(foxmsg.id)
                         foxmsg.channel.sendMessage("Making french fries for " + foxmsg.author + "...")
                         var waittime = 7928
                     } else if (details === "cheeseburger") {
                         foxmsg.delete(foxmsg.id)
                         foxmsg.channel.sendMessage("Making a cheeseburger for " + foxmsg.author + "...")
                         var waittime = 25341
                     } else if (details === "taco") {
                         foxmsg.delete(foxmsg.id)
                         foxmsg.channel.sendMessage("Making a taco for " + foxmsg.author + "...")
                         var waittime = 23816
                     } else {
                         foxmsg.channel.sendMessage("sorry, i don't have " + details + " here. try `f.cafe menu food`.")
                         var foodverified = false
                     };
                     if (foodverified === true) {
                         setTimeout(function() {
                             var emote = ":fork_and_knife:"
                             if (details === "custard") {
                                 var emote = ":custard:"
                             } else if (details === "taco") {
                                 var emote = ":taco:"
                             } else if (details === "cheeseburger") {
                                 var emote = ":hamburger:"
                             } else if (details === "french fries") {
                                 var emote = ":fries:"
                             }
                             foxmsg.channel.sendMessage("Here's your " + details + ", " + foxmsg.author + "! " + emote)
                         }, waittime)
                     }
                 } else if (details.startsWith("drink ")) {
                     var details = details.replace("drink ", "");
                     var foodverified = true
                     if (details === "drink") {
                         foxmsg.channel.sendMessage("to see menu of food, type `f.cafe menu drink`.")
                         var foodverified = false
                     } else if (details === "coffee") {
                         foxmsg.delete(foxmsg.id)
                         foxmsg.channel.sendMessage("Making some coffee for " + foxmsg.author + "...")
                         var waittime = 11731
                     } else if (details === "tea") {
                         foxmsg.delete(foxmsg.id)
                         foxmsg.channel.sendMessage("Making some tea for " + foxmsg.author + "...")
                         var waittime = 11735
                     } else if (details === "coke") {
                         foxmsg.delete(foxmsg.id)
                         foxmsg.channel.sendMessage("Making coke for " + foxmsg.author + "...")
                         var waittime = 11928
                     } else if (details === "water") {
                         foxmsg.delete(foxmsg.id)
                         foxmsg.channel.sendMessage("Getting a cup of water for " + foxmsg.author + "...")
                         var waittime = 2300
                     } else {
                         foxmsg.channel.sendMessage("sorry, i don't have " + details + " here. try `f.cafe menu drink`.")
                         var foodverified = false
                     };
                     if (foodverified === true) {
                         setTimeout(function() {
                             var emote = ":tumbler_glass:"
                             if (details === "water") {
                                 var emote = ":potable_water:"
                             }
                             foxmsg.channel.sendMessage("Here's your " + details + ", " + foxmsg.author + "! " + emote)
                         }, waittime)
                     };
                 } else if (details.startsWith("custom ")) {
                     var details = details.replace("custom ", "");
                     foxmsg.delete(foxmsg.id)
                     foxmsg.channel.sendMessage("Making " + details + " for " + foxmsg.author + "...");
                     setTimeout(function() {
                         foxmsg.channel.sendMessage("Here's your " + details + ", " + foxmsg.author + "!");
                         console.log("Served " + details + ".")
                     }, 10000)
                 } else if (details.startsWith("menu")) {
                     var details = details.replace("menu ", "");
                     if (details === "menu") {
                         foxmsg.delete(foxmsg.id)
                         let embed = {
                             title: "Cafe Menu\nTo order something, do f.cafe <drink/food> <thing>, and if you don't see your favorite food, do f.cafe custom <item>",
                             author: {
                                 icon_url: "https://discordapp.com/api/users/239493437089513474/avatars/b77153eec12b7a6cb641813327da696b.jpg",
                                 name: "TheFox Bot's"
                             },
                             fields: [{
                                     name: "Drinks",
                                     value: "Coke - You all know it. Your amazing, and tasty Coke.\nCoffee - a drink made out of coffee beans. Amazing to drink at mornings.\nTea - Amazing drink for a dinner or lunch. It's just tasty, and nice to drink.\nWater - Just a cup of water.",
                                     inline: false
                                 },
                                 {
                                     name: "Food",
                                     value: "Muffin - A nice chocolate muffin. Tasty, yet small.\nCustard - Type of pasta. Usually comes with tomato sauce.\nFrench Fries - Can't be oversalted, can't be undersalted. Small tomato chips in the form of small sticks.\nCheeseburger - A burger containing cheese. Enough said.\nTaco - Really popular mexican food. All the ingredients are wrapped into a bread roll, everything tastes yummy with it.",
                                     inline: false
                                 }
                             ],
                             color: 20991,
                         }
                         foxmsg.channel.sendMessage("", { embed })
                     } else if (details === "food") {
                         foxmsg.delete(foxmsg.id)
                         let embed = {
                             title: "Cafe Menu\nTo order something, do f.cafe <drink/food> <thing>, and if you don't see your favorite food, do f.cafe custom <item>",
                             author: {
                                 icon_url: "https://discordapp.com/api/users/239493437089513474/avatars/b77153eec12b7a6cb641813327da696b.jpg",
                                 name: "TheFox Bot's"
                             },
                             fields: [{
                                 name: "Food",
                                 value: "Muffin - A nice chocolate muffin. Tasty, yet small.\nCustard - Type of pasta. Usually comes with tomato sauce.\nFrench Fries - Can't be oversalted, can't be undersalted. Small tomato chips in the form of small sticks.\nCheeseburger - A burger containing cheese. Enough said.\nTaco - Really popular mexican food. All the ingredients are wrapped into a bread roll, everything tastes yummy with it.",
                                 inline: false
                             }],
                             color: 20991,
                         }
                         foxmsg.channel.sendMessage("", { embed })
                     } else if (details === "drink") {
                         foxmsg.delete(foxmsg.id)
                         let embed = {
                             title: "Cafe Menu\nTo order something, do f.cafe <drink/food> <thing>, and if you don't see your favorite food, do f.cafe custom <item>",
                             author: {
                                 icon_url: "https://discordapp.com/api/users/239493437089513474/avatars/b77153eec12b7a6cb641813327da696b.jpg",
                                 name: "TheFox Bot's"
                             },
                             fields: [{
                                 name: "Drinks",
                                 value: "Coke - You all know it. Your amazing, and tasty Coke.\nCoffee - a drink made out of coffee beans. Amazing to drink at mornings.\nTea - Amazing drink for a dinner or lunch. It's just tasty, and nice to drink.\nWater - Just a cup of water.",
                                 inline: false
                             }, ],
                             color: 20991,
                         }
                         foxmsg.channel.sendMessage("", { embed })
                     } else {
                         foxmsg.channel.sendMessage("we don't have a menu of " + details + "! get your food right.")
                     };
                 };
             }
         };

         //smilies
         if (input.startsWith(prefix + "t ")) {
             foxmsg.delete(foxmsg.id)
             var smiley = foxmsg.content.replace(prefix + "t ", "");
             if (smiley === "lenny") {
                 foxmsg.channel.sendMessage("( ͡° ͜ʖ ͡°)")
             } else if (smiley === "shrug") {
                 foxmsg.channel.sendMessage("¯\_(ツ)_/¯")
             } else if (smiley === "cool") {
                 foxmsg.channel.sendMessage("(⌐■_■)")
             } else if (smiley === "why") {
                 foxmsg.channel.sendMessage("ಠ_ಠ")
             } else if (smiley === "cute") {
                 foxmsg.channel.sendMessage("^‿^")
             } else if (smiley === "list") {
                 foxmsg.channel.sendMessage("lenny, shrug, cool, why, cute")
             } else {
                 foxmsg.channel.sendMessage("no smilies found. try using `f.tlist`.")
             };
         };
         //support pls
         if (input.startsWith(prefix + "support ")) {
             if (params[0] === "respond" && foxmsg.author.id === authorid) {
                 bot.users.get(supportReportsIDs[params[1] - 1]).sendMessage(replace(prefix + "support respond " + params[1] + " ", ""))
             } else {
                 var casenum = supportReportsIDs.push(foxmsg.author.id)
                 foxmsg.channel.sendMessage("ok, sent. your case number is " + casenum)
                 bot.channels.get("271308584372011009").sendMessage("**case number " + casenum + "\n**``" + foxmsg.content.replace(prefix + "support ", "") + "``", { disableEveryone: true })
             }
         }
         //BEER
         if (input === prefix + "binfo") {
             foxmsg.channel.sendMessage("**Beer commands info**\n`border (beer)` - you order a beer, BUT you must order them from the menu\n`bmenu` - shows all the beer possible to order\n`binfo (beer)` - shows the beer info (like ingridients)\n`bsnack (snack)` - orders a snack")
         };
         //reactions
         if (foxmsg.content.startsWith(prefix + "react ")) {
             if (params[1] === undefined) {
                 foxmsg.react(params[0])
             } else {
                 if (params[2] === undefined) {
                     foxmsg.react(params[0])
                     foxmsg.react(params[1])
                 } else {
                     if (params[3] === undefined) {
                         foxmsg.react(params[0])
                         foxmsg.react(params[1])
                         foxmsg.react(params[2])
                     } else {
                         foxmsg.channel.sendMessage("3 is the maximum.")
                     }
                 }
             }
             foxmsg.channel.sendFile("ok.png", "png", "ok, done")
         };
         //rp thingy
         if (foxmsg.content.startsWith(prefix + "me ")) {
             var action = foxmsg.content.replace(prefix + "me ", "**" + foxmsg.author.username + "** ");
             var action = action.replace("@", "@ ")
             foxmsg.delete(foxmsg.id)
             foxmsg.channel.sendMessage(action)
         };
         if (foxmsg.content.startsWith(prefix + "say ")) {
             var action = foxmsg.content.replace(prefix + "say ", "");
             foxmsg.delete(foxmsg.id)
             foxmsg.channel.sendMessage('**' + foxmsg.author.username + '** says: "' + action + '"')
         };
         if (foxmsg.content.startsWith(prefix + "mea ")) {
             var action = foxmsg.content.replace(prefix + "mea " + params[0] + " ", "**" + params[0] + "** ");
             var action = action.replace("@", "@ ")
             foxmsg.delete(foxmsg.id)
             foxmsg.channel.sendMessage(action)
         };
         if (foxmsg.content.startsWith(prefix + "saya ")) {
             var action = foxmsg.content.replace(prefix + "saya " + params[0] + " ", "**" + params[0] + "** says: ");
             foxmsg.delete(foxmsg.id)
             foxmsg.channel.sendMessage(action)
         };
         //banning people
         if (foxmsg.content.startsWith(prefix + "ban ")) {
             try {
                 if (foxmsg.guild.member(foxmsg.author.id).permissions.hasPermission('BAN_MEMBERS')) {
                     var userid = params[0].replace("<", "")
                     var userid = userid.replace("@", "")
                     var userid = userid.replace(">", "")
                     var userid = userid.replace("!", "")
                     var user = foxmsg.guild.members.get(userid)
                     try {
                         foxmsg.ban(userid)
                     } catch (err) {
                         foxmsg.channel.sendMessage("could not find user. remember to mention the user, or just the id.")
                     }
                 } else {
                     foxmsg.channel.sendFile("What are you doing.png", "png", "what are you doing??\nno permission to ban members!")
                 };
             } catch (err) {
                 foxmsg.channel.sendMessage("not a guild or unknown error")
             }
         }

         if (foxmsg.content.startsWith(prefix + "unban ")) {
             try {
                 if (foxmsg.guild.member(foxmsg.author.id).permissions.hasPermission('BAN_MEMBERS')) {
                     var userid = params[0].replace("<", "")
                     var userid = userid.replace("@", "")
                     var userid = userid.replace(">", "")
                     var userid = userid.replace("!", "")
                     var user = bot.users.get(userid)
                     try {
                         foxmsg.unban(userid)
                     } catch (err) {
                         foxmsg.channel.sendMessage("could not find user. remember to mention the user, or just the id.")
                     }
                 } else {
                     foxmsg.channel.sendFile("What are you doing.png", "png", "what are you doing??\nno permission to ban members!")
                 };
             } catch (err) {
                 foxmsg.channel.sendMessage("not in a guild or unknown error")
             }
         }





         if (foxmsg.content.startsWith(prefix + "border ")) {
             var beer = foxmsg.content.replace(prefix + "border ", "");
             if (beer === "ale") {
                 foxmsg.channel.sendMessage(":beer: Your beer is in the works...")
                 setTimeout(function() { foxmsg.channel.sendMessage(":beer: Here's your Ale beer, " + foxmsg.author + "!") }, 5000)
             } else {
                 if (beer === "stout") {
                     foxmsg.channel.sendMessage(":beer: Your beer is in the works...")
                     setTimeout(function() { foxmsg.channel.sendMessage(":beer: Here's your Stout beer, " + foxmsg.author + "!") }, 7000)
                 } else {
                     if (beer === "lager") {
                         foxmsg.channel.sendMessage(":beer: Your beer is in the works...")
                         setTimeout(function() { foxmsg.channel.sendMessage(":beer: Here's your Lager beer, " + foxmsg.author + "!") }, 6000)
                     } else {
                         if (beer === "porter") {
                             foxmsg.channel.sendMessage(":beer: Your beer is in the works...")
                             setTimeout(function() { foxmsg.channel.sendMessage(":beer: Here's your Porter beer, " + foxmsg.author + "!") }, 5000)
                         } else {
                             if (beer === "malt") {
                                 foxmsg.channel.sendMessage(":beer: Your beer is in the works...")
                                 setTimeout(function() { foxmsg.channel.sendMessage(":beer: Here's your Malt beer, " + foxmsg.author + "!") }, 6000)
                             } else {
                                 if (beer === "vodka") {
                                     foxmsg.channel.sendMessage(":beer: Your vodka is in the works...")
                                     setTimeout(function() { foxmsg.channel.sendMessage(":beer: Here's your Vodka, " + foxmsg.author + "! for soivet russia сука блять.") }, 6000)
                                 } else {
                                     if (beer === "whiskey") {
                                         foxmsg.channel.sendMessage(":beer: Your whiskey is in the works...")
                                         setTimeout(function() { foxmsg.channel.sendMessage(":beer: Here's your Whiskey, " + foxmsg.author + "!") }, 6000)
                                     } else if (beer === "bleach") {
                                         foxmsg.channel.sendMessage("um... uh...\nbleach?...\nsorry... go ask some other bot i guess?...")
                                     } else if (beer === "random" || beer === "any") {
                                         foxmsg.channel.sendMessage(":grey_question: A random beer is in the works... don't die of patience please.")
                                         setTimeout(function() {
                                             var temp_num = Math.floor(Math.random() * 7)
                                             if (temp_num === 0) {
                                                 foxmsg.channel.sendMessage(":beer: Here's your Ale beer, " + foxmsg.author + "!")
                                             } else if (temp_num === 1) {
                                                 foxmsg.channel.sendMessage(":beer: Here's your Stout beer, " + foxmsg.author + "!")
                                             } else if (temp_num === 2) {
                                                 foxmsg.channel.sendMessage(":beer: Here's your Lager beer, " + foxmsg.author + "!")
                                             } else if (temp_num === 3) {
                                                 foxmsg.channel.sendMessage(":beer: Here's your Porter beer, " + foxmsg.author + "!")
                                             } else if (temp_num === 4) {
                                                 foxmsg.channel.sendMessage(":beer: Here's your Malt beer, " + foxmsg.author + "!")
                                             } else if (temp_num === 5) {
                                                 foxmsg.channel.sendMessage(":beer: Here's your Vodka, " + foxmsg.author + "! for soivet russia сука блять.")
                                             } else if (temp_num === 6) {
                                                 foxmsg.channel.sendMessage(":beer: Here's your Whiskey, " + foxmsg.author + "!")
                                             } else {
                                                 foxmsg.channel.sendMessage(":beer: Here's your Whiskey, " + foxmsg.author + "!")
                                             };
                                         }, 10000)
                                     } else {
                                         foxmsg.channel.sendMessage("sorry, i don't sell " + beer + "s here. really sorry.")
                                     };
                                 };
                             };
                         };
                     };
                 };
             };
         };
         //fox's phrases
         if (foxmsg.content.startsWith("f.foxphrase")) {
             var currentphrase = randomphrases[Math.floor(Math.random() * randomphrases.length)]
             let embed = { author: { icon: currentphrase.author.avatarURL, name: currentphrase.author.username }, color: 229933, title: "\"" + currentphrase.content + "\"", description: currentphrase.createdAt }
             foxmsg.channel.sendMessage(currentphrase.author.username + "#" + currentphrase.author.discriminator + " once said...", { embed })
         }
         //selfdestruct
         if (input.startsWith(prefix + "selfdestruct")) {
             var status = true
             if (params[1] === undefined) { foxmsg.channel.sendMessage("Error: time not specified"); var status = false }
             if (params[1] + 1 === NaN) { foxmsg.channel.sendMessage("Error: " + params[1] + " is not a number"); var status = false }
             if (foxmsg.author.id === authorid) {
                 if (status === true) {
                     foxmsg.delete(foxmsg.id)
                     foxmsg.channel.sendMessage(":ok_hand: ok, im gonna kms in " + params[1] + "ms")
                     setTimeout(function() {
                         foxmsg.channel.sendMessage("Literally dying rn :laughing: :laughing: :laughing:");
                         bot.user.setGame("Literally dying rn");
                         setTimeout(function() { bot.destroy(); }, 2000)
                     }, params[1])
                 }
             } else {
                 foxmsg.channel.sendFile("What are you doing.png", "png", "what are you doing??\nif you dont know, this is owner only!")
             }
         }
         //beer list
         //setnick
         if (input.startsWith(prefix + "setnick ")) {
             var nick = input.replace(prefix + "setnick ", "")
             foxmsg.guild.members.get("239493437089513474").setNickname(nick)
             foxmsg.channel.sendFile("ok.png", "png", "ok, changing nickname to " + nick)
         }
         //setnick for myself
         if (input.startsWith(prefix + "nick ")) {
             try {
                 var nick = input.replace(prefix + "nick ", "")
                 var nick = nick.replace("@everyone", "@ everyone")
                 foxmsg.guild.members.get(foxmsg.author.id).setNickname(nick)
                 foxmsg.channel.sendFile("ok.png", "png", "ok, attempting to set your nickname to " + nick)
             } catch (err) {
                 foxmsg.channel.sendMessage("not a server or unknown error")
             }
         }
         if (input === prefix + "bmenu") {
             foxmsg.channel.sendMessage("**Listing all beers avaivable:**\nStout\nLarger\nMalt\nPorter\nAle\nVodka\nWhiskey\nIf you are not sure with a certain type of beer, type in: `f.binfo (type)`")
         };
         if (foxmsg.content.startsWith(prefix + "binfo ")) {
             var beer = foxmsg.content.replace(prefix + "binfo ", "");
             if (beer === "ale") {
                 foxmsg.channel.sendMessage(":beer: *Info provided by www.thebeerstore.ca*\nBrewed with top fermenting yeast at cellar temperature, ales are fuller-bodied, with nuances of fruit or spice and a pleasantly hoppy finish. Generally robust and complex with a variety of fruit and malt aromas, ales come in many varieties. They could include Bitters, Milds, Abbey Ales, Pale Ales, Nut Browns, etc.\n\nAles are often darker than lagers, ranging from rich gold to reddish amber. Top fermenting, and more hops in the wort gives these beers a distinctive fruitfulness, acidity and pleasantly bitter seasoning. Ales have a more assertive, individual personality than lager, though their alcoholic strength is the same.\n\nAles are also 30% of all beer sold in Canada.")
             } else {
                 if (beer === "stout") {
                     foxmsg.channel.sendMessage(":beer: *Info provided by www.thebeerstore.ca*\nThere’s very little distinction between a Porter and a Stout, but they do have their differences.\n\nStout, not as sweet to the taste, features a rich, creamy head and is flavoured and coloured by barley. Stouts often use a portion of unmalted roasted barley to develop a dark, slightly astringent, coffee-like character.")
                 } else {
                     if (beer === "lager") {
                         foxmsg.channel.sendMessage(":beer: *Info provided by www.thebeerstore.ca*\nLager originates from the German word lagern which means 'to store' – it refers to the method of storing it for several months in near-freezing temperatures. Crisp and refreshing with a smooth finish from longer aging, lagers are the world's most popular beer (this includes pilseners).\n\nA lager, which can range from sweet to bitter and pale to black, is usually used to describe bottom-fermented brews of Dutch, German, and Czech styles. Most, however, are a pale to medium colour, have high carbonation, and a medium to high hop flavour.\n\nLagers are also 56% of all beer sold in Canada.")
                     } else {
                         if (beer === "porter") {
                             foxmsg.channel.sendMessage(":beer: *Info provided by www.thebeerstore.ca*\nThere’s very little distinction between a Porter and a Stout, but they do have their differences.\n\nPorter is a dark, almost black, fruity-dry, top fermenting style. An ale, porter is brewed with a combination of roasted malt to impart flavour, colour and aroma. Stout is also a black, roast brew made by top fermentation.")
                         } else {
                             if (beer === "malt") {
                                 foxmsg.channel.sendMessage(":beer: *Info provided by www.thebeerstore.ca*\nGenerally dark and sweeter in flavour, malts contain hints of caramel, toffee, and nuts. They can be light to full bodied.")
                             } else {
                                 if (beer === "vodka") {
                                     foxmsg.channel.sendMessage(":beer: *Info provided by Wikipedia*\nVodka is a distilled beverage composed primarily of water and ethanol, sometimes with traces of impurities and flavorings. Traditionally, vodka is made by the distillation of fermented cereal grains or potatoes, though some modern brands use other substances, such as fruits or sugar.")
                                 } else {
                                     if (beer === "whiskey") {
                                         foxmsg.channel.sendMessage(":beer: *Info provided by Wikipedia*\nWhisky or whiskey[1] is a type of distilled alcoholic beverage made from fermented grain mash. Various grains (which may be malted) are used for different varieties, including barley, corn (maize), rye, and wheat. Whisky is typically aged in wooden casks, generally made of charred white oak.\nWhisky is a strictly regulated spirit worldwide with many classes and types. The typical unifying characteristics of the different classes and types are the fermentation of grains, distillation, and aging in wooden barrels.")
                                     } else if (beer === "any" || beer === "random") {
                                         foxmsg.channel.sendMessage(":grey_question: A random beer...")
                                     } else {
                                         foxmsg.channel.sendMessage("no beer found. maybe try doing `f.menu`?")
                                     };
                                 };
                             };
                         };
                     };
                 };
             };
         };
         //let's have random sentences shall we?
         if (foxmsg.content.startsWith(prefix + "sentence")) {
             var people = foxmsg.content.replace(prefix + "sentence ")
             if (people === prefix + "sentence") {
                 foxmsg.channel.sendMessage("**Usage**\nf.sentence (first person) (second person)\nMakes a random sentence using the content of the message.")
             } else {
                 var template = Math.floor(Math.random() * 16)
                 if (template === 0) {
                     var randomphrase = params[0] + " already wanted to kill himself, but " + params[1] + " came and told him to stop."
                 } else if (template === 1) {
                     var template = params[1] + " walked " + params[0] + " to the local school. ''Why are we doing this'' - said " + params[1] + " in response."
                 } else if (template === 2) {
                     var template = params[0] + " tried to murder someone when " + params[1] + " came and said that they needs to be in school right now."
                 } else if (template === 3) {
                     var template = params[0] + " and " + params[1] + " both went to a pub and were drunk untill the morning."
                 } else if (template === 4) {
                     var template = params[0] + "'s house was set on fire. " + params[1] + " was murderously looking at the house, like they wanted that to happen."
                 } else if (template === 5) {
                     var template = params[0] + " and " + params[1] + " are sitting under a tree,\nK-I-S-S-I-N-G."
                 } else if (template === 6) {

                 }
                 foxmsg.channel.sendMessage(template)
             }
         };
         //NSFW commands
         try {
             if (foxmsg.content.startsWith(prefix + "nsfw ")) {
                 if (foxmsg.channel.topic === null) {
                     foxmsg.channel.sendMessage("this channel is not nsfw, put [nsfw] at the start of the topic")
                 } else {
                     if (foxmsg.channel.topic.includes("[nsfw]")) {
                         var tags = foxmsg.content.replace(prefix + "nsfw ", "");
                         if (tags === "help") {
                             foxmsg.channel.sendMessage("**NSFW commands**\nif you don't wish NSFW commands to be run on this channel, ask a mod to remove the [nsfw] from the start of the topic.\n`f.nsfw check` - checks if nsfw commands are allowed\n`f.nsfw search (tags)` - search for a nsfw picture with the tags (source is gelbooru)\nall commands of the bot - `f.help`")
                         } else if (tags === "check") {
                             foxmsg.channel.sendMessage("NSFW commands are enabled - to remove, remove the [nsfw] from the topic")
                         } else if (tags.startsWith("search ")) {
                             var tagsRaw = foxmsg.content.replace("f.nsfw search ", "")
                             var tags = tagsRaw.split(" ")
                             var imageCache = []
                             booru.search("db", [tags], 1)
                                 .then(booru.commonfy)
                                 .then(images => {
                                     //Log the direct link to each image
                                     for (let image of images) {
                                         try {
                                             foxmsg.channel.sendFile(image.common.file_url)
                                         } catch (err) {
                                             foxmsg.channel.sendMessage("error\ntell this to TheFox#5812: " + err)
                                         }
                                     }
                                 })
                         }
                     } else {
                         foxmsg.channel.sendMessage("this channel is not nsfw, put [nsfw] at the start of the topic")
                     }
                 };
             };
         } catch (err) {
             foxmsg.channel.sendMessage("nsfw not possible in DMs; invite me to a server with `f.invite`")
         }
         if (foxmsg.content.startsWith(prefix + "bsnack ")) {
             var snack = foxmsg.content.replace(prefix + "bsnack ", "");
             foxmsg.channel.sendMessage("getting snack...")
             setTimeout(function() { foxmsg.channel.sendMessage(":beer: Here's your " + snack + ", " + foxmsg.author + "! sorry if took too long.") }, 10000)
         };
         /* try {
         if(foxmsg.content.startsWith(prefix+"s-request")) {
         	if(foxmsg.guild.id === "247373734246219776") {
         		if(foxmsg.content === prefix+"s-request") {
         		foxmsg.channel.sendMessage("avaivable roles to request: `mod`, `admin`, `color`\nrequest with f.s-request `role`\nsyntax for mod/admin: f.request `mod.admin` `reason`\nsyntax for color: f.request color `color`")
         	} else {
         		if(params[0] === "mod") {
         			if(params[1] === undefined) {
         				foxmsg.channel.sendMessage("you have to specify the reason!")
         			} else {
         				bot.users.get("198382248427257856").sendMessage("hey! **"+foxmsg.author+"** requested to be mod in your server **"+foxmsg.guild.name+"**. reason: ``"+foxmsg.content.replace(prefix+"s-request "+params[0]+" ")+"``. go check him out.")
         				foxmsg.channel.sendMessage("sent request. may take up to 24 hours to respond.")
         				bot.channels.get("255323286433431562").sendMessage("user "+foxmsg.author.username+"#"+foxmsg.author.discriminator+" requested the role '"+params[0]+"'. reason: ``"+foxmsg.content.replace(prefix+"s-request "+params[0]+" ").replace("undefined","").replace("@","#")+"``.")
         			}
         		} else if(params[0] === "admin") {
         			if(params[1] === undefined) {
         				foxmsg.channel.sendMessage("you have to specify the reason!")
         			} else {
         				bot.users.get("198382248427257856").sendMessage("hey! **"+foxmsg.author+"** requested to be admin in your server **"+foxmsg.guild.name+"**. reason: ``"+foxmsg.content.replace(prefix+"s-request "+params[0]+" ")+"``. go check him out.")
         				foxmsg.channel.sendMessage("sent request. may take up to 24 hours to respond.")
         				bot.channels.get("255323286433431562").sendMessage("user "+foxmsg.author.username+"#"+foxmsg.author.discriminator+" requested the role '"+params[0]+"'. reason: ``"+foxmsg.content.replace(prefix+"s-request "+params[0]+" ").replace("undefined","").replace("@","#")+"``.")
         			}
         		} else if(params[0] === "color" || params[0] === "colour") {
         			if(params[1] === undefined) {
         				foxmsg.channel.sendMessage("you have to specify the color.\ncolors: `green`, `purple`, `dark-purple`, `black`, `white`, `red`, `light-blue`, `yellow`, `orange`, `delete`")
         			} else {
         				if(params[1] === "green") {
         				foxmsg.channel.sendMessage("ok, adding a green color to you :ok_hand:")
         				foxmsg.guild.members.get(foxmsg.author.id).addRole("253871787132059649")
         				} else if(params[1] === "purple") {
         				foxmsg.channel.sendMessage("ok, adding a purple color to you :ok_hand:")
         				foxmsg.guild.members.get(foxmsg.author.id).addRole("253872285956440064")
         				} else if(params[1] === "dark-purple") {
         				foxmsg.channel.sendMessage("ok, adding a darkish purple color to you :ok_hand:")
         				foxmsg.guild.members.get(foxmsg.author.id).addRole("254530065033854977")
         				} else if(params[1] === "black") {
         				foxmsg.channel.sendMessage("ok, adding a black color to you :ok_hand:")
         				foxmsg.guild.members.get(foxmsg.author.id).addRole("253875687553892353")
         				} else if(params[1] === "red") {
         				foxmsg.channel.sendMessage("ok, adding a red color to you :ok_hand:")
         				foxmsg.guild.members.get(foxmsg.author.id).addRole("255049034614439936")
         				} else if(params[1] === "yellow") {
         				foxmsg.channel.sendMessage("ok, adding a yellow color to you :ok_hand:")
         				foxmsg.guild.members.get(foxmsg.author.id).addRole("255639609915080704")
         				} else if(params[1] === "white") {
         				foxmsg.channel.sendMessage("ok, adding a white color to you :ok_hand:")
         				foxmsg.guild.members.get(foxmsg.author.id).addRole("255336809129705472")
         				} else if(params[1] === "light-blue") {
         				foxmsg.channel.sendMessage("ok, adding a sweet light blue color to you :ok_hand:")
         				foxmsg.guild.members.get(foxmsg.author.id).addRole("255049125312200724")
         				} else if(params[1] === "orange") {
         				foxmsg.channel.sendMessage("ok, adding an orange color to you :ok_hand:")
         				foxmsg.guild.members.get(foxmsg.author.id).addRole("255665060955947008")
         				} else if(params[1] === "delete") {
         				foxmsg.guild.members.get(foxmsg.author.id).removeRole("253871787132059649")
         				foxmsg.guild.members.get(foxmsg.author.id).removeRole("255049125312200724")
         				foxmsg.guild.members.get(foxmsg.author.id).removeRole("255336809129705472")
         				foxmsg.guild.members.get(foxmsg.author.id).removeRole("255639609915080704")
         				foxmsg.guild.members.get(foxmsg.author.id).removeRole("255049034614439936")
         				foxmsg.guild.members.get(foxmsg.author.id).removeRole("253875687553892353")
         				foxmsg.guild.members.get(foxmsg.author.id).removeRole("254530065033854977")
         				foxmsg.guild.members.get(foxmsg.author.id).removeRole("253872285956440064")
         				foxmsg.guild.members.get(foxmsg.author.id).removeRole("255665060955947008")
         				foxmsg.channel.sendMessage("ok, deleted all color roles from you :ok_hand:\nget them back with `f.s-request color (color)`")
         				}
         			}
         		}
         	}
         	}
         }
         } catch(err) {
         foxmsg.channel.sendMessage("uh oh, something went wrong.")
         }
         */
         if (input.startsWith(prefix + "clean") || input.startsWith(prefix + "clear")) {
             if (foxmsg.guild.members.get(foxmsg.author.id).permissions.hasPermission('MANAGE_MESSAGES')) {
                 foxmsg.delete()
                 if (params[0] === undefined) {
                     foxmsg.channel.sendMessage("deleting all messages...")
                     foxmsg.channel.bulkDelete(999999)
                     foxmsg.channel.sendMessage("wow, what a mess! deleted all messages.")
                 } else {
                     foxmsg.channel.sendMessage("deleting " + params[0] + " messages...")
                     foxmsg.channel.bulkDelete(params[0])
                     foxmsg.channel.sendMessage("wow, what a mess! deleted " + params[0] + " messages.")
                 }
             } else {
                 foxmsg.channel.sendMessage("stop right there! you don't have permissions for that!")
             }
         }

         if (foxmsg.content.startsWith("f.safebooru ")) {
             var tagsRaw = foxmsg.content.replace("f.safebooru ", "")
             var tags = tagsRaw.split(" ")
             booru.search("sb", [tags], 1)
                 .then(booru.commonfy)
                 .then(images => {
                     //Log the direct link to each image
                     for (let image of images) {
                         try {
                             foxmsg.channel.sendMessage(image.common.file_url + "\nscore: " + image.score + "\ntags: `" + image.tags + "`\nsource: `" + image.source + "`\nok, enjoy the cuties here at the safe part of booru :))")
                         } catch (err) {
                             foxmsg.channel.sendMessage("error\ntell this to TheFox#5812: " + err)
                         }
                     }
                 })
         }

         if (input.startsWith(prefix + "event")) {
             if (params[0] === "current") {
                 if (currentEvent === undefined || currentEvent === null) {
                     foxmsg.channel.sendMessage("no event. check again later.")
                 } else {
                     foxmsg.channel.sendMessage("the current event is " + currentEvent)
                 }
             } else if (params[0] === "stop") {
                 if (foxmsg.author.id === authorid) {
                     if (currentEvent === null) {
                         foxmsg.channel.sendMessage("fox, stop being stupid. there are no events right now. unless someone hacked, idk, that's not my problem")
                     } else {
                         var currentEvent = null
                         foxmsg.channel.sendFile("ok.png")
                     }
                 } else {
                     foxmsg.channel.sendFile("What are you doing.png", "png", "bot owner only. ugh, why is it so hard to explain that to people.")
                 }
             } else {
                 if (params[0] === undefined || params[1] === undefined) {
                     foxmsg.channel.sendMessage("invalid syntax! usage: " + prefix + "event (event name) (set a game, true/false) (game to set) OR " + prefix + "event current")
                 } else if (params[1] === "true" && params[2] === undefined) {
                     foxmsg.channel.sendMessage("you have to specify the game to set! usage: " + prefix + "event (event name) (set a custom game, true/false) (game to set)")
                 } else {
                     if (foxmsg.author.id === authorid) {
                         var currentEvent = params[0]
                         if (params[1] === "true") {
                             bot.user.setGame(foxmsg.content.replace(prefix + "event " + currentEvent + " true ", "") + " | f.help (official)")
                             foxmsg.channel.sendFile("ok.png")
                         } else {
                             bot.user.setGame("Celebrating " + currentEvent + " | f.help (official)")
                             foxmsg.channel.sendFile("ok.png")
                         }
                     } else {
                         foxmsg.channel.sendFile("What are you doing.png", "png", "bot owner only. ugh, why is it so hard to explain that to people.")
                     }
                 }
             }
         }

         if (input.startsWith("f.dice ")) {
             if (Math.floor(Math.random() * params[0]).isNaN) {
                 foxmsg.channel.sendMessage("***WHAT ARE YOU DOING?***\n that isnt a number")
             } else {
                 foxmsg.channel.sendMessage("the magik dice rolled: :game_die: " + Math.floor(Math.random() * params[0]))
             }
         }

         if (input === "f.bsnack") {
             foxmsg.channel.sendMessage("**Snack command info**\ndo `f.bsnack (snack)` do order a snack. currently no menu whatsoever so you can order whatever you would like.")
         };
         //aww so cute cat command mewmewmew
         if (input === prefix + "cat") {
             foxmsg.channel.sendFile(randomCat.get(), "jpg", "**Did you know?**\n``" + catFacts.random() + "``")
         };
         //command to give avatar
         if (input === prefix + "icon") {
             foxmsg.channel.sendMessage("https://discordapp.com/api/users/" + foxmsg.author.id + "/avatars/" + foxmsg.author.avatar + ".jpg")
         };
         //command to get id
         if (input === prefix + "id") {
             foxmsg.channel.sendMessage("Your ID: ``" + foxmsg.author.id + "``")
         };
         //all info about user
         if (input.startsWith(prefix + "userinfo")) {
             if (foxmsg.guild === null) {
                 foxmsg.channel.sendMessage("Name: " + foxmsg.author.username + "#" + foxmsg.author.discriminator + " \nIcon URL: https://discordapp.com/api/users/" + foxmsg.author.id + "/avatars/" + foxmsg.author.avatar + ".jpg \nYour ID: ``" + foxmsg.author.id + "``Icon (full size): ")
             } else {
                 if (params[0] === undefined) {
                     foxmsg.channel.sendMessage("Name: " + foxmsg.author.username + "#" + foxmsg.author.discriminator + " \nIcon URL: https://discordapp.com/api/users/" + foxmsg.author.id + "/avatars/" + foxmsg.author.avatar + ".jpg \nYour ID: ``" + foxmsg.author.id + "``\nYour highest role: ``" + foxmsg.guild.members.get(foxmsg.author.id).highestRole.name + "``\nRoles list: " + foxmsg.guild.members.get(foxmsg.author.id).roles.map(role_index => " ``" + role_index.name + "``") + "\nGame: **" + foxmsg.guild.members.get(foxmsg.author.id).presence.game + "**\nStatus: **" + foxmsg.guild.members.get(foxmsg.author.id).presence.status + "**\nIcon (full size): ")
                 } else {
                     var userid = params[0].replace("<", "")
                     var userid = userid.replace("@", "")
                     var userid = userid.replace(">", "")
                     var userid = userid.replace("!", "")
                     var user = bot.users.get(userid)
                     try {
                         foxmsg.channel.sendMessage("Name: " + user.username + "#" + user.discriminator + " \nIcon: https://discordapp.com/api/users/" + userid + "/avatars/" + user.avatar + ".jpg \nID: ``" + userid + "``\nHighest role: ``" + foxmsg.guild.members.get(userid).highestRole.name + "``\nRoles list: " + foxmsg.guild.members.get(userid).roles.map(role_index => " ``" + role_index.name + "``") + "\nGame: **" + foxmsg.guild.members.get(userid).presence.game + "**\nStatus: **" + foxmsg.guild.members.get(userid).presence.status + "**\nIcon (full size): ")
                     } catch (err) {
                         foxmsg.channel.sendMessage("could not find user. remember to mention the user, or just the id.")
                     }
                 }
             }
         };
         try {
             if (input.startsWith(prefix + "role")) {
                 var avaivableRoles = { list: [], ids: [] }
                 if (foxmsg.guild.id === "227035392950403072") {
                     var avaivableRoles = { list: ["nsfw", "hardcore-nsfw"], ids: ["255046045967450113", "255046316059525140"] }
                 }
                 if (input === prefix + "role") {
                     foxmsg.channel.sendMessage("roles avaivable: " + avaivableRoles)
                 }
                 if (params[0] === "add") {
                     if (foxmsg.guild.id === "227035392950403072") {
                         if (params[1] === avaivableRoles.list[0]) {
                             foxmsg.channel.sendMessage("ok, assigning role " + avaivableRoles.list[0])
                             foxmsg.guild.members.get(foxmsg.author.id).addRole(avaivableRoles.ids[0])
                         } else if (params[1] === avaivableRoles.list[1]) {
                             foxmsg.channel.sendMessage("ok, assigning role " + avaivableRoles.list[1])
                             foxmsg.guild.members.get(foxmsg.author.id).addRole(avaivableRoles.ids[1])
                         }
                     }
                 } else if (params[0] === "del") {
                     if (foxmsg.guild.id === "227035392950403072") {
                         if (params[1] === avaivableRoles.list[0]) {
                             foxmsg.channel.sendMessage("ok, deleting role " + avaivableRoles.list[0])
                             foxmsg.guild.members.get(foxmsg.author.id).removeRole(avaivableRoles.ids[0])
                         } else if (params[1] === avaivableRoles.list[1]) {
                             foxmsg.channel.sendMessage("ok, deleting role " + avaivableRoles.list[1])
                             foxmsg.guild.members.get(foxmsg.author.id).removeRole(avaivableRoles.ids[1])
                         }
                     }
                 }
             }
         } catch (err) {
             foxmsg.channel.sendMessage("not avaivable in DMs or something else")
         }

         if (input === prefix + "serverinfo") {
             if (foxmsg.guild === null) {
                 foxmsg.channel.sendMessage("searching for info...")
                 foxmsg.channel.startTyping(99999)
                 setTimeout(function() {
                     foxmsg.channel.stopTyping(false);
                     foxmsg.channel.sendMessage("hey this is no server, this is DMs! what are you even trying to do?\nwhatever, the only thing im able to do now is this\n**DMs**\nPerson 1: **" + bot.user.username + "**\nPerson 2: **" + foxmsg.author.username + "**")
                 }, 3000)
             } else {
                 if (foxmsg.guild.icon === null) {
                     foxmsg.channel.sendMessage("Name: **" + foxmsg.guild.name + "** \nThis server doesn't have an icon.\nID: ``" + foxmsg.guild.id + "``\nChannels: **" + foxmsg.guild.channels.size + "**\nMembers: **" + foxmsg.guild.members.size + "**\nRegion: **" + foxmsg.guild.region + "**\nAFK timeout: **" + foxmsg.guild.afkTimeout + "**\nVerification Level: **" + foxmsg.guild.verificationLevel + "**")
                 } else {
                     foxmsg.channel.sendMessage("Name: **" + foxmsg.guild.name + "** \nIcon: https://discordapp.com/api/guilds/" + foxmsg.guild.id + "/icons/" + foxmsg.guild.icon + ".jpg \nID: ``" + foxmsg.guild.id + "``\nChannels: **" + foxmsg.guild.channels.size + "**\nMembers: **" + foxmsg.guild.members.size + "**\nRegion: **" + foxmsg.guild.region + "**\nAFK timeout: **" + foxmsg.guild.afkTimeout + "**\nVerification Level: **" + foxmsg.guild.verificationLevel + "**")
                 };
                 if (foxmsg.guild.owner.nickname === null) {
                     foxmsg.channel.sendMessage("Owner: **" + foxmsg.guild.owner.user.username + "#" + foxmsg.guild.owner.user.discriminator + "**")
                 } else {
                     foxmsg.channel.sendMessage("Owner: **" + foxmsg.guild.owner.user.username + "#" + foxmsg.guild.owner.user.discriminator + " (AKA " + foxmsg.guild.owner.nickname + ")**")
                 };
             };
         };

         if (input === prefix + "masshelp") {
             try {
                 if (foxmsg.channel.id === "249192469009399809") {
                     foxmsg.channel.sendMessage("+help")
                     foxmsg.channel.sendMessage("X-help")
                     foxmsg.channel.sendMessage(".help")
                     foxmsg.channel.sendMessage("-help")
                 }
             } catch (err) {
                 foxmsg.channel.sendMessage("in DMs, wont work")
             }
         }
         //ooooooooooooooooooooooooooooooooooooooooooooooooo im so smart
         if (input === prefix + "info") {
             var ping = Date.now() - foxmsg.createdTimestamp
             foxmsg.channel.sendMessage("```xl\n" + botname + "\nServer amount: " + bot.guilds.size + "\nCreator: @TheFox#5812\nCurrent Ping (respond time): " + ping + "\nUptime: " + process.uptime() + "```\nVersion: **" + version + "**");
         };
         //can i speak to ur manager pls
         if (input.startsWith(prefix + "report ") && !foxmsg.author.bot) {
             var report = foxmsg.content.replace(prefix + "report", ":arrow_right_hook: Bug found by **" + foxmsg.author.username + "#" + foxmsg.author.discriminator + "** > ")
             bot.channels.get("271308584372011009").sendMessage(foxmsg.content.replace(prefix + "report", ":arrow_right_hook: Bug found by **" + foxmsg.author.username + "#" + foxmsg.author.discriminator + "** > "), { disableEveryone: true })
             foxmsg.channel.sendFile("ok.png", "png", "ok, sent message to the official server")
         };

         if (input === prefix + "invite") {
             foxmsg.channel.sendMessage("want to invite me to a server, huh?\n:arrow_forward: use this link: **" + invitelink + "**")
         };

         //this one is a bass-dropping ass command
         if (input === prefix + "hi") {
             foxmsg.channel.sendFile("hi.png", "png", "hi!")
         };
         //when you are alone, speak to the bot pls ;-;
         //i spent like 3 hours crying in the corner, praying for it to work
         console.log(roleName[0])
         if (foxmsg.content.startsWith(prefix + "speak ")) {
             var temp_msg = input.replace(prefix + "speak ", "");
             foxmsg.channel.sendMessage("*Thinking, wait...*")
             Cleverbot.prepare(function() {
                 cleverbot.write(temp_msg, function(response) {
                     foxmsg.channel.sendMessage(foxmsg.author + ", " + response.message, bot.user.lastMessageID);
                 });
             })
         }
         //8ball
         if (input.startsWith(prefix + "8ball ")) {
             var phrase = input.replace(prefix + "8ball ", "")
             var temp_num = Math.floor(Math.random() * 10)
             if (temp_num === 0) {
                 var reply = "yes"
             } else if (temp_num === 1) {
                 var reply = "no"
             } else if (temp_num === 2) {
                 var reply = "nopls"
             } else if (temp_num === 3) {
                 var reply = "yespls"
             } else if (temp_num === 4) {
                 var reply = "uh, i think so?"
             } else if (temp_num === 5) {
                 var reply = "nope"
             } else if (temp_num === 6) {
                 var reply = "yeah"
             } else if (temp_num === 7) {
                 var reply = "naah."
             } else if (temp_num === 8) {
                 var reply = "idk"
             } else if (temp_num === 9) {
                 var reply = "omg holy shit yes"
             } else {
                 var reply = "not sure about that"
             };
             foxmsg.channel.sendMessage(foxmsg.author + ", " + reply + "\nin reply to `" + phrase + "`")
         }
         //a a a a a a a a  help me
         //no i meant get me out of here, not send me commands
         //here it explains commands
         if (input.startsWith(prefix + "help ")) {
             var command = input.replace(prefix + "help ", "")
             if (command === "help") {
                 foxmsg.channel.sendMessage("shows all the commands. useful for being the first command.\nUsage: `f.help` OR `f.help command`")
             } else if (command === "hi" || command === "hello" || command === "ping") {
                 foxmsg.channel.sendMessage("sends output message. useful for testing if the bot is alive.\nUsage: `f.hello` OR `f.hi` OR `f.ping`")
             } else if (command === "invite") {
                 foxmsg.channel.sendMessage("sends an invite for the bot and for the server.\nUsage: `f.invite`")
             } else if (command === "stats") {
                 foxmsg.channel.sendMessage("sends info about the bot.\nUsage: `f.info`")
             } else if (command === "cat") {
                 foxmsg.channel.sendMessage("meow!\npurrr...\nThis message was taken over by cats.\nUsage: `f.cat`")
             } else if (command === "speak") {
                 foxmsg.channel.sendMessage("talk with the bot. data gotten from cleverbot. same effect from DMing the bot.\nUsage: `f.speak <message>`")
             } else if (command === "userinfo") {
                 foxmsg.channel.sendMessage("sends information about you. such as icon, id, and such.\nUsage: `f.userinfo`")
             } else if (command === "serverinfo") {
                 foxmsg.channel.sendMessage("sends info about server.\nUsage: `f.serverinfo`")
             } else if (command === "icon") {
                 foxmsg.channel.sendMessage("sends your icon.\nUsage: `f.icon`")
             } else if (command === "id") {
                 foxmsg.channel.sendMessage("sends your id.\nUsage: `f.id`")
             } else if (command === "dice") {
                 foxmsg.channel.sendMessage("gives a random number.\nUsage: `f.dice`")
             } else if (command === "tag") {
                 foxmsg.channel.sendMessage("basic tagbot impression. `f.tag list` for all tags. \nUsage: `f.tag <tag>`")
             } else if (command === "report") {
                 foxmsg.channel.sendMessage("reports a bug.\nUsage: `f.report <bug>`")
             } else if (command === "setgame") {
                 foxmsg.channel.sendMessage("sugguests a game for the bot.\nUsage: `f.setgame <game>`")
             } else if (command === "google") {
                 foxmsg.channel.sendMessage("googles something.\nUsage: `f.google <item> <number of results to show>`")
             } else if (command === "setnick") {
                 foxmsg.channel.sendMessage("sets the nickname for the bot to the thing you enter.\nUsage: `f.setnick <name>`")
             } else if (command === "nick") {
                 foxmsg.channel.sendMessage("sets your nickname to something.\nUsage: `f.nick <name>`")
             } else if (command === "webhook") {
                 foxmsg.channel.sendMessage("sends a webhook.\nUsage: `f.webhook (link) (name) (text)`")
             } else if (command === "urban") {
                 foxmsg.channel.sendMessage("searches the urban disctonary\nUsage: `f.urban (banana)`")
             } else if (command === "8ball") {
                 foxmsg.channel.sendMessage("asks the 8 ball.\nUsage: `f.8ball (question)`")
             } else if (command === "indev") {
                 foxmsg.channel.sendMessage("`f.kys (person)`, `f.nsfw <check/help/search>`, `f.sentence (p1) (p2)`, `f.ban (person)`, `f.unban (person)`, `f.react (emojis)`")
             } else {
                 foxmsg.channel.sendMessage("no command found. see `f.help` for all commands.")
             }
         }
         //and here it shows all of them
         if (input === prefix + "help") {
             foxmsg.channel.sendMessage("here! http://thefoxsgdps.rf.gd/commands <- click here")
         };
         if (input === prefix + "get cancer") {
             foxmsg.channel.sendMessage("No.")
         };
         if (foxmsg.content.startsWith(prefix + "eval") === true) {
             if (foxmsg.author.id === authorid || foxmsg.author.id === "239493437089513474") {
                 try {
                     var code = params.join(" ");
                     var evaled = eval(code);

                     if (typeof evaled !== "string")
                         evaled = require("util").inspect(evaled);

                     let embed = {
                         title: "Eval",
                         color: "990000",
                         fields: [{
                                 name: "Input",
                                 value: "```xl\n" + code + "\n```",
                                 inline: true
                             },
                             {
                                 name: "Output",
                                 value: "```xl\n" + clean(evaled) + "\n```",
                                 inline: true
                             }
                         ],
                         description: "isnt fox so cool? yeah he definetely is"
                     }

                     foxmsg.channel.sendMessage("", { embed });
                     foxmsg.react("☑")
                 } catch (err) {
                     foxmsg.channel.sendMessage(`:warning: \`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
                 };
             } else {
                 foxmsg.channel.sendMessage("Output:... wait a minute. you arent owner are you? good job trying to trick me, but wont work there bud!")
             };
         };
         if (input === prefix + "die") {
             if (foxmsg.author.id === authorid) {
                 foxmsg.channel.sendMessage("rip thefoxbot 2016-2017\ncurrently respawning")
                 bot.destroy();
             } else {
                 foxmsg.channel.sendMessage("rip thefoxbot 2016-... wait a minute. you arent owner are you? good job trying to trick me, but wont work there bud!")
             };
         }

         //for mascu <3
         //the rekt commands! (yay)
         if (foxmsg.guild.id === "204022478660567040") {

             if (foxmsg.content === "f.tr-role english") {
                 foxmsg.guild.members.get(foxmsg.author.id).addRole("288717435085914112")
                 foxmsg.channel.sendMessage("**Role selected! Have fun!**")
             }

             if (foxmsg.content === "f.tr-role spanish") {
                 foxmsg.guild.members.get(foxmsg.author.id).addRole("288717406220713984")
                 foxmsg.channel.sendMessage("**El rango a sido seleccionado! Disfruta!**")
             }

             if (foxmsg.content === "f.tr-role both") {
                 foxmsg.guild.members.get(foxmsg.author.id).addRole("289096244406517761")
                 foxmsg.channel.sendMessage("**Role selected! Have fun!\nEl rango a sido seleccionado! Disfruta!**")
                 foxmsg.author.sendMessage("**The Rekt commands help:**\nf.tr-color add (color)\nf.tr-color remove (color)")
             }
             var therekt_colors = { "darkred": "271359078792560641", "red": "271358979354001409", "lightred": "271359078792560641", "orange": "271359421915856908", "yellow": "271359563335335936", "limegreen": "271359691467128832", "lightgreen": "308653813521448960", "green": "271312128768475137", "darkgreen": "308653813521448960", "forestgreen": "308653813521448960", "torquoise": "308653813521448960", "lightblue": "308653813521448960", "blue": "308653813521448960", "coolblue": "308653813521448960", "waterblue": "308653813521448960", "deepblue": "308653813521448960", "darkblue": "308653813521448960", "galaxypurple": "308653813521448960", "purple": "308653813521448960", "lightpurple": "308653813521448960", "pink": "308653813521448960", "lightpink": "308653813521448960", "white": "308653813521448960", "grey": "308653813521448960", "brown": "308653813521448960", "black": "308653813521448960" }
                 //var therekt_colors = {"red": "310136523574083594", "blue": "310136547879944202"}

             if (foxmsg.content.startsWith("f.tr-color add ")) {
                 if (therekt_colors[params[1]] === undefined) {
                     foxmsg.channel.sendMessage("Invalid color. Color inválido.")
                 } else {
                     foxmsg.guild.members.get(foxmsg.author.id).addRole(therekt_colors[params[1]])
                     foxmsg.channel.sendMessage("Added color! Color añadido!")
                 }
             }

             if (foxmsg.content.startsWith("f.tr-color remove ")) {
                 if (therekt_colors[params[1]] === undefined) {
                     foxmsg.channel.sendMessage("Invalid color. Color inválido.")
                 } else {
                     foxmsg.guild.members.get(foxmsg.author.id).removeRole(therekt_colors[params[1]])
                     foxmsg.channel.sendMessage("Removed color! Color removido!")
                 }
             }

         } //the rekt roles end

         //we are now entering the land of picturetwow
         if (foxmsg.guild === null && foxmsg.content === "f.submit") {
             if (foxmsg.attachments.toArray().size < 1) {
                 foxmsg.channel.sendMessage("uh oh, it seems as you didnt provide any image to submit! tip: it must be in the same message as the command.")
             } else if (foxmsg.attachments.toArray().size > 1) {
                 foxmsg.channel.sendMessage("i dont get it. which image are you trying to send me?")
             } else if (foxmsg.attachments.toArray()[0].width === undefined) {
                 foxmsg.channel.sendMessage("wait, that isnt an image. delet!!!!")
             } else if (foxmsg.attachments.toArray()[0].width < 50 || foxmsg.attachments.toArray[0].height < 50) {
                 foxmsg.channel.sendMessage("thats too small of an image. get a bigger image!")
             } else {
                 foxmsg.channel.sendMessage("ok, accepted!")
                 bot.channels.get("322020086166585344").sendMessage(foxmsg.author.username + "#" + foxmsg.author.descriminator + " submitted this:" + foxmsg.attachments.toArray()[0].url)
             }
         }
     }
 });

 bot.on("guildMemberAdd", member => {
     let guild = member.guild;
     if (guild.id === "204022478660567040") {
         bot.channels.get("303477710217412608").sendMessage("**Hello <@" + member.user.id + ">! Select your language:\nHola <@" + member.user.id + ">! Seleccione su lenguaje:**\nf.tr-role english - :flag_gb:\nf.tr-role spanish - :flag_es:\nf.tr-role both - :star2:\n**--------**")
     }
     if (guild.id === "310902454818701322") {
         console.log("i attempted")
         bot.channels.get("311204133262721026").sendMessage("welcome, <@" + member.user.id + ">, please read <#311170712683413515>. signups are currently closed, so wait for season 2. you are user #" + guild.members.size + " on this server.")
     }
     if (guild.id === "297721892264214528") {
         bot.channels.get("311927686106841089").sendMessage("welcome, <@" + member.user.id + ">! read <#297721981531324417>, and then you'll understand what you have to do.")
     }
 });

 bot.on("guildMemberRemove", member => {
     let guild = member.guild;
     if (guild.id === "310902454818701322") {
         console.log("i attempted")
         bot.channels.get("311204133262721026").sendMessage("goodbye <@" + member.user.id + ">. we have " + guild.members.size + " members now.")
     }
 })


 bot.on("channelCreate", channel => {
     try {
         if (guildSettings[channel.guild.id].log) {
             channel.guild.channels.get(channel.guild.channels.filter(channel => channel.name === guildSettings[channel.guild.id].logChannel).first().id).sendMessage("new channel: " + channel.toString() + "!")
         }
     } catch (err) {
         console.log("failed to send channel message\nerror: " + err)
     }
 })

 bot.on("channelDelete", channel => {
     try {
         if (guildSettings[channel.guild.id].log) {
             channel.guild.channels.get(channel.guild.channels.filter(channel => channel.name === guildSettings[channel.guild.id].logChannel).first().id).sendMessage("channel " + channel.name + " was deleted.")
         }
     } catch (err) {
         console.log("failed to send channel message\nerror: " + err)
     }
 })

 bot.on("guildEmojiDelete", emoji => {
     try {
         if (guildSettings[emoji.guild.id].log) {
             emoji.guild.channels.get(emoji.guild.channels.filter(channel => channel.name === guildSettings[emoji.guild.id].logChannel).first().id).sendMessage("emoji " + emoji.name + " was deleted.")
         }
     } catch (err) {
         console.log("failed to send emoji message\nerror: " + err)
     }
 })

 bot.on("guildEmojiCreate", emoji => {
     try {
         if (guildSettings[emoji.guild.id].log) {
             emoji.guild.channels.get(emoji.guild.channels.filter(channel => channel.name === guildSettings[emoji.guild.id].logChannel).first().id).sendMessage("emoji " + emoji.toString() + " (" + emoji.name + ") was added!")
         }
     } catch (err) {
         console.log("failed to send emoji message\nerror: " + err)
     }
 })

 bot.on("guildBanAdd", member => {
     try {
         if (guildSettings[member.guild.id].log) {
             guild.channels.get(guild.channels.filter(channel => channel.name === guildSettings[member.guild.id].logChannel).first().id).sendMessage(member.name + " got banned, lol git rekt scrub")
         }
     } catch (err) {
         console.log("failed to send ban message\nerror: " + err)
     }
 })

 bot.on("guildBanRemove", member => {

     try {
         if (guildSettings[member.guild.id].log) {
             guild.channels.get(guild.channels.filter(channel => channel.name === guildSettings[member.guild.id].logChannel).first().id).sendMessage(member + " got unbanned, welcome back!")
         }
     } catch (err) {
         console.log("failed to send unban message\nerror: " + err)
     }
 })

 bot.on("guildDelete", guild => {
     superagent.post("https://bots.discord.pw/api/bots/239493437089513474/stats").send({ "server_count": bot.guilds.size }).set("Authorization", "").end()
     bot.users.get(authorid).sendMessage("hey fox, somebody removed me from a server called `" + guild.name + "` :c i am now in `" + bot.guilds.size + "` servers")

     fs.writeFile("./guildSettings.json", JSON.stringify(guildSettings))
 })

 bot.on("guildCreate", newguild => {
     try {
         superagent.post("https://bots.discord.pw/api/bots/239493437089513474/stats").send({ "server_count": bot.guilds.size }).set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIyMDk3NjUwODgxOTY4MjEwMTIiLCJyYW5kIjo3MjIsImlhdCI6MTQ5MjU5MjQ4Mn0.mbssrl4ekromNdFnkaJCJKhinUy73LnhZK_knEWUI_c").end()
         bot.users.get(authorid).sendMessage("hey fox, somebody added me to a server called `" + newguild.name + "` ! i am now in `" + bot.guilds.size + "` servers.")
         var opinionList = ["this looks nice already.", "nice place you have here!", "this server looks nice so far.", "hope this wont be like hell.", "thanks a lot for inviting me into this cool place!", "i like this server so far.", "~~tell me quick, does this server have an nsfw channel~~", "i like it here, so i'll stick around for now."]
         serverOpinion = opinionList[Math.floor(Math.random() * opinionList.length)]
         if (newguild.name.toLowerCase().includes("hell")) {
             serverOpinion = "god dammit, why did you invite me to hell?"
         } else if (newguild.name.toLowerCase().includes("fun")) {
             serverOpinion = "i dont think i want to have... \"fun\" but ill stick around for now. unless you wish to.. shh, let's not get this conversation any more deep. there are kids here."
         } else if (newguild.name.toLowerCase().includes("cancer")) {
             serverOpinion = "dont tell me i got infected with cancer by joining this server."
         } else if (newguild.name.toLowerCase().includes("meme")) {
             serverOpinion = "send pepe memes kthx."
         }

         newguild.defaultChannel.sendMessage("oh cool, i got invited to another server. " + serverOpinion + "\n say f.help if you need any help about me! like commands, just, do that ples.")
         guildSettings[newguild.id] = { mute: false }
         fs.writeFile("./guildSettings.json", JSON.stringify(guildSettings))
     } catch (err) {
         console.log("failed to send new server message\nerror: " + err)
     }
 });

 bot.login(token);
