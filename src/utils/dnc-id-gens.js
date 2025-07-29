// Simple encode/decode utility
const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // 36 chars

export function encodeDNC(input) {
  // Keep first 3 chars unchanged (example: 25P)
  let prefix = input.slice(0, 3).toUpperCase();
  let toEncode = input.slice(3); // last 4 chars

  // Encode last 4 chars -> convert each to two base36 chars
  let encoded = '';
  for (let char of toEncode) {
    let code = char.charCodeAt(0); // char code
    encoded += charset[code % 36]; // map into A-Z0-9
    encoded += charset[(code >> 3) % 36];
  }

  return prefix + encoded;
}

export function decodeDNC(encoded) {
  let prefix = encoded.slice(0, 3);
  let encodedPart = encoded.slice(3);

  let decoded = '';
  for (let i = 0; i < encodedPart.length; i += 2) {
    let c1 = charset.indexOf(encodedPart[i]);
    let c2 = charset.indexOf(encodedPart[i + 1]);
    let code = (c2 << 3) + c1; // reconstruct approximate char code
    decoded += String.fromCharCode(code);
  }

  return prefix + decoded;
}
