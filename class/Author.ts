import {Doc} from "./Doc";
import {Folder} from "./Folder";

export class Author {
    name: string
    docs: Doc[] = []
    folders: Folder[] = []

    constructor(name) {
        this.name = name
    }

    getDocs() {
        return this.docs
    }

    addDoc(document: Doc){
        this.docs.push(document)
    }

    addDocs(documents: Doc[]) {
        documents.forEach(doc => {
            if(!this.docs.includes(doc)) {
                this.docs.push(doc)
            }
        })
    }

    deleteDoc(document: Doc){
        this.docs = this.docs.filter(doc => doc !== document)
    }

    deleteAllDocs(){
        this.docs = []
    }

    countDocs(){
        return this.docs.length
    }

}
