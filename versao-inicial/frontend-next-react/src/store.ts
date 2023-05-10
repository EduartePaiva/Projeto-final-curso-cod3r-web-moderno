import { create } from 'zustand'
import userInterface from './interfaces/userInterface'

export const useStore = create<userInterface>((set) => ({
    admin: false,
    email: '',
    name: ''
}))