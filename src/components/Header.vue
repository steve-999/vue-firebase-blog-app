<template>
  <div id="app-header">
    <h2 id="nav-logo"><router-link to="/">{{ headerTitle }}</router-link></h2>
    <navLinks headerFooterType="header" />
  </div>
</template>

<script>
import navLinks from './navLinks';

export default {
  name: 'app-header',
  components: {
    navLinks: navLinks
  },
  data() {
    return {
      headerTitle: 'Vue.js & Firebase Blog App',
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

#app-header {
    height: 100px;
    background-color: cornflowerblue;
    width: 100%;
    color: white;
    padding: 0;
    margin: 0; 
}

#nav-logo {
    position: absolute;
    top: 35px;
    left: 20px;
    padding: 0;
    margin: 0 auto;
}

#nav-logo > a {
    font-family: 'Raleway', sans-serif;
    font-size: 24px;
    font-weight: 600;
}

a {
  color: white;
  text-decoration: none; 
  font-family: 'Open Sans', sans-serif;
}

a:hover {
  color: gold;
}

@media screen and (max-width: 750px) {
  #nav-logo {
    position: static;
    display: block;
    text-align: center;
    padding: 10px;
    top: auto;
    left: auto;
    margin: 0 auto;
  }

}


@media screen and (max-width: 380px) {
  #app-header {
    height: 100%;
  }

  #nav-logo > a {
    font-size: 18px;
  }
}

</style>
