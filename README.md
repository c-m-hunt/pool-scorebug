# Scorebug

## Description
Sets up a scorebug for a pool match. This can but used to overlay onto OBS or other streaming software.

## Build the Docker image
```bash
docker-compose build
```

## Configuration
There is very little configuration required. All configuration is done in the `docker-compose.yml` file.

The two main things are:
- Under `volumes` you can map a local directory to `/state` where the state can be persisted between running the container
- The `ENVIRONMENT` and `GIN_MODE` environment variables can be set to `production` and `release` respectively to disable the debug output. Remove these for full debug output.

## Running
```bash
docker-compose up -d
```

- Open a browser to [http://localhost:8080/admin](http://localhost:8080/admin)
- Scorebug is available at [http://localhost:8080/scorebug](http://localhost:8080/scorebug)
- Scoreboard is available at [http://localhost:8080/scoreboard](http://localhost:8080/scoreboard)

## Usage
Use OBS and place browser sources in your scene for each of the above URLs.

There is a sample scene collection in `obs_config/Pool_Stream.json` which my work for you.