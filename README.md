# Epitech Calendar Sync - Google Apps Script 📅🔗

Automate the synchronization of your Epitech intranet agenda with your Google Calendar using this Google Apps Script. This script fetches calendar data from the Epitech intranet, filters registered events, and adds them to your Google Calendar. It's designed to be executed inside the Google Apps Script environment.

## Features ✨

- **Token Retrieval:** Securely fetch your Epitech intranet token by providing login credentials.
- **Calendar Fetch:** Retrieve calendar data within a specified date range.
- **Event Filtering:** Filter events based on registration status.
- **Google Calendar Integration:** Add filtered events to your Google Calendar.
- **All-Day Event Support:** Option to add all-day events.
- **Module Filtering:** Filter ongoing modules based on specified conditions.
- **Calendar Purge:** Remove all events with a "*TEK*" tag from the Google Calendar.

## Usage 🚀

1. Open the Google Apps Script editor.
2. Copy and paste the entire script into the editor.
3. Configure the necessary constants like `YOUR_EMAIL_HERE` and `XXXX`.
4. Save the script.

## Automatic Execution 🕰️

You can schedule the script to run automatically, for example, every day at midnight:

1. In the script editor, go to the "Triggers" menu.
2. Click on the clock icon to open the triggers dashboard.
3. Click on the "+ Add Trigger" button.
4. Set the function to `run`.
5. Choose event source "Time-driven".
6. Choose type "Day timer" and set the time you want the script to run (e.g., midnight).

Now, the script will automatically sync your Epitech calendar with your Google Calendar every day at the specified time.

## Prerequisites 🛠️

Before running the script, make sure to:

- Enable the Google Calendar API for your project.
- Set up OAuth2 credentials for authorization.
- Add the necessary scopes for Google Calendar and UrlFetchApp services.

## Customization 🎨

Feel free to customize the script based on your specific needs. You can modify filtering conditions or add new functionalities as required.

## Contributions 🤝

Contributions are welcome! If you have suggestions or improvements, feel free to open issues or submit pull requests.
