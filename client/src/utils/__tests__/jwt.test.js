import {jwtUtils} from '../jwt';

describe('Jwt decode', () => {
    it('should return an empty string if jwt is falsy', () => {
      const jwt = '';
      const result = jwtUtils.decode(jwt);
      expect(result).toBe('');
    });

    it('should return the decoded value of the first part of the jwt', () => {
      const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ';
      const result = jwtUtils.decode(jwt);
      expect(result).toEqual({
        alg: 'HS256', 
        typ: 'JWT'
      });
    });
  });