import { Col, Form, Row } from "react-bootstrap";
import { Config as IConfig } from "../../types";

interface ConfigProps {
	config: IConfig;
	saveConfig: (config: IConfig) => void;
}

export const Config = (props: ConfigProps) => {
	const changeShowOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		const newConfig = {
			...props.config,
			[name]: checked,
		};
		props.saveConfig(newConfig);
	};

	return (
		<Form>
			<Row className="mb-3">
				<Col xs={4}>
					<Form.Group controlId="formShowTeamScore">
						<Form.Label>Show team score</Form.Label>
						<Form.Check
							type="checkbox"
							label="Show team score"
							checked={props.config.showTeamScore}
							name="showTeamScore"
							onChange={changeShowOptions}
						/>
					</Form.Group>
				</Col>
			</Row>
		</Form>
	);
};
