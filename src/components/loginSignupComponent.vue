
<template>
    <div class="container">
        <h1>{{ loginSignupType == 'login' ? 'Login' : 'Sign up' }}</h1> 
        <div id="form-container">
            <form id="loginSignup-form">
                <div id="error-message">{{ errorMessage }}</div> 
                <label for="email">Email:</label>    
                <input type="email" v-model="email" placeholder="email" required />
                <label for="password">Password:</label>
                <input type="password" v-model="password" placeholder="password" required />
                <button type="submit" v-on:click.prevent="loginSignupType == 'login' ? handleLogin() : handleSignup()">
                    {{ loginSignupType == 'login' ? 'Login' : 'Sign up'}}
                </button>                       
            </form>      
        </div>
        <div id="signup-message" v-if="loginSignupType == 'login'">
           <router-link to="/signup">Don't have an account? Sign up here</router-link>
        </div>
    </div> 
</template>

<script>

export default {
  name: 'loginSignupComponent',
  data() {
    return {
        email: 'steve@gmail.com',
        password: 'test1234',
        errorMessage: ''
    }
  },
  props: ['loginSignupType'],
  methods: {
    handleSignup() {
        auth.createUserWithEmailAndPassword(this.email, this.password)
            .then(cred => {
                console.log('user signed up', cred);
                const userId = cred.user.uid;
                db.collection('users').add({
                    uid: userId,
                    email: this.email,
                    username: ''
                }).catch(err => console.log(err));
                this.$router.push({path: '/'});
                this.errorMessage = '';
            })
            .catch(err => {
                this.errorMessage = err.message;
                console.log(err);
            });
    },
    handleLogin() {
        auth.signInWithEmailAndPassword(this.email, this.password).then(cred => {
            console.log('user logged in', cred);
            this.$router.push({path: '/'});
                this.errorMessage = '';
            })
            .catch(err => {
                this.errorMessage = err.message;
                console.log(err);
            });
    }
  }
}
</script>

<style scoped>

html {
    box-sizing: border-box;
}

#form-container {
    background-color: #f2f2f2;
    margin: 20px auto;
    padding: 20px;
    width: 80%;
    max-width: 600px;
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
    color: darkblue;
}

.container {
    margin-top: 25px;
    width: 100%;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

a {
    color: darkblue;
}

a:hover {
    color: red;
}

#error-message {
    color: red;
    font-size: 18px;
    margin: 15px 0;
}

</style>


