export class ChattingMessageModel {
    owner: string;
    message: string;
    createAt: number;

    constructor(owner: string, message: string, createAt: number) {
        this.owner = owner;
        this.message = message;
        this.createAt = createAt;
    }
}
