export const baseUrl = 'http://localhost:8080/api/audio-steganography';
export function encodeLsbUrl(indexBit: number, stepByte: number) {
    let url = `${baseUrl}/lsb`;
    if (indexBit) {
        url = `${url}?bitIndex=${indexBit}`;
        stepByte ? url = `${url}&stepByte=&${stepByte}` : {};
    } else if (stepByte) {
        url = `${url}?stepByte=${stepByte}`;
    }
    return url;
}
export const encodeEchoHidingUrl = `${baseUrl}/echoHiding`;