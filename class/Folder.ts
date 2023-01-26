import { Doc } from "./Doc"
import {Author} from "./Author";

export class Folder {
    name: string
    docs: Doc[] = []
    author: Author

    constructor(name: string, author: Author) {
        this.name = name
        this.docs = [];
        this.author = author;
    }

    addDoc(doc: Doc) {
        this.docs.push(doc);
        doc.folder = this;
    }

    addDocs(documents: Doc[]) {
        documents.forEach(doc => {
            if(!this.docs.includes(doc)) {
                this.docs.push(doc)
            }
        })
    }

    getDocs(){
        return this.docs;
    }

    getName() {
        return this.name;
    }

    getAuthor() {
        return this.author;
    }

    getDocsLength(){
        return this.docs.length
    }

    deleteDoc(document: Doc){
        this.docs = this.docs.filter(doc => doc !== document)
    }
}
