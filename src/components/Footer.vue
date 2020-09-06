<template>
  <div id="app-footer">
    <p id="copyright"><router-link to="/">&#169; Vue.js &amp; Firebase Blog App 2020</router-link></p>
    <navLinks headerFooterType="footer" />
  </div>
</template>

<script>
import navLinks from './navLinks';

export default {
  name: 'app-footer',
  components: {
    navLinks: navLinks
  },
  data() {
    return {
      headerTitle: 'Vue & Firebase Blog App',
    }
  }
}
</script>

<style scoped>

#app-footer {
    position: relative;
    bottom: 0px;
    height: 200px;
    background-color:#333;
    width: 100%;
    margin-top: 0px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#app-footer > h2 {
    padding: 30px 0;
    margin: 15px auto;
    text-align: center;
    font-family: 'Raleway', sans-serif;
    font-size: 24px;
    font-weight: 700;
}

li > a {
  font-size: 20px;
}

#copyright {
  font-size: 20px;
  margin: 15px auto;
}

@media screen and (max-width: 380px) {


  #copyright {
    font-size: 16px;
  }
}

</style>
