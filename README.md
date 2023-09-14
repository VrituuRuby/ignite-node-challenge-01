# IGNITE NODE JS CHALLENGE

## About the Challenge

This challenge is for creating an API for performing CRUD (Createe, Reead, Update, Delete) operations for _tasks_.
But using only nodejs built-in modules, that also means using a JSON as database.

Tha API includes

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
- `completed_at` - Date when the task was completed. The initial value should be `null`
- `created_at` - Date when the task was created.
- `updated_at` - Date when the task was last updated.

Routes:

- `POST - /tasks`

  It should be possible to create a task in the database by sending the `title` and `description` fields in the request's body.

  When creating a task, the fields: `id`, `created_at`, `updated_at`, and `completed_at` should be automatically populated as per the properties mentioned above.

- `GET - /tasks`

  It should be possible to list all tasks stored in the database.

  It should also be possible to perform a search, filtering tasks by `title` and `description`.

- `PUT - /tasks/:id`

  It should be possible to update a task by `id`.

  In the request's body, it should only receive `title` and/or `description` to be updated.

  If only `title` is sent, it means that `description` cannot be updated, and vice versa.

  Before performing the update, a validation should be done to check if the `id` belongs to a task saved in the database.

- `DELETE - /tasks/:id`

  It should be possible to remove a task by `id`.

  Before performing the removal, a validation should be done to check if the `id` belongs to a task saved in the database.

- `PATCH - /tasks/:id/complete`

  It should be possible to mark a task as completed by `id`.

## How to Run

```console
npm run dev
```

or

```console
yarn dev
```
