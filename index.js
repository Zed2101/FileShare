
import fetch from 'node-fetch';
import express from 'express';
import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import cors from 'cors';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

let corsOptions = {
  origin : '*',
}

app.use(express.static("src"))

app.use(cors(corsOptions));

// powershell helper command
// Invoke-WebRequest -Uri "http://localhost:3000/download?file=Hearts of Iron IV [FitGirl Repack].zip" -OutFile (Join-Path $(Get-Location) "Hearts of Iron IV [FitGirl Repack].zip"); Expand-Archive -Path (Join-Path $(Get-Location) "Hearts of Iron IV [FitGirl Repack].zip") -DestinationPath $(Get-Location)

const port = 3000
const publicIP = await getPublicIP();

async function getPublicIP() {
  try {
    const response = await fetch('http://api.ipify.org');
    const ip = await response.text();

    return ip;
  } catch (error) {
    console.error("Error fetching IP address:", error);
  }
}

async function getAvailableDownloads() {
  try {
    const filesArr = [];
    const filesDir = path.join(__dirname, "/src/files");
    const files = fs.readdirSync(filesDir);

    files.forEach(file => {
      const filePath = path.join(filesDir, file);
      const fileStats = fs.statSync(filePath);

      // Extract title (without .zip)
      const title = file.split(".zip")[0];

      // Get size (in MB)
      const size = (fileStats.size / (1024 * 1024)).toFixed(2); // Convert bytes to MB

      // Construct PowerShell command
      const command = `Invoke-WebRequest -Uri 'http://${publicIP}:${port}/download?file=${file}' -OutFile (Join-Path $(Get-Location) '${file}');
        Expand-Archive -Path (Join-Path $(Get-Location) '${file}') -DestinationPath $(Get-Location) -Force;
        Remove-Item -Path (Join-Path $(Get-Location) '${file}') -Force;
        `;

      const fileData = {
        title,
        size: `${size} MB`,
        command
      };

      filesArr.push(fileData);
    });

    return filesArr;
  } catch (err) {
    console.error('Unable to scan directory: ' + err);

    return err;
  }
}

app.get('/', cors(corsOptions), (req, res) => {
  res.sendFile(path.join(__dirname, '/src/index.html'));
})

app.get('/files', cors(corsOptions), async (req, res) => {
  res.json(await getAvailableDownloads())
})

app.get('/download', cors(corsOptions), (req, res) => {
  console.log("Requested to download:" + req.query.file)
  const file = `${__dirname}/src/files/${req.query.file}`;
  res.download(file);
})

app.listen(port, () => {
  console.log("http://" + publicIP + ":3000/")
})