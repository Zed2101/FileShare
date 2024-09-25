

# Zip File Sharing Server

This project allows a user, acting as a server, to let other users download `.zip` files stored in the `src/files/` folder. The main purpose of this app is to make sharing large files easier.

## Features
- **File Sharing**: Easily share `.zip` files located in the `src/files/` directory.
- **PowerShell Integration**: Automatically provides a PowerShell command on the webpage to download and unzip files.
- **Express Server**: Serves files using a Node.js Express server.
- **Web Interface**: Displays available files with a copy-to-clipboard PowerShell command for easy download.

## Requirements
- [Node.js](https://nodejs.org/)
- Optionally, use [Localtunnel](https://localtunnel.github.io/www/) or [ngrok](https://ngrok.com/) for serving over HTTPS (recommended for full functionality).

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate into the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node server.js
   ```

## Folder Structure
```bash
├── src/
│   ├── files/                # Folder where the .zip files to share are placed
│   ├── index.html     
│   ├── index.css
│   └── script.js
├── download-server.bat       # Run the server using nodejs
├── install-dependencies.bat  # Run to install the dependencies
└── server.js                 # Express.js server scrip

```
- **src/files/**: This is where you place the `.zip` files that will be shared.

## Usage
1. Place the `.zip` files you want to share inside the `src/files/` folder.
2. Start the server as described in the installation steps or run the download-server.bat.
3. Open the webpage in a browser (e.g., `http://localhost:3000`).
4. You will see the available `.zip` files listed, along with a PowerShell command to download each file.
5. **Important**: For the "click-to-copy" feature to work, serve the app over HTTPS using services like Localtunnel or ngrok.

## Downloading Files (for Clients)
1. Copy the PowerShell command from the web interface.
2. Open PowerShell and navigate to the directory where you want to save the file.
3. Paste the command and press enter.
4. The file will be downloaded, unzipped, and the `.zip` file will be deleted automatically.

## Example PowerShell Command
The command provided on the webpage will look something like this:
```powershell
Invoke-WebRequest -Uri 'http://ip:port/download?file=file-name.zip' -OutFile (Join-Path $(Get-Location) 'file-name.zip'); Expand-Archive -Path (Join-Path $(Get-Location) 'file-name.zip') -DestinationPath $(Get-Location) -Force; Remove-Item -Path (Join-Path $(Get-Location) 'file-name.zip') -Force;"
```

## Recommendations
- For full functionality, especially for the click-to-copy feature, use HTTPS. Services like [Localtunnel](https://localtunnel.github.io/www/) or [ngrok](https://ngrok.com/) are easy solutions for this.
- Keep the `src/files/` folder organized for better management of the files being shared.

## License
This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/license/mit) file for details.