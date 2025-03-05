import {useLocation} from 'react-router'

export function useQuery() {
    const{filtro}=useLocation();

    return new URLSearchParams(useLocation().search);
}
