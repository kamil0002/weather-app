<template>
  <div className="absolute top-3 right-7 flex items-center">
    <span className="text-gray-500 select-none">
      Logged in as
      <span className="font-medium text-sky-900">{{ this.LOGIN }}</span>
    </span>
    <span className="px-1.5 text-gray-400 font-sans select-none">|</span>
    <button
      className="flex items-center hover:bg-blue-400 hover:text-white mr-2 px-2 py-1 rounded-md font-medium transition-colors duration-150"
    >
      <span className="mr-2">Logout</span>
      <img src="@/assets/logout-icon.svg" alt="Logout" />
    </button>
  </div>
</template>

<script>
import { LOGIN } from '@/constants';
export default {
  name: 'UserInformation',
  data() {
    return {
      LOGIN,
    };
  },
};
</script>
