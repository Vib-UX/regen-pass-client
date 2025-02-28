import { create } from 'zustand';

type Store = {
    address: string;
    setAddress: (address: string) => void;
};

type InitialState = Pick<Store, 'address'>;

const initialState: InitialState = {
    address: '',
};

const useGlobalStorage = create<Store>((set) => ({
    address: initialState.address,
    setAddress: (address: string) => set({ address }),
}));

export default useGlobalStorage;
