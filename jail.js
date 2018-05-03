// const JAIL_ROLE_ID = "441698026906451988"; // test role
const JAIL_ROLE_ID = "419145027307175937";
function jail(message) {
    const jail_role = message.guild.roles.get(JAIL_ROLE_ID);
    if (message.mentions.members.size < 1) {
        // no user specified, error
        return -1;
    }
    const target = message.mentions.members.first();
    if (target.roles.has(jail_role.id)) {
        // user already has role, error
        return 1;
    } else if (target.id == message.member.id) {
        // user trying to set own role
        return 2;
    } else {
        target.addRole(jail_role).catch(console.log);
        return 0;
    }
}
        
function free(message) {
    const jail_role = message.guild.roles.get(JAIL_ROLE_ID);
    if (message.mentions.members.size < 1) {
        // no user specified, error
        return -1;
    }
    const target = message.mentions.members.first();
    if (!target.roles.has(jail_role.id)) {
        // user doesn't have role, error
        return 1;
    } else if (target.id == message.member.id) {
        // user trying to set own role
        return 2;
    } else {
        target.removeRole(jail_role).catch(console.log);
        return 0;
    }
}


module.exports.jail = jail;
module.exports.free = free;
