@echo off
echo Adding mobile-responsive.css to all HTML files...

REM List of files to update
for %%f in (*.html) do (
    if not "%%f"=="index.html" (
        if not "%%f"=="tours.html" (
            if not "%%f"=="about.html" (
                if not "%%f"=="contact.html" (
                    if not "%%f"=="car-rental.html" (
                        if not "%%f"=="wedding.html" (
                            echo Processing %%f...
                            powershell -Command "(Get-Content '%%f') -replace '<link rel=\"stylesheet\" href=\"style.css\">', '<link rel=\"stylesheet\" href=\"style.css\">^<link rel=\"stylesheet\" href=\"mobile-responsive.css\">' | Set-Content '%%f'"
                        )
                    )
                )
            )
        )
    )
)

echo Done! Mobile responsive CSS added to all remaining HTML files.
pause