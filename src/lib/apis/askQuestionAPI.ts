export default async function askQuestionAPI(
  file_hash: string,
  username: string,
  input_query: string,
  question_hist: string[],
  answer_hist: string[]
) {
  const requestBody = {
    file_hash,
    username,
    input_query,
    question_hist,
    answer_hist,
  };

  const res = await fetch(`http://127.0.0.1:8000/api/v1/chatbot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const data = await res.json();
  return { data, status: res.status };
}