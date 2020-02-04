export const baseUrl = 'http://localhost:8080/api/audio-steganography';
export function encodeLsbUrl(indexBit: number, stepByte: number) {
    let url = `${baseUrl}/lsb`;
    if (indexBit) {
        url = `${url}?bitIndex=${indexBit}`;
      // tslint:disable-next-line:no-unused-expression
        stepByte ? url = `${url}&stepByte=${stepByte}` : {};
    } else if (stepByte) {
        url = `${url}?stepByte=${stepByte}`;
    }
    return url;
}

export function decodeLsbUrl(indexBit: number, stepByte: number, textLength: number) {
    let url = `${baseUrl}/decode/lsb?textLength=${textLength}`;
    if (indexBit) {
        url = `${url}&bitIndex=${indexBit}`;
    } 
    if (stepByte) {
        url = `${url}&stepByte=${stepByte}`;
    }
    return url;
}

export function encodeEchoHidingUrl(delay: number) {
    return `${baseUrl}/echoHiding?delay=${delay}`;
} 
