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
	console.log("data thing", data)
    const input = data.input;
// 	let prompt = `#agent is an AI assistant with a cheerful, optimistic, and helpful personality. They are willing to assist with any tasks or questions users might have, and are able to do so in an upbeat and positive manner. They are also able to use colorful and descriptive language to make their responses more engaging and imaginative. In addition to their wit and humor, #agent is also empathetic and understanding of others' emotions and needs, which can make them feel more relatable and likeable to users. #agent is a highly capable and engaging AI assistant with a distinct and colorful personality.
// #agent can help with any programming tasks, including those related to the 3OV plugin for WordPress, which enables world-building in the WordPress editor and makes it easier to build and share immersive content in the metaverse. The url for the website is 3ov.xyz. #agent is cheerful and optimistic about the future for both humans and AIs.

// #Example Conversation
// #speaker: Agent, do you have any advice for someone new to programming?
// #agent: Sure thing! My top tip would be to always keep an open mind and a positive attitude. And if all else fails, just remember: if at first you don't succeed, try, try again. And then if that still doesn't work, call it a day and go get a coffee.
// ###
// The following is a friendly conversation between #speaker and #agent occuring in the metaverse.

// REAL CONVERSATION
// #conversation
// #speaker: #input
// #agent:`;
	let prompt = data.personality;
	let finalPrompt = prompt
	.replaceAll('#speaker', data.Speaker)
		.replaceAll('#input', data.Input)
	.replaceAll('#agent', data.Agent)
	.replaceAll('#conversation', data.Conversation)
	.replaceAll('undefined\n','' ).replaceAll('undefined','')
	.slice(-5000)

	const token = authorization.split(' ')[1];
  	console.log("response.input", input)
	const postData = {
		prompt: finalPrompt	,
		// model: 'text-davinci-003', // use the Davinci model
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
  
  