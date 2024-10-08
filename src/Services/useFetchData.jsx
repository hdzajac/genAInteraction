import { useState, useCallback } from "react";
import openAIClient from "./OpenAI";

const useFetchData = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await openAIClient.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: "You are a helpful assistant." }],
      });
      if (response.choices[0].finish_reason === "stop") {
        setData(response.choices[0].message.content);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  return { data, loading, error, fetchData };
};

export default useFetchData;
