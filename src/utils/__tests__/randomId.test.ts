import { generateUniqueId } from '../randomId';

describe('generateUniqueId', () => {
  it('should return a string', () => {
    const id = generateUniqueId();
    expect(typeof id).toBe('string');
  });

  it('should generate unique IDs', () => {
    const ids = new Set();
    // Generate 1000 IDs
    const numIdsToGenerate = 1000;

    for (let i = 0; i < numIdsToGenerate; i++) {
      const id = generateUniqueId();
      // Ensure each generated ID is unique
      expect(ids.has(id)).toBe(false);
      ids.add(id);
    }
  });

  it('should not contain sensitive information', () => {
    const id = generateUniqueId();
    // Ensure it doesn't contain a timestamp followed by random characters
    expect(id).not.toMatch(/\d{13}-\./);
  });
});
