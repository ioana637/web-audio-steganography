export function fromBlobToFile(blob: Blob, filename: string, initialFilename: string): File {
    if (initialFilename.indexOf('.mp3')>-1) {
        blob = blob.slice(0, blob.size, "audio/mpeg")
    } else {
        blob = blob.slice(0, blob.size, "audio/wav")
    }
    const b: any = blob;
    b.lastModifiedDate = new Date();
    b.name = filename;
    return <File>b;
}

