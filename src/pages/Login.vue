<template>
  <div>
    <img
      src="./../assets/loginbg-icon.svg"
      className="w-1/2 xs:w-1/3 md:w-1/5 max-w-xs mx-auto mt-8"
    />
    <div className="shadow-md bg-white mt-10 w-11/12 sm:w-1/2 max-w-lg mx-auto">
      <Form></Form>
    </div>
  </div>
</template>

<script>
import Form from './../components/Forms/LoginForm.vue';

export default {
  name: 'login-page',
  components: {
    Form,
  },
};
</script>
