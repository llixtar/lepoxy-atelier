const fs = require('fs');
try {
    const buffer = fs.readFileSync('public/images/hero-desktop.jpg');
    let offset = 2;
    while (offset < buffer.length) {
        const marker = buffer.readUInt16BE(offset);
        offset += 2;
        if (marker === 0xFFC0 || marker === 0xFFC1 || marker === 0xFFC2) {
            offset += 3;
            const height = buffer.readUInt16BE(offset);
            const width = buffer.readUInt16BE(offset + 2);
            console.log(width, height);
            process.exit(0);
        }
        offset += buffer.readUInt16BE(offset);
    }
} catch (e) {
    console.error(e);
}
