export default async function apiName(
    parameter:string
  ) {
    const formData = new FormData();
  
    formData.append('parameter_name', parameter);
    
    const res = await fetch(
      `${endpoint}/api/endpoint`,
      {
        method: 'POST',
        body: formData,
      }
    );
  
    const data = await res.json();
    return { data, status: res.status };
  }