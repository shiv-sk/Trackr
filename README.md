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
```
### Screenshots
![Trackr8](https://github.com/user-attachments/assets/98ed1e03-a5c6-4364-9a1f-e0244e11c15a)
![Trackr7](https://github.com/user-attachments/assets/32c7da7c-7c3d-4ab7-973f-64c0457f0e49)
![Trackr6](https://github.com/user-attachments/assets/a81383fb-1b65-457f-b4db-3bf01d186b7f)
![Trackr5](https://github.com/user-attachments/assets/9601f110-c3fe-4569-be59-923ef9034822)
![Trackr4](https://github.com/user-attachments/assets/ccec0fcc-1818-4bcb-8e8d-de6d5cd7864e)
![Trackr3](https://github.com/user-attachments/assets/cb70b9c3-4981-4936-9315-36ab4decfd7d)
![Trackr2](https://github.com/user-attachments/assets/10940f84-8105-4d1a-88d7-0b084daae747)
![Trackr1](https://github.com/user-attachments/assets/b435bd0e-7c04-4158-b282-36137c572b9f)

