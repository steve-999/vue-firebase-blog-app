<template>
    <div>
        <loginSignupComponent loginSignupType='signup' />
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
</style>
