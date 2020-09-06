<template>
  <div id="single-blog">
    <div id="single-blog-container">
      <p class="blog-title">{{ blog.title }}</p>
      <p class="blog-body"><span v-html="blog.body"></span></p>
      <p class="blog-userId">Posted by {{ blog.userId }} at {{ unixTimeStampToDateString(blog.timeCreated) }}</p>
    </div>
  </div>
</template>

<script>

export default {
  
  name: 'single-blog',
  data() {
    return {
        blog: {}
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (!user) {
        this.$router.push({ path: '/login'});
      }
    });

    const id = this.$route.params.id;
    db.collection('blogs').doc(id).get().then(doc => {
      this.blog = doc.data();
      this.blog.body = this.blog.body.replace(/(?:\r\n|\r|\n)/g, '<br>');
      console.log('data = ', this.blog);
    });
  },
  methods: {
    unixTimeStampToDateString(unixTs) {
        const dateObj = new Date(unixTs);
        return dateObj.toUTCString(); 
    }
  }
}
</script>

<style scoped>
#single-blog {
  background-color: #f2f2f2; 
  min-height: 500px;
  padding: 40px;
  margin: 0 auto;
}

#single-blog-container {
  background-color: white;
  border: 2px solid lightgrey;
  border-radius: 7px;
  padding: 15px;
}

.blog-title {
  margin: 0px 0 30px 0;
  font-family: 'Open Sans', sans-serif;
  font-size: 30px;
  font-weight: bold;
  color: darkblue;
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

</style>
