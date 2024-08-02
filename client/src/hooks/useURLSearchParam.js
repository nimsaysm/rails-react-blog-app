// useSearchParams: access and modify URL params
import { useSearchParams } from "react-router-dom";

// initialValue will be used if there is not query string
function useURLSearchParam(paramName, initialValue = "") {
    const [searchParams, setSearchParams] = useSearchParams();

    // get paramName if it exists or use initialValue 
    const paramValue = searchParams.get(paramName) || initialValue;

    const setParamValue = (value) => {
        if(value) {
            // if there is a value, the value will be added at searchParams
            setSearchParams({
                ...Object.fromEntries(searchParams), //convert searchParams in a JS Object to manipulate it
                [paramName]: value,
            });
        } else {
            // if there is not a value, the paramName will be removed from search params
            searchParams.delete(paramName);
            setSearchParams(searchParams);
        }
    }

    return [paramValue, setParamValue];
}

export default useURLSearchParam;