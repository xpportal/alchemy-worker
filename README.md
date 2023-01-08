# Light-Alchemy OpenAI Worker

Light Alchemy is a Cloudflare Worker that performs string parsing and generates queries to inject personality and a desired prompt into Divinici. This can be used to create more natural and engaging chatbot conversations.

## Usage

To use Light Alchemy, you will need to do the following:

1. Obtain an OpenAI bearer token.
2. Set up a Cloudflare account and create a new worker.
3. Paste the code for Light Alchemy into the Cloudflare Worker editor.
5. Deploy the worker and start using it to generate queries for Divinici.
6. In your requests, ensure that the OpenAI API key is added in the header `Authorization: Bearer <OPEN_API_KEY>`
7. Example body `{"input": "write a long form poem about cats!", "speaker": "antpb", "agent": "aiko", "conversation": ""}`

## Dependencies

Light Alchemy requires the following dependencies:

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [OpenAI API](https://beta.openai.com/)

## Query Generation

Light Alchemy uses the following process to generate queries for Divinici:

1. Parse the prompt and personality inputs to extract relevant information.
2. Use this information to construct a query that will inject the desired personality and prompt into Divinici.
3. Send the query to Divinici and retrieve the response.

## Inspired by Magick ML
https://github.com/Oneirocom/MagickML

## License

Light Alchemy OpenAI Worker is licensed under the GPL 2.0 license. See [LICENSE](LICENSE) for more information.
