export function fromBlobToFile(blob: Blob, filename: string): File {
    blob = blob.slice(0, blob.size, "audio/mpeg")
    const b: any = blob;
    b.lastModifiedDate = new Date();
    b.name = filename;
    return <File>b;
}

