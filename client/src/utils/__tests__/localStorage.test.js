import { localStorageUtils } from '../localStorage'

describe('Local storage utils', () => {
    it('should save data to localStorage when isSessionStorage is false', () => {
      const key = 'myKey';
      const data = { name: 'Name', age: 30 };
      const isSessionStorage = false;

      localStorageUtils.saveToStorage(key, data, isSessionStorage);

      const storedData = JSON.parse(localStorage.getItem(key));
      expect(storedData).toEqual(data);
    });

    it('should save data to sessionStorage when isSessionStorage is true', () => {
      const key = 'myKey';
      const data = { name: 'Name', age: 30 };
      const isSessionStorage = true;

      localStorageUtils.saveToStorage(key, data, isSessionStorage);

      const storedData = JSON.parse(sessionStorage.getItem(key));
      expect(storedData).toEqual(data);
    });
    
    it('should return null if the key does not exist in localStorage or sessionStorage', () => {
        const key = 'nonExistentKey';
        const result = localStorageUtils.getFromStorage(key);
        expect(result).toBe(null);
      });
      
    it('should return the parsed object if the key exists in localStorage', () => {
        const key = 'myKey';
        const data = { name: 'Name', age: 30 };
        localStorage.setItem(key, JSON.stringify(data));
  
        const result = localStorageUtils.getFromStorage(key);
        expect(result).toEqual(data);
      });
  
    it('should return the parsed object if the key exists in sessionStorage', () => {
        const key = 'myKey';
        const data = { name: 'Name', age: 30 };
        sessionStorage.setItem(key, JSON.stringify(data));
  
        const result = localStorageUtils.getFromStorage(key);
        expect(result).toEqual(data);
      });
  
    it('should return null if the stored data is not a valid JSON object', () => {
        const key = 'myKey';
        const invalidData = 'not-a-valid-json-object';
        localStorage.setItem(key, invalidData);
  
        const result = localStorageUtils.getFromStorage(key);
        expect(result).toBe(null);
      });
      
    it('should remove the item from localStorage when isSessionStorage is false', () => {
        const key = 'myKey';
        const isSessionStorage = false;
        localStorage.setItem(key, JSON.stringify({ name: 'John Doe', age: 30 }));
  
        localStorageUtils.removeFromStorage(key, isSessionStorage);
  
        const storedData = localStorage.getItem(key);
        expect(storedData).toBe(null);
    });
  
    it('should remove the item from sessionStorage when isSessionStorage is true', () => {
        const key = 'myKey';
        const isSessionStorage = true;
        sessionStorage.setItem(key, JSON.stringify({ name: 'Name', age: 30 }));
  
        localStorageUtils.removeFromStorage(key, isSessionStorage);
  
        const storedData = sessionStorage.getItem(key);
        expect(storedData).toBe(null);
    });
  });