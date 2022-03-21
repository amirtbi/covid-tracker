<template>
  <li
    class="text-ellipsis text-sm font-bold mb-4 flex flex-row items-center justify-start"
  >
    <p class="text-blue-color mr-4 text-ellipsis whitespace-nowrap truncate">
      {{ countryName }}
    </p>
    <h3 class="text-sm text-gray-color">
      {{ deathAmount.toLocaleString() }}
    </h3>
  </li>
</template>

<script>
export default {
  props: ["countryName", "deathAmount"],
};
</script>
