


export class File {

    constructor(name, data, size, mimeType) {
        this.name = name;
        this.data = data;
        this.size = size;
        this.mimeType = mimeType;
        this.id = Date.now();
    }
}