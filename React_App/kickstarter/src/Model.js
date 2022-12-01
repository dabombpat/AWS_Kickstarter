
export class Model{
    constructor(auser, type){
        this.user = auser;
        this.type = type;

        function setEmail(email){
            this.email = email}


        function setType(type){
            this.type = type}


        function getEmail(){
            return this.email}

        function getType(){
            return this.type}
        }
}
