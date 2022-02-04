<template>
  <div class="static-container flex flex-row justify-between items-center">
    <div class="p-4 flex-col items-center justify-center">
      <h4 class="font-sans text-primary-200 mb-2 font-bold">Confirmed</h4>
      <p class="text-xl text-primary-200 font-bold text-tomato">
        {{ totalConfirmed.toLocaleString() }}
      </p>
    </div>
    <div class="p-4">
      <h4
        class="font-bold font-sans text-sm text-primary-200 mb-2 items-center justify-center"
      >
        New Deaths
      </h4>
      <p class="text-xl text-primary-200 font-bold text-yellow">
        {{ newDeaths.toLocaleString() }}
      </p>
    </div>
    <div class="p-4">
      <h4
        class="font-bold font-sans text-primary-200 mb-2 items-center justify-center"
      >
        Total Deaths
      </h4>
      <p class="text-xl text-Cyan font-bold ">
        {{ totalDeaths.toLocaleString() }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["totalConfirmed", "newDeaths", "totalDeaths"],
  data() {
      return{}
  },
};
</script>
