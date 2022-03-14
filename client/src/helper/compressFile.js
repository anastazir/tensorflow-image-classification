import Compress from 'compress.js';

export const compressFile = async (file) => {
    const compress= new Compress()
    const compressedFile = await 
    compress.compress([file], {
        size: 4, 
        quality: .75,
        maxWidth: 1920, 
        maxHeight: 1920, 
        resize: true,
        rotate: false,
    });
    return compressedFile;
}