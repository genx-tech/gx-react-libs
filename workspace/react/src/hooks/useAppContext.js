import { useContext } from 'react';
import { AppContext } from '../Runtime';

// ----------------------------------------------------------------------

/**
 * Hook to use Application context
 * @returns {AppContext}
 */
const useAppContext = () => useContext(AppContext);

export default useAppContext;
