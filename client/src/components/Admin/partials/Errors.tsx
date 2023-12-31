import { Alert } from "react-bootstrap";

export const Errors = ({ errors }: { errors: string[] }) => {
	return (
		<Alert variant="danger">
			<ul>
				{errors.map((err, i) => (
					<li key={i}>{err}</li>
				))}
			</ul>
		</Alert>
	);
};
