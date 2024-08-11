import { atom } from 'recoil';

export const token = atom({
  key: 'token', 
  default: localStorage.getItem('token') || '', // Initialize from localStorage
});

export const todoState = atom({
  key: 'todoState',
  default: [], // Default to an empty array
});
