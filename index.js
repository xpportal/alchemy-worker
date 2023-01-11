async function handleRequest(request) {
    if (request.method === 'OPTIONS') {
        return handleOptions(request);
    } else {
        return handleFetch(request);
    }
}

async function handleFetch(request) {
    // Extract the bearer token from the request headers
    const authorization = request.headers.get('Authorization');
    if (!authorization) {
        return new Response('Unauthorized', { status: 401 });
    }

    const data = await request.json();
    let prompt = data.inputs.personality;
    let finalPrompt = prompt
        .replaceAll('#speaker', data.inputs.Speaker)
        .replaceAll('#input', data.inputs.Input)
        .replaceAll('#agent', data.inputs.Agent)
        .replaceAll('#conversation', data.inputs.Conversation)
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
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
    });

    // Process the response from the Davinci model
    const davinciData = await davinciResponse.json();
    console.log(davinciData);

    // Return the results to the client
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };
    return new Response(JSON.stringify({ davinciData }), {
        headers
    });
}

function handleOptions(request) {
    // Make sure the necessary headers are present
    // for this to be a valid pre-flight request
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    return new Response(null, { headers });
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
});
