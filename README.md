# DoDates - Hold yourself accountable.

DoDates is a task manager that allows the user to self-impose deadlines and a financial late penalty on each task, creating a contract between the user and the app. For example, a user could create a DoDate/task labeled as meditate for ten minutes by 10 am tomorrow and assign a late penalty of $10 to it. If the user does not mark this item as complete by that time, DoDates will automatically bill the user $10.

### Getting Started

<img width="1468" alt="CleanShot 2022-09-18 at 19 42 43@2x" src="https://user-images.githubusercontent.com/94320712/190933138-6f0e2630-9f94-431c-8b59-a2c2de9af762.png">

To get started, click "Get started today" on the home page. This will prompt the user to create an account using either their email address or Google account. If you elect the email address option, you will be sent a magic link for sign in.

Upon signing in, you will be prompted to add a credit card using Stripe. This card will never be billed so long as you never fail to complete your DoDates on time. 

### Using DoDates

<img width="1478" alt="CleanShot 2022-09-18 at 19 45 13@2x" src="https://user-images.githubusercontent.com/94320712/190933205-1bae200c-c0f4-4bbf-9406-3f009bb736aa.png">

To create a DoDate, click the "Add DoDate" button in the top right of the app. Upon clicking it, a modal will pop up with the necessary fields to create a DoDate—a text input for the task name, an input for the late penalty, and a calendar to select a date and time.

Now that you've defined a DoDate, DoDates will watch to see if you complete it on time. If you do not, you will be billed the amount established when creating the DoDate. 
