# Trackr
### About: 
Trackr is a task management and team collaboration system designed to streamline work tracking and improve productivity. Users can create, update, view, and delete tasks with ease. In addition to personal task management, Trackr allows users to assign tasks to other team members and automatically sends notifications upon assignment.

Trackr also provides features for task completion tracking — users can mark tasks as completed, and managers can view insightful analytics such as task completion rates, overdue tasks, and overall user performance through interactive graphs and dashboards.

Whether you're an individual or managing a team, Trackr helps keep everyone aligned and on track.

### Features:
- Task Management:
    - Create, edit, view, and delete tasks.
    - Set due dates and priorities for tasks.
    - Mark tasks as completed with a single click.
- User Collaboration:
    - Assign tasks to other users.
    - Automatically notify users when a task is assigned to them.
- Analytics Dashboard:
    - Track task completion rates for individual users.
    - Visualize overdue tasks and completion trends using graphs.
- Notifications
    - Receive instant notifications when tasks are assigned
- Task Search & Filtering
    - Search tasks by title or description.
    - Filter tasks by priority.

### Technologies Used:
- Frontend: Next.js + React.
- Backend: Node.js , Express.js.
- Database: MongoDB.
- Authentication: JWT (JSON Web Token).
- API Handling: Axios.
- Email Notifications: Resend.
- Charts: Recharts.

### Installation
1. Clone the repository ***git clone repoLink***.
2. Install dependencies for both frontend and backend.

### Commands:
```
cd server
npm install
cd ../client
npm install
```

### To start development servers:
- Backend:

```
cd server
node index.js (port-4000)
```
- Frontend:

```
cd ../client
npm run dev   (port-3000)
```

```
### env-setup:
- Backend(server)
``` 
- Navigate to the ```server``` folder.
- Rename the ```env.example``` file to .env
- Update the .env file with your environment variables.
```
- Frontend(client)
``` 
- Navigate to the ```client``` folder.
- Rename the ```env.exp``` file to .env
- Update the .env file with your environment variables.
```

### Email Notifications
This project uses Resend to send automated email notifications. Users receive emails when tasks are assigned to them.
Note: Please visit the official Resend website to generate your API KEy and configure it in your environment variables as RESEND_API_KEY.

### Screenshots
![Trackr8](https://github.com/user-attachments/assets/14fb3c5e-63c8-4eb3-895f-d2d38db87482)
![Trackr7](https://github.com/user-attachments/assets/1316e7b2-3a4f-40a4-b3bb-2dd8c572f626)
![Trackr6](https://github.com/user-attachments/assets/2365ca35-3e6c-44ef-9f12-81a19bdfa0af)
![Trackr5](https://github.com/user-attachments/assets/fcad0ed0-76dd-449f-8d00-40d70e4c2520)
![Trackr4](https://github.com/user-attachments/assets/0da990f5-516f-4ac4-bd12-3d92e14ab8b1)
![Trackr3](https://github.com/user-attachments/assets/9c45162c-d11e-4f48-bfa7-b54d8b3daa54)
![Trackr2](https://github.com/user-attachments/assets/eef24d51-700a-486c-925d-1ceb77b99ee0)
![Trackr1](https://github.com/user-attachments/assets/429fbf7f-1d04-478a-9e8a-dd5e344f9734)
