import { useEffect, useState } from "react";
import { Match } from "../types";

const baseUrl = "http://localhost:8080";

interface MatchServiceResponse extends ServiceResponse {
    match?: Match;
    saveMatch: (match: Match) => Promise<Match>;
    updateMatch: (match: Match) => void;
}

interface ServiceResponse {
    status: Number;
    loading: Boolean;
    error: any;
}

export const useMatchService = (refresh = 0): MatchServiceResponse => {
    const [match, setMatch] = useState<Match | undefined>(undefined);
    const [status, setStatus] = useState<Number> (200);
    const [loading, setLoading] = useState<Boolean>(false);
    const [error, setError] = useState<any>(null);

    const getMatch = async () => {
        setLoading(true);
        try {
            const [ data, status ] = await getApi(`match`);
            setMatch(data);
            setStatus(status);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const saveMatch = async (match: Match) => {
        setLoading(true);
        try {
            const [ data, status ] = await postApi(`match`, match);
            setMatch(data);
            setStatus(status);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
        return match
    };

    const updateMatch = (match: Match) => {
        setMatch(match);
    };
    
    useEffect(() => {
        getMatch();
        if (refresh > 0) {
            const interval = setInterval(() => {
                getMatch();
            }, refresh * 1000);
            return () => {
                clearInterval(interval);
            }
        }   
    }, [refresh]);


    return {
        match,
        status,
        loading,
        error,
        saveMatch,
        updateMatch,
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
    return await response.json();
}
