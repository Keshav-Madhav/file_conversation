export default async function createEmbeddingsForFileAPI(
  file_path: string,
  file_hash: string,
  username: string
) {
  const requestBody = {
    file_path,
    file_hash,
    username,
  };

  const res = await fetch(`http://127.0.0.1:8000/api/v1/textembeddings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const data = await res.json();
  return { data, status: res.status };
}

// import createEmbeddingsForFileAPI from './createEmbeddingsForFileAPI';

// async function handleFileEmbeddings() {
//   const filePath = '/path/to/your/file.txt';
//   const fileHash = 'abc123hash';
//   const username = 'keshav';

//   try {
//     const { data, status } = await createEmbeddingsForFileAPI(filePath, fileHash, username);

//     if (status === 200) {
//       console.log('Embedding created successfully:', data);
//     } else if (status === 422) {
//       console.error('Failed to create embedding:', data.error || 'Invalid input');
//     } else {
//       console.error('Unexpected response status:', status, data);
//     }
//   } catch (error) {
//     console.error('An error occurred while creating embeddings:', error);
//   }
// }