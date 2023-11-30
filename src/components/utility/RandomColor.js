export default function currentDateToColor() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const hash = (year * 12 + month) % 16777215;

    const hexColor = '#' + ('00000' + (hash & 0xFFFFFF).toString(16)).slice(-6);

    return brightenColor(hexColor,0.3);
}



function brightenColor(hexColor, factor) {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Convert RGB to HSL
    let hsl = rgbToHsl(r, g, b);

    // Increase lightness
    hsl[2] = Math.min(1, hsl[2] + factor);

    // Convert HSL back to RGB
    const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);

    // Convert RGB to hex
    const brightenedHexColor = rgbToHex(rgb[0], rgb[1], rgb[2]);

    return brightenedHexColor;
}

// Convert RGB to HSL
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return [h, s, l];
}

// Convert HSL to RGB
function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// Convert RGB to hex
function rgbToHex(r, g, b) {
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

// Example usage
// const darkColor = '#333333'; // Replace with your dark color
// const brightenedColor = brightenColor(darkColor, 0.2); // Adjust factor as needed

// console.log(`Dark Color: ${darkColor}`);
// console.log(`Brightened Color: ${brightenedColor}`);
