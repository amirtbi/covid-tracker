## Table of Contents

- [vue3](https://vuejs.org/)
- [vue-router](https://router.vuejs.org/)
- [vuex](https://vuex.vuejs.org/)

- [Primevue](https://www.primefaces.org/primevue/#/)
- [Chartjs](https://vue-chart-3.netlify.app/)
- [Momentjs](https://momentjs.com/)
- [Axios](https://www.axios.com/)
- [Covid-19 api](https://covid19api.com/)

## Build Setup

### Step-1

#### Download the latest version of Node js from ['https://nodejs.org/en/download/']

### Step-2

#### Install the Vite and create a vue3 project

```bash
npm create vite@latest my-vue-app --template vue
```

### Step-3

#### Install TailwindCss from framework-guides [https://tailwindcss.com/docs/installation/framework-guides]

Choose the Vite and run the following steps

```bash
1 - Create your project
    npm init vite my-project
    cd my-project
 2- Install Tailwind CSS
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p

 3- Configure your template paths
    module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    }

4- Add the Tailwind directives to your CSS
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

5- Import the CSS file
    import { createApp } from 'vue'
    import App from './App.vue'
    import './tailwind.css'

    createApp(App).mount('#app')
```

### Step-4 For using icons, install PrimeVue

1- Command the following codes in the terminal

```bash
npm install primevue@^3.12.2 --save
npm install primeicons --save
```

2- Next step is setting up PrimeVue configuration.

```bash
import {createApp} from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
const app = createApp(App);

app.use(PrimeVue);
```

3- For using Primevue ui component, you should import the following

```bash
import {createApp} from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
const app = createApp(App);

app.use(PrimeVue);

app.component('Dialog', Dialog);
```

### Step-5 install Chartjs fro Vue 3 from [https://vue-chart-3.netlify.app/guide/#for-vue-3]

```bash
npm i vue-chart-3 chart.js

```

## Finally

Run the server

```bash
npm run dev
```
