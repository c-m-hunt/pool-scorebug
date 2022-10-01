import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";
import { Match } from "../types";



const baseUrl = "http://localhost:8080/";

interface MatchServiceResponse extends ServiceResponse {
    match?: Match;
}

interface ServiceResponse {
    status: Number;
    loading: Boolean;
    error: any;
}

export const useMatchService = (): MatchServiceResponse => {
    const [match, setMatch] = useState<Match | undefined>(undefined);
    const [status, setStatus] = useState<Number> (200);
    const [loading, setLoading] = useState<Boolean>(false);
    const [error, setError] = useState<any>(null);

    const getMatch = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}match`);
            const data = await response.json();
            setMatch(data);
            setStatus(response.status);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMatch();
    }, []);

    return {
        match,
        status,
        loading,
        error,
    };
}
    
const getApi = async (url: string) => {
  const response = await fetch(`${baseUrl}/${url}`);
  return await response.json();
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
