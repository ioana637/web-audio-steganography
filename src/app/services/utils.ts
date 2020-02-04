

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

export function drawBuffer( buffer ) {
    // buffer = Buffer.from(buffer);
    const width = 500;
    const height = 300;
    const context = (document.getElementById('view') as any).getContext('2d');
    const data = buffer.getChannelData( 0 );
    const step = Math.ceil( data.length / width );
    const amp = height / 2;
    for(let i=0; i < width; i++){
        let min = 1.0; 
        let max = -1.0;
        for (var j=0; j<step; j++) {
            var datum = data[(i*step)+j]; 
            if (datum < min)
                min = datum;
            if (datum > max)
                max = datum;
        }
        context.fillRect(i,(1+min)*amp,1,Math.max(1,(max-min)*amp));
    }
}

