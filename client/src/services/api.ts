import { useEffect, useState } from "react";
import { Scorebug } from "../types";

const baseUrl = "http://localhost:8080";

interface ScorebugServiceResponse extends ServiceResponse {
	scorebug?: Scorebug;
	saveScorebug: (scoerbug: Scorebug) => Promise<Scorebug>;
	updateScorebug: (Scorebug: Scorebug) => void;
}

interface ServiceResponse {
	status: number;
	loading: boolean;
	error: Error | null;
}

export const useScorebugService = (refresh = 0): ScorebugServiceResponse => {
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
		if (refresh > 0) {
			const interval = setInterval(() => {
				getScorebug();
			}, refresh * 1000);
			return () => {
				clearInterval(interval);
			};
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
};

const getApi = async (url: string): Promise<[Scorebug, number]> => {
	const response = await fetch(`${baseUrl}/${url}`);
	return [await response.json(), response.status];
};

const postApi = async (url: string, data: Scorebug) => {
	const response = await fetch(`${baseUrl}/${url}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return [await response.json(), response.status];
};
