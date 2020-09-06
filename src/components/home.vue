<template>
  <div id="show-blogs-list">
    <div id="welcome-message-container" v-show="!userIsLoggedIn">
      <h1>Welcome to the Vue.js &amp; Firebase Blog App!</h1>
      <p>Please <router-link to="/signup">sign up</router-link> to start creating new blogs 
      or <router-link to="/login">login</router-link> to manage your existing blogs.</p>
    </div>
    <div id="blogs-list">
      <div class="blog-item" v-for="(blog, i) in blogs" :key="i">
        <p class="blog-title"><router-link v-bind:to="'/blogs/' + blog.id">{{ blog.title }}</router-link></p>
        <p class="blog-body"><span v-html="blog.body.replace(/(?:\r\n|\r|\n)/g, '<br>')"></span></p>
        <p class="blog-userId">Posted by {{ blog.username }} at {{ unixTimeStampToDateString(blog.timeCreated) }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  
  name: 'show-blogs-list',
  data() {
    return {
      blogs: [],
      users: {},
      userIsLoggedIn: false
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
    });

    db.collection('users').get().then(snapshot => {
      for (const doc of snapshot.docs) {
        const data = doc.data();
        this.users[data.uid] = data;
      }
    })
    .then(() => {
      db.collection('blogs').orderBy('timeCreated', 'desc').get().then(snapshot => {
        this.blogs = snapshot.docs.map(doc => {
          const d = doc.data();
          //console.log('d', d);
          d.id = doc.id;
          d.username = this.users[d.userId].username;
          return d;
        });
      });
    }); 
  },
  methods: {
    unixTimeStampToDateString(unixTs) {
        const dateObj = new Date(unixTs);
        return dateObj.toString().slice(0, 21); 
    }
  }
}
</script>

<style scoped>

#show-blogs-list {
  background-color: #f2f2f2;
  min-height: 400px;
  padding: 20px;
  margin: 0 auto;
  border: 2px solid darkorange;
}

#welcome-message-container {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0px auto;
}

#welcome-message-container > h1 {
  font-family: Raleway, sans-serif;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
}

#welcome-message-container > p {
  font-family: Calibri, sans-serif;
  font-size: 20px;
}

#welcome-message-container a {
  color: darkblue;
  font-size: 19px;
  font-weight: bold;
}

#welcome-message-container a:hover {
  color: darkorange;
}

p {
  margin: 0px;
}

#heading {
  color: darkblue;
  font-family: 'Raleway', sans-serif;
  font-size: 26px;
  font-weight: bold;
  margin: 0 auto;
  text-align: center;
}

.blog-item {
  background-color: white;
  color: black;
  margin: 25px;
  padding: 0 15px;
  border: 2px solid lightgrey;
  border-radius: 7px;
  min-height: 150px;
}

.blog-title {
  margin: 0px 0 30px 0;
}

.blog-title > a {
  color: darkblue;
  font-family: 'Open Sans', sans-serif;
  font-size: 24px;
  font-weight: bold;
}

.blog-title > a:hover {
  color: darkorange;
}

.blog-body {
  margin: 10px 0 40px 0;
  font-family: Calibri, sans-serif;
  font-size: 18px;
}

.blog-userId {
  font-size: 14px;
  margin: 20px 0 15px 0;
}

@media screen and (max-width: 750px) {
  #show-blogs-list {
    padding: 0;
  }
}

@media screen and (max-width: 550px) {

  .blog-item {
    margin: 15px;
    padding: 0 12px;
  }
}


</style>




