
$wsh = New-Object -ComObject WScript.Shell

# 1. Desktop Application Shortcut (Like WhatsApp Desktop)
$desktopShortcutPath = Join-Path "C:\\Users\\admin\\Desktop" "Ibrahim Ihsan - Engineering Portfolio.lnk"
$scDesktop = $wsh.CreateShortcut($desktopShortcutPath)
$scDesktop.TargetPath = "wscript.exe"
$scDesktop.Arguments = "`"C:\\Users\\admin\\Documents\\Downloads\\BULID THAT KNOW\\scripts\\open_portfolio_app.vbs`""
$scDesktop.WorkingDirectory = "C:\\Users\\admin\\Documents\\Downloads\\BULID THAT KNOW"
$scDesktop.Description = "Launch Ibrahim Ihsan Engineering Portfolio App"
if (Test-Path "C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe") {
    $scDesktop.IconLocation = "C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe,0"
} elseif (Test-Path "C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe") {
    $scDesktop.IconLocation = "C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe,0"
}
$scDesktop.Save()
Write-Host "Desktop shortcut created at: $desktopShortcutPath"

# 2. Windows Startup Shortcut (Auto-start server silently on laptop boot)
$startupShortcutPath = Join-Path "C:\\Users\\admin\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup" "Ibrahim_Portfolio_AutoStart.lnk"
$scStartup = $wsh.CreateShortcut($startupShortcutPath)
$scStartup.TargetPath = "wscript.exe"
$scStartup.Arguments = "`"C:\\Users\\admin\\Documents\\Downloads\\BULID THAT KNOW\\scripts\\start_server_background.vbs`""
$scStartup.WorkingDirectory = "C:\\Users\\admin\\Documents\\Downloads\\BULID THAT KNOW"
$scStartup.Description = "Auto-start Ibrahim Ihsan Portfolio Server silently on Windows boot"
$scStartup.WindowStyle = 7 # Minimized/Hidden
$scStartup.Save()
Write-Host "Startup shortcut created at: $startupShortcutPath"
