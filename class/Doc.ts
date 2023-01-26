import { Author } from "./Author"
import {Folder} from "./Folder";

export class Doc {
    public name: string
    public author: Author
    public signed: boolean
    public folder: Folder

    constructor(name: string, author: Author, signed: boolean) {
        this.name = name;
        this.author = author;
        this.signed = signed;
        this.folder = null;
    }

    getName() {
        return this.name;
    }

    setName(value) {
        this.name = value;
    }

    getAuthor() {
        return this.author;
    }

    getFolder() {
        return this.folder;
    }

    setFolder(folder) {
       this.folder = folder;
    }

    setAuthor(value) {
        this.author = value;
    }

    sign() {
        this.signed = true;
    }

    duplicate() {
        return new Doc(this.name, this.author, this.signed)
    }

    moveTo(doc, folder) {
        if (doc || folder) {
            this.getFolder().deleteDoc(doc);
            folder.addDoc(doc);
            doc.setFolder(folder);
        }
    }
}
