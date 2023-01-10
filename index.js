export default {
	async fetch(request, env) {
	  return await handleRequest(request)
	}
  }
  
  async function handleRequest(request) {
	// Extract the bearer token from the request headers
	const authorization = request.headers.get('Authorization');
	if (!authorization) {
	  return new Response('Unauthorized', { status: 401 });
	}
    const body = await request.text();
    const data = JSON.parse(body);
    const input = data.input;
	// Needs to be a proper json string.
	let prompt = data.personality;
	let finalPrompt = prompt
		.replaceAll('#speaker', data.Speaker)
		.replaceAll('#input', data.Input)
		.replaceAll('#agent', data.Agent)
		.replaceAll('#conversation', data.Conversation)
		.replaceAll('undefined\n','' ).replaceAll('undefined','')
		.slice(-5000)

	const token = authorization.split(' ')[1];
	const postData = {
		prompt: finalPrompt	,
		max_tokens: 500,
		stop : ["###"],
	  };
	// Make the first request to the Davinci model
	const davinciResponse = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}` // use the bearer token from the request
	  },
	  body: JSON.stringify(postData)
	});
  
	// Process the response from the Davinci model
	const davinciData = await davinciResponse.json();
	console.log(davinciData);
  
	const headers = {
	  'Access-Control-Allow-Origin': '*',
	  'Content-Type': 'application/json',
	  "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
	  "Access-Control-Allow-Headers": "*",
	  "Access-Control-Allow-Credentials": "true"
  
	};
  
	// Return the results to the client
	return new Response(JSON.stringify({ davinciData }), {
	  headers
	});
  }
  
  