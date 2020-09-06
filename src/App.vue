<template>
  <div id="app-container"> 
    <app-header></app-header>
    <main>
        <router-view></router-view>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>

body {
  background-color: white; 
  color: #333;
  font-family: Calibri, sans-serif;
  font-size: 15px;
  box-sizing: border-box;
  width: 100%;
  padding: 0;
  margin: 0;
}

ul {
  list-style: none;
}

main {
  min-height: 500px;
}

</style>
