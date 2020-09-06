<template>
    <div class="container">
        <div id="create-blog">
            <div id="create-blog-form-container">
                <form id="create-blog-form">
                    <div id="feedback-message" v-bind:style="{ color: messageColor }">{{ feedbackMessage }}</div> 
                    <h1>Create Blog</h1>
                    <label for="blog-title">Title</label>
                    <input type="text" v-model="blogTitle" placeholder="Title" required />
                    <label for="blog-content">Content</label>
                    <textarea type="text" v-model="blogBody" placeholder="Content" required></textarea>
                    <button type="submit" v-on:click.prevent="handleSubmit">create Blog</button>                        
                </form>
            </div>
            <div id="preview-container">
                <h1 id="blog-preview-heading">Preview</h1>
                <div id="preview-area-container">
                    <h1 id="blog-title-preview">{{ blogTitle }}</h1>
                    <p id="blog-content-preview"><br><span v-html="blogBody.replace(/(?:\r\n|\r|\n)/g, '<br>')"></span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>



export default {
  
  name: 'create-blog',
  data() {
    return {
        blogTitle: '',
        blogBody: '',
        feedbackMessage: '',
        messageColor: 'green'
    }
  },
  methods: {
    handleSubmit(e) {
        this.feedbackMessage = '';
        db.collection('blogs').add({
            userId: this.uid,
            title: this.blogTitle,
            body: this.blogBody.replace(/(?:\r\n|\r|\n)/g, '<br>'),
            timeCreated: Date.now(),
            timeModified: null,
        })
        .then(() => {
            this.blogTitle = '';
            this.blogBody = '';  
            this.feedbackMessage = 'Your blog has been added.';
            this.messageColor = 'green'; 
        })
        .catch(err => {
            this.feedbackMessage = err.message;
            this.messageColor = 'red';           
        });
       
    },     
  },
  filters: {
      replaceLineBreaks(str) {
          return str.replace(/(?:\r\n|\r|\n)/g, '<br>')
      }
  },
  computed: {
      uid() {
          return firebase.auth().currentUser.uid;
      }
  }
}
</script>

<style scoped>

html * {
    box-sizing: border-box;
}

.container {
    margin: 0 20px;
}

#create-blog {
    width: 85%;
    max-width: 900px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

#create-blog-form-container, #preview-container {
    width: 100%;
    background-color: #f2f2f2; 
    margin: 20px auto;
    padding: 20px;
    border: 2px solid lightgrey;
    border-radius: 8px;
}

h1, h2, h3 {
    font-family: 'Raleway', sans-serif;
    margin: 0px;
}

h1 { font-size: 25px; }
h3 { font-size: 20px; }


label {
    display: block;
    margin: 20px 0 10px;
}

input[type="text"], textarea {
    display: block;
    width: 100%;
    padding: 8px;
    margin: 15px auto;
    border: 1px solid lightgrey;
    border-radius: 6px;
    font-family: Calibri;
    font-size: 18px;
}

input[type="text"]:focus, textarea:focus {
    outline: 0;
}

textarea {
  height: 200px;
  border: 1px solid lightgrey;
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

#preview-container {
    font-family: Calibri;
    font-size: 18px;
    padding: 10px 20px;
    border: 2px solid lightgrey;
    border-radius: 5px;
    margin: 30px 0;
}

#preview-area-container {
    background-color: white;
    padding: 8px;
    border: 1px solid lightgrey;
    border-radius: 5px;
}

#blog-preview-heading {
    padding: 15px 0;
}

#feedback-message {
    color: red;
    font-size: 20px;
    margin: 15px auto;
    text-align: center;
}

@media screen and (max-width: 750px) {
    #create-blog-form-container, #preview-container {
        margin: 20px auto;
        padding: 10px;
    }

    #create-blog {
        width: 90%;
    }
}

@media screen and (max-width: 550px) {
    .container {
        margin: 0 10px;
    }

    #create-blog-form-container, #preview-container {
        margin: 10px auto;
        padding: 10px;
    }

    #create-blog {
        width: 95%;
    }
}


</style>
