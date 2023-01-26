import {Doc} from "./class/Doc";
import {Author} from "./class/author";
import {Folder} from "./class/Folder";

describe("Document features", () => {
    let louis, axel, oneDoc, folder1, folder2;

    // Initialize variables before each test case
    beforeEach(() => {
        louis = new Author("Louis"); // Create a new Author object with the name "Louis"
        axel = new Author("Axel"); // Create a new Author object with the name "Axel"
        oneDoc = new Doc("Doc 1", axel, false); // Create a new Doc object with the name "Doc 1", author "axel" and signed status as false
        folder1 = new Folder("Folder move", louis); // Create a new Folder object with the name "Folder move" and author "louis"
        folder2 = new Folder("Folder move 2", axel); // Create a new Folder object with the name "Folder move 2" and author "axel"
    });

    // Test case to check if the correct author is returned for the document
    test("Get author", () => {
        expect(oneDoc.getAuthor()).toEqual(axel); // Expect the getAuthor() function to return "axel"
    });

    // Test case to check if the correct name is returned for the document
    test("Get Document Name", () => {
        expect(oneDoc.getName()).toBe("Doc 1"); // Expect the getName() function to return "Doc 1"
    });

    // Test case to check if the document name can be set correctly
    test("Set Document Name", () => {
        oneDoc.setName("New name Document"); // Set the name of the document to "New name Document"
        expect(oneDoc.getName()).toBe("New name Document"); // Expect the getName() function to return "New name Document"
    });

    // Test case to check if the document author can be set correctly
    test("Set Document Author", () => {
        expect(oneDoc.getAuthor()).toEqual(axel); // Expect the getAuthor() function to return "axel"
        oneDoc.setAuthor(louis); // Set the author of the document to "louis"
        expect(oneDoc.getAuthor()).toEqual(louis); // Expect the getAuthor() function to return "louis"
    });

    // Test case to check if the document can be signed correctly
    test("Sign document", () => {
        oneDoc.sign(); // Sign the document
        expect(oneDoc.signed).toBe(true); // Expect the signed property of the document to be true
    });

    // Test case to check if the document name can be renamed correctly
    test("Rename document", () => {
        oneDoc.setName("Doc 1 renamed"); // Rename the document to "Doc 1 renamed"
        expect(oneDoc.getName()).toStrictEqual("Doc 1 renamed"); // Expect the getName() function to return "Doc 1 renamed"
    });

    // Test case to check if a document can be moved to another folder correctly
    test("Move a document to another folder", () => {
        expect(folder1.getDocs().length).toBe(0); // Expect the folder1 to have 0 documents
        folder1.addDoc(oneDoc); // Add the document to folder1
        oneDoc.moveTo(oneDoc, folder2); // Move the document to folder2
        expect(folder2.getDocs()).toContain(oneDoc); // Expect the folder2 to contain the document
    });

    // Test case to check if a document is not moved to a non-existent folder
    test("Move a document to another folder when the folder doesn't exist", () => {
        expect(folder1.getDocs().length).toBe(0); // Expect the folder1 to have 0 documents
        folder1.addDoc(oneDoc); // Add the document to folder1
        oneDoc.moveTo(null, null); // Attempt to move the document to a non-existent folder
        expect(folder2.getDocs()).toEqual([]); // Expect the folder2 to have 0 documents
    });

    // Test case to check if a document can be duplicated correctly
    test("Duplicate folder", () => {
        expect(oneDoc.duplicate()).toStrictEqual(oneDoc); // Expect the duplicate() function to return the same document
    });
});

describe("Author features", () => {
    let louis, axel, oneDoc, manyDocs;

    // Initialize the variables before each test case
    beforeEach(() => {
        louis = new Author('Louis');
        axel = new Author("Axel");
        oneDoc = new Doc("Doc 1", axel, false);
        manyDocs = [
            new Doc("Doc 2", louis, false),
            new Doc("Doc 1", axel, false),
        ];
    });

    // Test case to check if an author can delete one document correctly
    test("Delete one document", () => {
        louis.addDocs(manyDocs); // Add many documents to the author 'Louis'
        louis.deleteDoc(manyDocs[0]); // Delete the first document in the array
        expect(louis.getDocs()).toStrictEqual([manyDocs[1]]); // Expect the getDocs() function to return all documents except the first one
    });

    // Test case to check if an author can delete all documents correctly
    test("Delete all documents", () => {
        louis.addDocs(manyDocs); // Add many documents to the author 'Louis'
        louis.deleteAllDocs(); // Delete all documents
        expect(louis.docs.length).toBe(0); // Expect the length of the documents array to be 0
    });

    // Test case to check if an author can add many documents correctly
    test("Add many docs from empty docs", () => {
        louis.addDocs(manyDocs);
        expect(louis.getDocs()).toStrictEqual(manyDocs); // Expect the getDocs() function to return the same array of documents that were added
    });

    // Test case to check if an author can add one document correctly
    test("Add one doc", () =>{
        axel.addDoc(oneDoc);
        expect(axel.getDocs().length).toBe(1); // Expect the length of the documents array to be 1, indicating that one document has been added
    });

    // Test case to check if an author can count their documents correctly
    test("Count documents", () =>{
        louis.addDocs(manyDocs);
        expect(louis.countDocs()).toBe(manyDocs.length); // Expect the countDocs() function to return 2, indicating that two documents have been added
    });
});

// This code block tests various features of the Folder class
describe("Folder features", () => {
    let louis, axel, manyDocs, folder

    // Before each test, creates new instances of Author, Doc, and Folder
    beforeEach(() => {
        louis = new Author('Louis')
        axel = new Author("Axel")
        manyDocs = [
            new Doc("Doc 2", louis, false),
            new Doc("Doc 1", axel, false),
        ]
        folder = new Folder("Picture of montains", louis)
    })

    // Tests adding multiple documents to the folder
    test('Add many docs to folder', () =>{
        folder.addDocs(manyDocs)
        expect(folder.getDocs()).toStrictEqual(manyDocs);
    })

    // Tests getting the name of the folder
    test('Get folder name', () =>{
        expect(folder.getName()).toStrictEqual("Picture of montains");
    })

    // Tests getting the author of the folder
    test('Get author of folder', () =>{
        expect(folder.getAuthor()).toStrictEqual(louis);
    })

    // Tests getting the number of documents in the folder
    test('Get length of folder', () =>{
        folder.addDocs(manyDocs)
        expect(folder.getDocsLength()).toStrictEqual(2);
    })

    // Tests deleting a specific document from the folder
    test("Delete folder docs", () => {
        folder.addDocs(manyDocs);
        folder.deleteDoc(manyDocs[0]);
        expect(folder.getDocs()).toStrictEqual([manyDocs[1]]);
    })
})

