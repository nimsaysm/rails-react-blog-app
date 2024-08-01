import { useSearchParams } from "react-router-dom";

function useURLSearchParam(paramName, initialValue = "") {
    const [searchParams, setSearchParams] = useSearchParams();

    const paramValue = searchParams.get(paramName) || initialValue;

    const setParamValue = (value) => {
        if(value) {
            setSearchParams({
                ...Object.fromEntries(searchParams), 
                [paramName]: value,
            });
        } else {
            searchParams.delete(paramName);
            setSearchParams(searchParams);
        }
    }

    return [paramValue, setParamValue];
}

export default useURLSearchParam;