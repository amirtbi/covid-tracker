<template>
  <div class="container mx-auto flex">
      <div class="flex bg-gray rounded">
        <button class="flex items-center justify-center px-4">
        <svg
            class="text-darkgray w-6 h-6 text-gray-600"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            
        >
            <path
            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
            ></path>
        </svg>
        </button>
        <input type="text" class="bg-gray px-4 py-2 w-80" placeholder="Search..." />
      </div>
  </div>
</template>


<style scoped>

input:focus{
  border: none;
  outline: none;
  
}
</style>
