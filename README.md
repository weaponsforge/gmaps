## gmaps

> This repository will test several Google Maps APIs using a localhost static website development environment for plain HTML, CSS, and JavaScript files with live reload using **webpack + webpack-dev-server.**


### Content

- [gmaps](#gmaps)
	- [Content](#content)
	- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [References](#references)


### Dependencies

The following dependecies are used for this project. Feel free to experiment using other dependencies and versions.

1. Windows 64-bit OS
2. NodeJS
	- node version 18.14.2
	- npm version 9.5.0
3. NodeJS webpack modules (installed via npm)
	- webpack 5.64.2
	- webpack-dev-server 4.5.0
	- webpack-cli 4.9.1
	- css-loader 6.5.1
	- style-loader 3.3.1


## Installation

1. Clone this repository.
`https://github.com/weaponsforge/gmaps.git`

2. Install dependencies.
`npm install`

3. Create a `.env` file from the `.env.example` file. Update the variables in the `.env` file as needed.

   | Variable Name       | Desccription                                                                                                                               |
   | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
   | APP_NAME            | Application name                                                                                                                           |
   | MAP_LAT             | Latitude                                                                                                                                   |
   | MAP_LON             | Longitude                                                                                                                                  |
   | MAP_ZOOM_INIT       | Web map's initial zoom (0 - 21)                                                                                                            |
   | MAP_ZOOM_MAX        | Web map's maximum zoom (0 - 21)                                                                                                            |
   | MAP_BASEMAP_URL     | Base map URL                                                                                                                               |
   | MAP_BASEMAP_ATTRIB  | Bas map attribution text                                                                                                                   |
   | MAPBOX_ACCESS_TOKEN | MapBox access token.<br> Provide a `"WebMapBox.accessToken"` constructor parameter in the `WebMapBox` class if this variable has no value. |
   | MAPBOX_STYLE_URL    | MapBox style URL (basemap style)                                                                                                           |
   | GOOGLE_API_KEY      | Google Maps API key                                                                                                                        |

4. Checkout a branch that tests specific Google Maps related items:
   - **dev**<br>
      - Full screen LeafletJS web map demo.
      - `git checkout dev`
   - **feature/weaponsforge-10**<br>
      - Experiments in listing all home addresses inside a circle radius, Issue [#10](https://github.com/weaponsforge/gmaps/issues/10)
      - `git checkout feature/weaponsforge-10`
   - **feature/weaponsforge-11**<br>
      - Experiments in capturing a screenshot from a 3D (tilted) Google Map, Issue [#11](https://github.com/weaponsforge/gmaps/issues/11)
      - `git checkout feature/weaponsforge-11`

## Usage

1. Run the localhost static website development environment.<br>
`npm run dev`

2.  Edit the existing static files from the **./src** directory and wait for live reload. Your updates will reflect on the web browser.

3. To include new static website files on live reload:
	- Stop the localhost **dev** server.
	- Create new static (.js, .css) files inside the **./src** directory.
		- Import the new **.js** and **.css** files in **./src/index.js**
		- Javascript events may need to be attached to Html DOM elements using `.addEventListener()` if you are only using raw Html files.
		- New Html files need to be encoded inside `new HtmlWebpackPlugin({ ... })` in **webpack.config.js**
		- Specific specific file types other than CSS and image files may need to have their node module dependency installed and included in **webpack.config.js**'s `module -> rules` part.
	- Re-start the **dev** server.<br>
`npm run dev`

4. Build the project for production environment. Built static files are placed in the **/dist** directory.<br>
`npm run build`

5. Run the production static website (does not use live reload).<br>
`npm run start`

## References

[[1]](https://github.com/weaponsforge/livereload-basic) - live reload using gulp + browser-sync (demo)<br>
[[2]](https://trello.com/c/n25MYtq8) - webpack notes (trello)


@weaponsforge<br>
20230911
