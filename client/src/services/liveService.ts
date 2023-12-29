import { useEffect, useState } from "react";
import { Scorebug } from "../types";
import { ServiceResponse } from "./api";

const baseUrl = "http://localhost:8080";

interface LiveScorebugServiceResponse extends ServiceResponse {
	scorebug?: Scorebug;
}


export const useLiveScorebugService = (live = false): LiveScorebugServiceResponse => {
	const [scorebug, setScorebug] = useState<Scorebug | undefined>(undefined);
	const [status, setStatus] = useState<number>(200);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const ws = new WebSocket("ws://localhost:8080/ws");
		ws.onmessage = (event) => {
			const json = JSON.parse(event.data);
			console.log(json);
			try {
				if (json.type === "scorebug") {
					setScorebug(json.data);
				}
			} catch (err) {
				console.log(err);
			}
		};

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

		return () => {
			ws.close();
		};
	}, []);

	return {
		scorebug,
		status,
		loading,
		error,
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
