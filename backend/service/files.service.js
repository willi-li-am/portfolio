const firebase = require('../firebase.js')
const bucket = firebase.bucket

const getFile = async (id) => {
}

const uploadFile = async (file, path, fileName) => {
    return new Promise(async(resolve, reject) => {
        if (!file || !file.mimetype.includes('image')) {
            reject("No file or wrong type of file")
        }
    
        const blob = bucket.file(`${path}/${fileName}`);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        }); 
    
        blobStream.on('error', (error) => {
            reject("Internal Error")
        });
    
        blobStream.on('finish', () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${path}%2F${fileName}?alt=media`;
            resolve(publicUrl)
        });
    
        blobStream.end(file.buffer);
    })
}

const checkFileExists = async (fileName, path) => {
    //check if a file exists in a path
}

module.exports = {
    getFile,
    uploadFile,
    checkFileExists
}