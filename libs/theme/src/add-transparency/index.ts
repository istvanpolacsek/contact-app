function addTransparency(hex: string, transparency: number): string {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  const alpha = transparency / 100;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default addTransparency;
