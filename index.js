const express = require("express");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const openai = new OpenAI();

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a friendly and helpful AI tutor for students." },
        { role: "user", content: userMessage }
      ]
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(3000, () => console.log("✅ AI Tutor running on port 3000"));
