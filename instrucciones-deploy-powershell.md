# Deploy en PowerShell - VANEC v5 lead magnet final

Descomprime este ZIP en `C:\Users\alber\Downloads\vanec_web_v5_leadmagnet_final` y ejecuta:

```powershell
cd C:\Users\alber\Downloads

git clone https://github.com/novatoseo/vanec-web.git vanec-web-temp-v5

cd vanec-web-temp-v5

Get-ChildItem -Force | Where-Object { $_.Name -ne ".git" } | Remove-Item -Recurse -Force

Copy-Item -Path "C:\Users\alber\Downloads\vanec_web_v5_leadmagnet_final\*" -Destination "C:\Users\alber\Downloads\vanec-web-temp-v5" -Recurse -Force

git add -A

git commit -m "Integrar lead magnet final VANEC"

git push origin main
```

Si la carpeta `vanec-web-temp-v5` ya existe, cambia el nombre a `vanec-web-temp-v6` en todos los comandos.
