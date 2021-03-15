class User {
    constructor(userName = '',
                firstName = '',
                lastName = '',
                password = '',
                email = '',
                clan = undefined,
                userLevel = 1) {
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.clan = clan;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userLevel = userLevel;
    }

    fullName() {
        return this.firstName + " " + this.lastName + " " + this.clan.clanName;
    }
}

class Clan {
    constructor(clanName = '', clanMaster = undefined, clanLevel = 1, clanLogo = '') {
        this.clanName = clanName;
        this.clanMaster = clanMaster;
        this.clanLevel = clanLevel;
        this.clanLogo = clanLogo;
    }
}
let clan = new Clan('P-Town-Slumpas');
let user = new User('SGT.SKRBL', 'Mattise', 'Hakala');
user.clan = clan;
user.userLevel+= 10;
console.log(user);
console.log(user.fullName());
console.log(user.userLevel);
