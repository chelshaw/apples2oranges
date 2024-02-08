This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Running locally

```bash
npm install # first time only
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Process / Reflection

I styled the project after the ChatGPT interface, with a query bar at the bottom and space for results above. Otherwise, styling was very minimal, as I ran into a couple points of friction with NextJS (they changed a few things since I used the framework last) and with how I expected OpenAI to work.

### Challenges

Initially, based on reading the OpenAI docs, I thought I would be able to give a model context and then refer to the model by ID in future requests. However, in practice this is only relevant for fine-tuned models, which felt like overkill for this project. Once I realized that my initial approach wasn't working, I pivoted to using the "role" to add context about the different topics, which seems to work well.

My biggest challenge with NextJS was navigating the restrictions in server components. The nature of this app, is it gets data from the backend on page load but then has interactivity on the page. The way server-side data is fetched for a page is quite different from the last time I used NextJS about a year ago, so this was a bit surprising to run into.
