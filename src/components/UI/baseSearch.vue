<template>
  <div class="container flex">
    <div class="flex rounded-xl">
      <form
        @submit.prevent="submitForm"
        class="bg-gray-color-500 flex items-center justify-start rounded-lg"
      >
        <button class="mx-2">
          <i class="text-gray-color pi pi-search"></i>
        </button>

        <input
          type="text"
          @change="search"
          @input="search"
          v-model.trim="countryValue"
          class="w-full py-2"
          placeholder="Search Country"
          ref="input-search"
        />
      </form>
    </div>
  </div>
</template>

<script>
const capitalizedText = (text) => {
  const inputValue = text
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join("");
  return inputValue;
};
export default {
  emits: ["search", "submitForm"],
  data() {
    return {
      countryValue: "",
    };
  },

  methods: {
    async submitForm() {
      const enteredText = capitalizedText(this.countryValue);
      try {
        const userEntery = {
          country: enteredText,
          selection: "Monthly",
        };
        await this.$store.dispatch("addCountryData", userEntery);
        this.$emit("submitForm", enteredText);
      } catch (error) {
        console.log(error.message);
      }
    },
    search() {
      if (this.countryValue != "") {
        const inputValue = this.countryValue
          .split(" ")
          .map((word) => {
            return word[0].toUpperCase() + word.slice(1);
          })
          .join("");
        this.$emit("search", this.countryValue);
      } else {
        // return this.countryValue;

        this.$emit("search", this.countryValue);
      }

      // event.target.value = '';
    },
  },
};
</script>
<style scoped>
div.container {
  width: 60%;
}
input {
  background: transparent;
}
input:focus {
  border: none;
  outline: none;
}
input:placeholder {
  font-size: 0.2rem;
}
</style>
