# IGNITE NODE JS CHALLENGE

## About the Challenge

This challenge is for creating an API for performing CRUD (Createe, Reead, Update, Delete) operations for _tasks_.
But I've done it using only Node.js built-in modules, which includes using JSON as a database and the FileSystem module for importing CSV files.

## How to Run

To create JSON database and run API on http://localhost:3333, in the terminal run:

```console
npm run start

or

yarn start
```

To seed the database, with the API running, run:

```console
yarn seed

or

npm run seed
```

It imports tasks from the `tasks.csv` file inside `streams` folder.

### API Features:

- Creation of a task
- Listing all tasks
- Updating a task by `id`
- Removing a task by `id`
- Marking a task as completed by `id`
- And the real challenge: Bulk importing tasks from a CSV file

### Routes and Business Rules

Tasks Properties:

- `id` - Unique identifier for each task, random UUID
- `title` - Title of the task
- `description` - Detailed description of the task
- `completed_at` - Date when the task was completed. The initial value is `null`
- `created_at` - Date when the task was created.
- `updated_at` - Date when the task was last updated.

### Routes:

- `POST - /tasks`

  Creates a task in the database by sending `title` and `description` fields in the request body.

  When creating a task, the fields: `id`, `created_at`, `updated_at`, and `completed_at` are automatically populated as per the properties mentioned above.

- `GET - /tasks`

  Lists all tasks stored in the database.

  It's also possible to perform a search, filtering tasks by `title` and `description` with query parameter `search`.

- `PUT - /tasks/:id`

  Updates a task by existing `id`.

  In the request's body, it needs to receive `title` and`description` to be updated.

  If only `title` is sent, it means that `description` cannot be updated, and vice versa.

- `DELETE - /tasks/:id`

  Remove a task from the database by its `id`.

- `PATCH - /tasks/:id/complete`

  Toggles the `completed_at` field for a task by its `id`, marking as completed or not completed.
