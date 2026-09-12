@echo off
title Bid My Car Local Web Server
echo ========================================================
echo Starting Bid My Car on http://localhost:8080/ ...
echo ========================================================
powershell -ExecutionPolicy Bypass -NoProfile -Command "$listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:8080/'); $listener.Start(); Start-Process 'http://localhost:8080/'; Write-Host 'Server running at http://localhost:8080/ (Press Ctrl+C to stop)'; while ($listener.IsListening) { $ctx = $listener.GetContext(); $req = $ctx.Request; $res = $ctx.Response; $path = $req.Url.LocalPath; if ($path -eq '/') { $path = '/index.html' }; $localPath = (Get-Location).Path + $path.Replace('/', '\'); if (Test-Path $localPath) { $bytes = [System.IO.File]::ReadAllBytes($localPath); $ext = [System.IO.Path]::GetExtension($localPath); $contentType = switch ($ext) { '.html' {'text/html'} '.css' {'text/css'} '.js' {'application/javascript'} '.json' {'application/json'} '.png' {'image/png'} '.jpg' {'image/jpeg'} default {'application/octet-stream'} }; $res.ContentType = $contentType; $res.ContentLength64 = $bytes.Length; $res.OutputStream.Write($bytes, 0, $bytes.Length); } else { $res.StatusCode = 404; }; $res.Close(); }"
pause
