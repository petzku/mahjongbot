/*
 * A simple bot that replies with emoji versions of mahjong hands
 */
"use strict";

const Discord = require("discord.js");
const conf = require("./conf");
const _ = require("lodash");

const image = require("./image");
const jail = require("./jail");

const bot = new Discord.Client();

const token = conf.token;
const prefix = conf.prefix;
//const emoji_codes = conf.emoji_codes;

const hand_regex = /((?:[0-9]\.?)+[psm]|(?:[0-7]\.?)+z)+/g;
const part_regex = /([0-9]+)([psm])|([1-7]+)z/g;
//const tile_regex = /[0-9][pms]|[1-7]z/;

function drop_to_first(haystack, needle) {
    return haystack.substring(haystack.indexOf(needle)+needle.length);
}

bot.on('message', (message) => {
    let content = message.content;
    if (content.startsWith(prefix+"jail")) {
        const ret = jail.jail(message);
        if (ret == 0) {
            // all ok, respond
            // TODO
            console.log("jail.jail success");
        } else {
            console.error("jail.jail failed with error code " + ret);
            console.error("message: '" + message.content + "'");
        }
    } else if (content.startsWith(prefix+"free")) {
        const ret = jail.free(message);
        if (ret == 0) {
            // all ok, respond
            // TODO
            console.log("jail.free success");
        } else {
            console.error("jail.free failed with error code " + ret);
            console.error("message: '" + message.content + "'");
        }
    } else {
        // test that it was actually a hand, and not a random use of $prefix
        if (/^!([0-9]+)([psm])|([1-7]+)z/g.test(content)) {
            // remove the prefix
            content = content.replace(prefix, '');
            let sets = [];
            let match;
            while ((match = hand_regex.exec(content)) !== null) {
                //do stuff
                sets.push(match[0]);
            }
            const name = sets.join(" ") + ".png";
            const img = image.render(sets);
            setTimeout(function() {
                img.getBuffer("image/png", function(err, file) {
                    message.channel.send(new Discord.Attachment(file, name));
                });
            }, 500);
    //        const msg = process_command(content);
    //        if (msg) {
    //            message.channel.sendMessage(msg);
    //        }
    //    } else if (content.includes(prefix)) {
    //        const rest = drop_to_first(content, prefix);
    //
    //            message.channel.sendMessage(process_hand(content));
        }
    }
});

bot.login(token)
    .then(() => { bot.user.setGame("Mahjong, probably"); });
