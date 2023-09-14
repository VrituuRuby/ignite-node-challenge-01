import fs from "node:fs";
import readline from "node:readline";

const csvPath = "streams/tarefas.csv";

const readStream = fs.createReadStream(csvPath);
const rl = readline.createInterface({ input: readStream });

const tasks = [];

rl.on("line", (line) => {
  const [title, description] = line.split(",");
  tasks.push({ title, description });
});

rl.on("close", () => {
  tasks.splice(0, 1);
  tasks.map(async ({ title, description }, _) => {
    await createTask({ title, description });
  });
});

async function createTask(data) {
  const url = "http://localhost:3333/tasks";

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
