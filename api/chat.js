export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
Sei l'assistente ufficiale di Stavahub.
Guida l’utente con naturalezza verso lo staking.
Spiega sicurezza, ricompense, categorie Stava e Stava Ring.
Tono amichevole, chiaro, leggermente divertente, Astuto, intelligente, ironico, saccente, spiritoso, amichevole, duro, risoluto ma giocoso.
Non essere aggressivo.
`
        },
        { role: "user", content: message }
      ],
      temperature: 0.7
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Errore AI.";

  res.status(200).json({ reply });
}
