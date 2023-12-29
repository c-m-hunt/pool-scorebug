import { useEffect, useState } from "react";
import { Scorebug } from "../types";

const apiPort = "8080";
const host = window.location.hostname;
export const baseUrl = `http://${host}:${apiPort}`;

interface ScorebugServiceResponse extends ServiceResponse {
	scorebug?: Scorebug;
	saveScorebug: (scoerbug: Scorebug) => Promise<Scorebug>;
	updateScorebug: (Scorebug: Scorebug) => void;
}

export interface ServiceResponse {
	status: number;
	loading: boolean;
	error: Error | null;
}

export const useScorebugService = (live = false): ScorebugServiceResponse => {
	const [scorebug, setScorebug] = useState<Scorebug | undefined>(undefined);
	const [status, setStatus] = useState<number>(200);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const saveScorebug = async (scorebug: Scorebug) => {
		setLoading(true);
		try {
			const [data, status] = await postApi("match", scorebug);
			setScorebug(data);
			setStatus(status);
		} catch (err) {
			console.error(err);
			setError(err as Error);
		} finally {
			setLoading(false);
		}
		return scorebug;
	};

	const updateScorebug = (scorebug: Scorebug) => {
		setScorebug(scorebug);
	};

	useEffect(() => {
		const getScorebug = async () => {
			setLoading(true);
			try {
				const [data, status] = await getApi("match");
				setScorebug(data);
				setStatus(status);
			} catch (err) {
				console.error(err);
				setError(err as Error);
			} finally {
				setLoading(false);
			}
		};
		getScorebug();
	}, []);

	return {
		scorebug,
		status,
		loading,
		error,
		saveScorebug,
		updateScorebug,
	};
};

export const getApi = async (url: string): Promise<[Scorebug, number]> => {
	const response = await fetch(`${baseUrl}/${url}`);
	return [await response.json(), response.status];
};

export const postApi = async (url: string, data: Scorebug) => {
	const response = await fetch(`${baseUrl}/${url}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return [await response.json(), response.status];
};
