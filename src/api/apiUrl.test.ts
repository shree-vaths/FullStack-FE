import { describe, expect, it } from 'vitest';
import { apiUrl, normalizeBaseUrl } from './apiUrl';

describe('normalizeBaseUrl', () => {
  it.each([
    [undefined, ''],
    ['', ''],
    ['https://api.example.com', 'https://api.example.com'],
    ['https://api.example.com/', 'https://api.example.com'],
    [' https://api.example.com// ', 'https://api.example.com'],
  ])('%j -> %j', (input, expected) => {
    expect(normalizeBaseUrl(input)).toBe(expected);
  });
});

describe('apiUrl', () => {
  it('keeps paths relative when there is no base URL (dev proxy)', () => {
    expect(apiUrl('/api/users?page=1', '')).toBe('/api/users?page=1');
  });

  it('prefixes the API origin in production builds', () => {
    expect(apiUrl('/api/users?page=1', 'https://fullstack-be-ewy9.onrender.com')).toBe(
      'https://fullstack-be-ewy9.onrender.com/api/users?page=1',
    );
  });

  it('adds a missing leading slash', () => {
    expect(apiUrl('api/health', 'https://x.dev')).toBe('https://x.dev/api/health');
  });

  it('is relative in tests, since VITE_API_BASE_URL is only set for production builds', () => {
    expect(apiUrl('/api/users')).toBe('/api/users');
  });
});
