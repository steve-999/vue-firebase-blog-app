<template>
    <div>
        <ul v-bind:class="navlinks">
            <span><li><router-link to="/">Home</router-link></li></span>
            <span v-for="(link, i) in navLinks" :key="i">
                <li v-if="link.showIfloggedIn == userIsLoggedIn"><router-link v-bind:to="link.path">{{ link.text }}</router-link></li>
            </span>
            <span><li v-if="true == userIsLoggedIn"><a v-on:click.prevent="handleLogout" v-bind:href="'/logout'">Logout</a></li></span>
        </ul>
    </div>
</template>

<script>

export default {
  name: 'navLinks',
  props: ['headerFooterType'],
  data() {
    return {
      userIsLoggedIn: false,
      navLinks: [
        { path: '/create', text: 'Create', showIfloggedIn: true },
        { path: '/dashboard', text: 'Dashboard', showIfloggedIn: true },
        { path: '/signup', text: 'Sign up', showIfloggedIn: false },
        { path: '/login', text: 'Login', showIfloggedIn: false },
      ]
    }
  },
  methods: {
    handleLogout() {
      auth.signOut()
        .then(d => {
          console.log('user logged out');
          this.$router.push({ path: '/login'});
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      if(user) {
        this.userIsLoggedIn = true;
      } 
      else {
        this.userIsLoggedIn = false;
      }
    })
  },
  computed: {
      navlinks() {
          if (this.headerFooterType === 'header') {
              return { 
                'navlinks-header': true,
                'navlinks-footer': false 
              };
          }
          else {
              return { 
                'navlinks-header': false,
                'navlinks-footer': true 
              };
          }
      }
  }
}
</script>

<style>

a {
  color: white;
  text-decoration: none; 
  font-family: 'Open Sans', sans-serif;
}

a:hover {
  color: gold;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 15px 0;
}

li {
  display: inline;
  padding: 0 15px;
}

li > a {
  font-size: 16px;
}

.navlinks-header {
  position: absolute;
  top: 0px;
  right: 30px;
}

@media screen and (max-width: 750px) {
  .navlinks-header {
    position: static;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  ul {
    padding: 5px 0;
  }

}

@media screen and (max-width: 380px) {

  li {
    padding: 0 12px;
  }

  li > a {
    font-size: 12px;
  }
}

</style>

