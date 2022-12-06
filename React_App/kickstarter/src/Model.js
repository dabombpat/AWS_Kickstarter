export class Model{

    constructor(){
        this.projects = null;
        this.admins = null;
        this.designers = null;
        this.supporters = null;
        }
}

export class Project {

    constructor(){
        this.name = null;
        this.story = null;
        this.designer = null;
        this.goal = null;
        this.pledges = null;
        this.supporters = null;
        this.deadline = null;
        this.isLaunched = false;
        this.failed = false;
    }
}

export class Designer {

    constructor(){
    this.email = null;
    this.password = null;
    this.projects = null;
    }
}

export class Supporter {

    constructor(){
        this.email = null;
        this.password = null;
        this.budget = null;
        this.pledges = null;
    }
}

export class Admin {

    constructor(){
        this.email = null;
        this.password = null;
        this.projects = null;
    }
}

export class Pledge {

    constructor(){
        this.amount = null;
        this.reward = null;
        this.maxsup = 0;
        this.currentsup = 0;
    }
}

export default Model;