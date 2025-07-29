export function generateEncodedId(dateStr, projectCode = 'P') {
  // Input format: DD/MM/YYYY
  const [day, month, year] = dateStr.split('/');

  // Get last 2 digits of year
  const yearPart = year.slice(-2);

  // Build YYYYMMDD as a number
  const dateNumber = Number(`${year}${month}${day}`);

  // Encode date as Base36
  const encodedDate = dateNumber.toString(36).toUpperCase();

  // Final ID: year prefix + project code + encoded date
  return `${yearPart}${projectCode}${encodedDate}`;
}

export function decodeEncodedId(id, projectCode = 'P') {
  // Remove yearPart (2 chars) + projectCode (1 char)
  const encodedDate = id.slice(3);

  // Convert Base36 back to number
  const dateNumber = parseInt(encodedDate, 36);

  // Convert YYYYMMDD number to string
  const dateStr = dateNumber.toString();

  // Extract parts
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);

  return `${day}/${month}/${year}`;
}
