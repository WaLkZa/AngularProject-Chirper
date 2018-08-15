export class RegisterModel {
    constructor(
        public username: string,
        public password: string,
        public repeatPass: string,
        public subscriptions: string[] = []
    ) { }
}