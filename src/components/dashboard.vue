<template>
  <div class="container">
    <h1>User details</h1> 
    <div id="form-container">
        <form id="user-details-form">
            <div id="feedback-message" v-bind:style="{ color: messageColor }">{{ feedbackMessage }}</div> 
            <label for="username">Username:</label>    
            <input type="text" v-model="username" placeholder="Username" />            
            <label for="email">Email:</label>    
            <input type="email" v-model="email" placeholder="email" required />
            <button type="submit" v-on:click.prevent="handleUpdate">Update</button>                       
        </form>      
    </div>

    <h1>My blogs</h1>
    <div id="blog-titles-container">
        <div class="list-item" v-for="(blog, id) in blogs" :key="id">
            <span class="blog-title"><router-link v-bind:to="'/blogs/' + blog.id">{{ blog.title}}</router-link></span>
            <span v-bind:id="blog.id" class="delete-cross" v-on:click="handleDelete">x</span>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  
  name: '',
  data() {
    return {
        username: '',
        email: '',
        blogs: [],
        uid: null,
        feedbackMessage: '',
        messageColor: 'green'
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
        if(user) {
            this.uid = user.uid;
            console.log('in created this.uid', this.uid);
            db.collection('users').where('uid', '==', this.uid).get()
                .then(snapshot => {
                    const data = snapshot.docs[0].data();
                    this.username = data.username;
                    this.email = data.email;
                })
                .catch(err => {
                    this.username = '';
                    this.email = '';
                });
            this.fetchUsersBlogs();
        }
        else {
            this.uid = null;
            this.username = '';
            this.email = '';
        }
    });

  },
  methods: {
    handleUpdate(e) {
        this.feedbackMessage = '';
        db.collection('users').where('uid', '==', this.uid).get()
            .then(snapshot => {
                const docId = snapshot.docs[0].id;
                db.collection('users').doc(docId).update({
                    username: this.username,
                    email: this.email
                }); 
                this.feedbackMessage = 'Your details have been updated.';
                this.messageColor = 'green';
            })
            .catch(err => {
                console.log(err)
                this.feedbackMessage = err.message;
                this.messageColor = 'red';
            });
    },
    handleDelete(e) {
        const id = e.target.id;
        db.collection('blogs').doc(id).delete()
            .then(() => {
                this.fetchUsersBlogs();
            })
        this.blogs = this.blogs.filter(blog => blog.id !== id);
    },
    fetchUsersBlogs() {
        db.collection('blogs').orderBy('timeCreated', 'desc').where('userId', '==', this.uid).get()
            .then(snapshot => {
                this.feedbackMessage = '';
                this.messageColor = 'green';
                this.blogs = snapshot.docs.map(doc => {
                    const d = doc.data();
                    d.id = doc.id;
                    return d;
                });
            })
            .catch(err => {
                console.log(err);
                this.feedbackMessage = err.message;
                this.messageColor = 'red';
            });
    }
  }
}
</script>

<style scoped>

html {
    box-sizing: border-box;
}

.container {
    width: 95%;
    max-width: 900px;
    margin: 30px auto;
    padding: 0 10px;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

#form-container, #blog-titles-container {
    background-color: #f2f2f2;
    margin: 20px auto;
    padding: 20px;
    width: 85%;
    border: 2px solid lightgrey;
    border-radius: 8px;
}

input {
    box-sizing: border-box;
    display: block;
    width: 100%;
    padding: 8px;
    margin: 15px auto;
    border: 1px solid lightgrey;
    border-radius: 6px;
    font-family: Calibri;
    font-size: 18px;
}

button {
    display: block;
    width: 100%;
    height: 40px;
    margin-top: 20px;
    padding: 5px;
    background-color: #28a745;
    color: white;
    font-size: 16px;
    border: 1px solid lightgrey;
    border-radius: 4px;
    cursor: pointer;
}

h1 {
    font-family: Raleway, sans-serif;
    font-size: 26px;
    font-weight: bold;
    color: black;
}

a {
    color: darkblue;
    cursor: pointer;
}

a:hover {
    color: red;
}

#feedback-message {
    color: red;
    font-size: 20px;
    margin: 15px auto;
    text-align: center;
}

.list-item {
    padding: 12px;
}

.blog-title {
  margin: 0px 0 30px 0;
}

.blog-title > a {
  color: darkblue;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  font-weight: bold;
}

.blog-title > a:hover {
  color: chocolate;
}

.delete-cross {
    color: red;
    font-size: 26px;
    float: right;
}

.delete-cross:hover {
    cursor: pointer;
}

@media screen and (max-width: 550px) {

    .container { 
        width: 95%;
        padding: 0;
    }

    #form-container, #blog-titles-container {
        margin: 10px auto;
        padding: 10px;
        width: 90%;
    }

    .blog-title > a {
        font-size: 16px;
    }
}

</style>
