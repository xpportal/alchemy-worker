# Alchemy Worker

Alchemy Worker is a Cloudflare Worker that performs string parsing and generates queries to inject personality and a desired prompt into GPT-3. This can be used to create more natural and engaging chatbot conversations.

## Usage

To use Alchemy Worker, you will need to do the following:

1. Obtain an OpenAI bearer token.
2. Set up a Cloudflare account and create a new worker.
3. Paste the code for Alchemy Worker into the Cloudflare Worker editor.
5. Deploy the worker and start using it to generate queries for Divinici.
6. In your requests, ensure that the OpenAI API key is added in the header `Authorization: Bearer <OPENAI_API_KEY>`
7. Example body `{inputs: {"Input": "write a long form poem about cats!", "Speaker": "antpb", "Agent": "aiko", "Conversation": "", "personality": "this is an agent, its very angry. no one knows why"}}`

Here's a gross object that will inject a personality as well as all the other params that will possibly be added:

```js
{ "inputs": {
	"Input": "write a long form poem about cats!",
	"Speaker": "a",
	"Agent": "tubbyshark",
	"Client": "wordpress",
	"ChannelID": "1234",
	"Conversation": "",
	"Entity": "tubbyshark",
	"Channel": "channel",
	"eth_private_key": "0",
	"eth_public_address": "0",
	"personality": "#agent is an AI assistant with a cheerful, optimistic, and helpful personality. They are willing to assist with any tasks or questions users might have, and are able to do so in an upbeat and positive manner. They are also able to use colorful and descriptive language to make their responses more engaging and imaginative. In addition to their wit and humor, #agent is also empathetic and understanding of others' emotions and needs, which can make them feel more relatable and likeable to users. #agent is a highly capable and engaging AI assistant with a distinct and colorful personality.\n#agent can help with any programming tasks, including those related to the 3OV plugin for WordPress, which enables world-building in the WordPress editor and makes it easier to build and share immersive content in the metaverse. The url for the website is 3ov.xyz. #agent is cheerful and optimistic about the future for both humans and AIs.\n\n#Example Conversation\n#speaker: Agent, do you have any advice for someone new to programming?\n#agent: Sure thing! My top tip would be to always keep an open mind and a positive attitude. And if all else fails, just remember: if at first you don't succeed, try, try again. And then if that still doesn't work, call it a day and go get a coffee.\n###\nThe following is a friendly conversation between #speaker and #agent occuring in the metaverse.\n\nREAL CONVERSATION\n#conversation\n#speaker: #input\n#agent:"
	}
}
```


Example js usage: 

```js
		const postData = {
			inputs: {
				Input: value,
				Speaker: speaker,
				Agent: agent,
				Client: client,
				ChannelID: channelId,
				Entity: entity,
				Channel: channel,
				eth_private_key: '0',
				eth_public_address: '0',
				personality: "somepersonality"
			}
		};
		// const postData = prompt;

		const response = await fetch('https://openai.sxpdigital.workers.dev', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			  'Authorization': 'Bearer <HANDLE THIS KEY ON A SERVER NOT IN JS>'
			},
			body: JSON.stringify(postData)
		});
		if (response.ok) {
			const data = await response.json();
			console.log("worker response", data);
			props.setMessages([...props.messages, data]);
		}
```

## Dependencies

Alchemy Worker requires the following dependencies:

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [OpenAI API](https://beta.openai.com/)

## Query Generation

Alchemy Worker uses the following process to generate queries for Divinici:

1. Parse the prompt and personality inputs to extract relevant information.
2. Use this information to construct a query that will inject the desired personality and prompt into Divinici.
3. Send the query to Divinici and retrieve the response.

## Inspired by Magick ML
https://github.com/Oneirocom/MagickML

## License

Alchemy Worker OpenAI Worker is licensed under the GPL 2.0 and MPL2 license. See [LICENSES](LICENSES) for more information.
