import {useEffect} from 'react';
import useBookStore from '@/stores/useBookStore';

const useResetBookStoreOnReload = () => {
	useEffect(() => {
		if (typeof window !== 'undefined' && sessionStorage.getItem('book-store')) {
			useBookStore.getState().resetSearch();
		}
	}, []);
}

export default useResetBookStoreOnReload;

