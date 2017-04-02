/*
 * A simple bot that replies with emoji versions of mahjong hands
 */

const Discord = require("discord.js");
const conf = require("conf.js");

const bot = new Discord.Client();

const token = conf.token;
const prefix = conf.prefix;
const emoji_codes = conf.emoji_codes;

var hand_regex = /([0-9]+[psm]|[1-7]+z)+/g;
var part_regex = /([0-9]+)([psm])|([1-7]+)z/g;
var tile_regex = /[0-9][pms]|[1-7]z/;

function hand_to_emoji(hand) {
  var res = "";
  var match;

  while ((match = part_regex.exec(hand)) !== null) {
    var tiles = match[1] || match[3];
    var suit = match[2] || 'z';

    for (var t of tiles) {
      var code = t + suit;
      res += "<:" + code + ":" + emoji_codes[code] + ">";
    }
  }
  return res;
}

function process_command(content) {
  if (content.startsWith("dora")) {
    var msg = "";
    // dora tile
    var dora_tile = hand_regex.exec(content)[0];
    msg += "ドラ" + (hand_to_emoji(dora_tile)) + "        ";
    // this should work...
    msg += process_hand(content.substring(content.indexOf(dora_tile)+1));
    return msg;
  } else if (content.startsWith("hand") {
    return process_hand(content);
  } else {
    // if no command, assume we want to process hand
    return process_hand(content);
  }
}

function process_hand(content) {
  var msg = "";
  var match;

  while ((match = hand_regex.exec(content)) !== null) {
    var hand = match[0];
    msg += hand_to_emoji(hand) + "    ";
  }

  return msg;
}

bot.on('message', message => {
  var content = message.content;
  if (content.startsWith(prefix)) {
    // remove the prefix
    content = content.replace(prefix, '');
    var msg = process_command(content);
    message.channel.sendMessage(msg);
  } else if (content.includes(prefix)) {
    var rest = content.substring(content.indexOf(prefix)+1);
    // test that it was actually a command, and not a random use of $prefix
    if (new RegExp("^" + part_regex.source()).match(rest)) {
      var msg = process_hand(content);
      message.channel.sendMessage(msg);
    }
  }
});

bot.login(token);
