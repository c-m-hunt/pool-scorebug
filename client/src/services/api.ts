import { useEffect, useState } from "react";
import { Match, Scorebug } from "../types";

const baseUrl = "http://localhost:8080";

interface ScorebugServiceResponse extends ServiceResponse {
    scorebug?: Scorebug;
    saveScorebug: (scoerbug: Scorebug) => Promise<Scorebug>;
    updateScorebug: (Scorebug: Scorebug) => void;
}

interface ServiceResponse {
    status: Number;
    loading: Boolean;
    error: any;
}

export const useScorebugService = (refresh = 0): ScorebugServiceResponse => {
    const [scorebug, setScorebug] = useState<Scorebug | undefined>(undefined);
    const [status, setStatus] = useState<Number> (200);
    const [loading, setLoading] = useState<Boolean>(false);
    const [error, setError] = useState<any>(null);

    const getScorebug = async () => {
        setLoading(true);
        try {
            const [ data, status ] = await getApi(`match`);
            setScorebug(data);
            setStatus(status);
        } catch (err) {
            console.error(err)
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const saveScorebug = async (scorebug: Scorebug) => {
        setLoading(true);
        try {
            const [ data, status ] = await postApi(`match`, scorebug);
            setScorebug(data);
            setStatus(status);
        } catch (err) {
            console.error(err)
            setError(err);
        } finally {
            setLoading(false);
        }
        return scorebug
    };

    const updateScorebug = (scorebug: Scorebug) => {
        setScorebug(scorebug);
    };
    
    useEffect(() => {
        getScorebug();
        if (refresh > 0) {
            const interval = setInterval(() => {
                getScorebug();
            }, refresh * 1000);
            return () => {
                clearInterval(interval);
            }
        }   
    }, [refresh]);


    return {
        scorebug,
        status,
        loading,
        error,
        saveScorebug,
        updateScorebug,
    };
}
    
const getApi = async (url: string): Promise<[any, Number]> => {
  const response = await fetch(`${baseUrl}/${url}`);
  return [await response.json(), response.status];
}

const postApi = async (url: string, data: any) => {
    const response = await fetch(`${baseUrl}/${url}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return [await response.json(), response.status];
}
