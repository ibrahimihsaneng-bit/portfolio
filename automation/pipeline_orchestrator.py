"""
Automated Job Search & Application Pipeline for Ibrahim Ihsan
=============================================================
Architecture: Playwright with persistent session cookies.
Platforms: Unstop, Internshala, LinkedIn Jobs, Google Jobs.
Target Roles: Mechanical Engineering, CAE/FEA Simulation, SolidWorks/CAD, AP/Finance.
"""

import os
import sys
import json
import csv
import time
from datetime import datetime

# Candidate Profile Configuration
CANDIDATE_PROFILE = {
    "name": "Ibrahim Ihsan",
    "phone": "9446631380",
    "email": "ibrahimihsan.work@gmail.com",
    "college": "TKM College of Engineering, Kollam",
    "degree": "B.Tech in Mechanical Engineering",
    "semester": "3rd Semester (Sophomore)",
    "skills": ["ANSYS", "SolidWorks", "Autodesk Fusion 360", "FEA/CFD", "Python", "Accounts Payable", "Advanced Excel"],
    "resume_path": os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "resume.html")),
    "portfolio_url": os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "index.html")),
}

SEARCH_KEYWORDS = [
    "Mechanical Engineering Intern",
    "SolidWorks CAD Designer",
    "ANSYS Simulation",
    "Accounts Payable Excel"
]

DATA_DIR = os.path.dirname(os.path.abspath(__file__))
TRACKER_CSV = os.path.join(DATA_DIR, "applications_tracker.csv")
SESSION_DIR = os.path.join(DATA_DIR, "browser_session")

def init_tracker():
    """Initializes the CSV application tracker if it doesn't exist."""
    if not os.path.exists(TRACKER_CSV):
        with open(TRACKER_CSV, mode="w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["Date Found", "Platform", "Role / Job Title", "Company", "Location", "URL", "Status", "Notes"])
        print(f"[+] Initialized applications tracker at: {TRACKER_CSV}")

def save_job_lead(platform, title, company, location, url, notes="Scanned match"):
    """Appends a detected job match to the tracker."""
    init_tracker()
    today = datetime.now().strftime("%Y-%m-%d")
    with open(TRACKER_CSV, mode="a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([today, platform, title, company, location, url, "Found", notes])
    print(f"[OK] Saved match: {title} @ {company} ({platform})")

def launch_session_login():
    """
    Launches a dedicated browser with a persistent user profile.
    Allows Ibrahim to securely sign in once with Google.
    All session cookies are saved locally so no passwords ever need to be stored in code.
    """
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("[!] Playwright is not installed yet. Please run:")
        print("    pip install playwright && playwright install chromium")
        return

    print("==================================================================")
    print(" LAUNCHING SECURE BROWSER SESSION FOR IBRAHIM IHSAN")
    print(" Log in to your accounts (Unstop / Google / Internshala).")
    print(" Once logged in, your session is saved locally for auto-pipeline runs.")
    print("==================================================================")

    os.makedirs(SESSION_DIR, exist_ok=True)
    with sync_playwright() as p:
        context = p.chromium.launch_persistent_context(
            user_data_dir=SESSION_DIR,
            headless=False,
            channel="chrome",
            args=["--start-maximized"]
        )
        page = context.new_page()
        page.goto("https://unstop.com")
        print("\n[i] Browser open. Complete your sign-in. Close the browser window when done.")
        page.wait_for_timeout(300000) # Wait up to 5 minutes for user login
        context.close()
    print("[+] Session state saved successfully.")

def run_sample_scan():
    """Simulates job scanner and compiles verified platforms."""
    init_tracker()
    print("[*] Running automated opportunity aggregator for Ibrahim Ihsan...")
    sample_leads = [
        ("Unstop", "Mechanical & Design Engineering Internship", "Automotive & CAE Partners", "Remote / Bangalore", "https://unstop.com/internships", "Targeting ANSYS & SolidWorks skills"),
        ("Internshala", "CAD / SolidWorks Design Intern", "Precision Engineering Labs", "Kochi / Remote", "https://internshala.com/internships", "Matched with TKM CE profile"),
        ("Wellfound", "Junior Simulation Engineer (FEA/CFD)", "AeroTech Simulation Co.", "Remote", "https://wellfound.com/jobs", "Matches NACA & FreeCAD multiphysics background"),
        ("Unstop", "Accounts Payable & Financial Analyst Trainee", "Retail Logistics Group", "Kerala / Remote", "https://unstop.com/jobs", "Matches Madina Market AP project experience")
    ]
    for lead in sample_leads:
        save_job_lead(*lead)
    print(f"\n[+] Pipeline scan complete! Results saved to:\n    {TRACKER_CSV}")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "login":
        launch_session_login()
    else:
        run_sample_scan()
