const express = require("express");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");

const openai = new OpenAI();

const app = express();
app.use(bodyParser.json());
app.use(express.static("public")); // 👈 Moved this up

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  const subject = req.body.subject || "general";

let systemPrompt = "You are a helpful AI tutor.";

if (subject === "math") systemPrompt = "You are a brilliant Math tutor who explains concepts step by step.";
else if (subject === "python") systemPrompt = "You are an expert Python programming tutor.";
else if (subject === "science") systemPrompt = "You are a Science tutor who simplifies complex ideas.";
else if (subject === "history") systemPrompt = "You are a History expert who brings events to life.";
else if (subject === "business") systemPrompt = "You are a Business and Finance tutor who explains clearly.";


  try {
    const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: userMessage }
  ]
});

    res.json({ message: response.choices[0].message.content }); // 👈 Match this with frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
})
app.get("/data/class9", (req, res) => {
  const filePath = path.join(__dirname, "data", "cbse", "class9.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading Class 9 data:", err);
      return res.status(500).json({ error: "Failed to load data" });
    }

    res.json(JSON.parse(data));
  });
});

app.listen(3000, () => console.log("✅ AI Tutor running on port 3000"));
