<template>
    <div id="login-container">
        <loginSignupComponent loginSignupType='login' />
    </div> 
</template>

<script>

import loginSignupComponent from './loginSignupComponent';

export default {
  
  name: '',
  components: {
      loginSignupComponent: loginSignupComponent
  }
}
</script>

<style scoped>

#login-container {
    min-height: 400px;
}

a {
    color: black;
    text-decoration-color: black;
}

#signup-message {
    color: black;
}

</style>
