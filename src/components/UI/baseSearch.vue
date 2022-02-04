<template>
  <div class="container mx-auto flex">
    <div class="flex bg-darkblue-600 rounded-xl">
      <button class="flex items-center justify-center px-4">
        <svg
          class="text-white w-6 h-6"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
          ></path>
        </svg>
      </button>
      <form @submit.prevent="search">
        <input
          type="text"
          @change="search"
          v-model.trim="countryValue"
          class="bg-darkblue-600 px-4 py-2 w-80 rounded-xl"
          placeholder="Search..."
        />
      </form>
    </div>
  </div>
</template>

<script>

export default {
  emits:['search'],
  data() {
    return {
      countryValue: "",
    };
  },

  methods: {
    search() {
      
      if(this.countryValue != ''){


        const inputValue = this.countryValue.split(" ").map((word)=>{
          return word[0].toUpperCase() + word.slice(1)
        }).join("");
         this.$emit('search',inputValue);

      }else{
        // return this.countryValue;
     
       this.$emit('search',this.countryValue);
     }
        

      // event.target.value = '';
    },
  },
};
</script>
<style scoped>

input{

  color:white
}
input:focus {
  border: none;
  outline: none;
  
}
input::placeholder {
  color: white;
  font-family: sans-serif;
}
</style>
