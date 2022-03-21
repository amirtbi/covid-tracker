<template>
  <header
    class="overflow-hidden bg-primary-color flex flex-col items-center w-80"
  >
    <div class="flex flex-row items-center justify-center w-full mt-8">
      <i class="text-2xl text-white-color pi pi-qrcode"></i>
    </div>
    <nav class="my-20 w-full">
      <ul class="flex flex-col w-full">
        <li
          class="cursor-pointer text-white-color w-full p-5 flex flex-row items-center justify-start hover:bg-blue-color transition-all"
        >
          <i class="text-xl mr-4 pi pi-home"></i>
          <router-link
            class="duration-500 ease-linear transition-transform font-md text-xl"
            to="/dashboard"
            >Overview</router-link
          >
        </li>
        <li
          class="cursor-pointer text-white-color w-full p-5 flex flex-row items-center justify-start hover:bg-blue-color transition-all"
        >
          <i class="text-xl mr-4 pi pi-info-circle"></i>
          <router-link
            class="duration-500 ease-linear transition-transform font-md text-xl"
            to="/dashboard"
            >Syptoms</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
li:hover a {
  transform: translatex(20px);
}
header {
  height: 1060px;
}
</style>
