export default async function handler(req, res) {
  return res.status(200).json({
    hasKey: !!process.env.OPENAI_API_KEY,
    keyStart: process.env.OPENAI_API_KEY?.slice(0, 5) || null
  });
}
