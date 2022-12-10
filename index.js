const { app, BrowserWindow } = require("electron")
const path = require("path")

function createMainWindow() {
	const mainWindow = new BrowserWindow({
		title: "ultra space invaders",
		width: 500,
		height: 500,
		resizable: false
	})

	mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"))
}

app.whenReady().then(() => {
	createMainWindow()
})