import { useEffect, useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { Config as IConfig } from "../../types";

interface ConfigProps {
	config: IConfig;
	saveConfig: (config: IConfig) => void;
}

export const Config = ({ saveConfig, config }: ConfigProps) => {
	const [showTeamScore, setShowTeamScore] = useState(false);
	const [description, setDescription] = useState("");

	const updateDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDescription(event.target.value);
	};

	const updateDescriptionBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		setDescription(event.target.value);
		updateConfig({ description: event.target.value });
	};

	const changeShowOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShowTeamScore(event.target.checked);
		updateConfig({ showTeamScore: event.target.checked });
	};

	const updateConfig = (partConfig: Partial<IConfig>) => {
		const newConfig = {
			...config,
			description,
			showTeamScore,
			...partConfig,
		};
		saveConfig(newConfig);
	};

	useEffect(() => {
		console.debug("Config changed", config);
		setDescription(config.description || "");
		setShowTeamScore(config.showTeamScore || false);
	}, [config]);

	return (
		<Form>
			<Row className="mb-3">
				<Col>
					<Form.Group controlId="formShowTeamScore">
						<Form.Check
							type="checkbox"
							label="Show team score"
							checked={showTeamScore}
							name="showTeamScore"
							value={showTeamScore ? "1" : "0"}
							onChange={changeShowOptions}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col>
					<InputGroup>
						<InputGroup.Text>Description</InputGroup.Text>
						<Form.Control
							type="text"
							id="matchDescription"
							aria-describedby="descriptionHelpBlock"
							value={description}
							onChange={updateDescription}
							onBlur={updateDescriptionBlur}
						/>
					</InputGroup>
				</Col>
			</Row>
		</Form>
	);
};
