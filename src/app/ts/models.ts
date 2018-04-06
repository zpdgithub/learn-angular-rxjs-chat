import { uuid } from './util/uuid';

export class User {
    id: string;
    constructor(
        public name: string,
        public avatarSrc: string
    ) {
        this.id = uuid();
    }
}

export class Thread {
    id: string;
    lastMessage: Message;
    name: string;
    avatarSrc: string;

    constructor(id?: string,
        name?: string,
        avatarSrc?: string) {
        this.id = id || uuid();
        this.name = name;
        this.avatarSrc = avatarSrc;
    }
}

