<template>
  <header class="flex flex-row text-white bg-primary">
    <div class="flex flex-row items-center flex-initial align-middle brand">
      <i class="ml-4 text-2xl fas fa-viruses"></i>
      <h1
        class="text-3xl md:text-xl cursor-pointer font-bold font-sans p-4 text-primary-200 hover:text-white"
      >
        Covid-19 Coronovirus Tracker
      </h1>
    </div>
    <nav class="ml-4 flex flex-row flex-1">
      <ul class="flex flex-row flex-1 items-center">
        <li class="p-3">
          <router-link
            class="font-medium text-2xl md:text-xl no-underline text-white font-sans hover:text-white"
            to="/home"
            >Home</router-link
          >
        </li>
        <li class="p-3">
          <router-link
            class="font-medium text-2xl md:text-xl text-white font-sans no-underline hover:text-white"
            to="/about"
            >About</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>
