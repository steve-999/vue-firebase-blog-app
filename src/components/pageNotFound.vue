<template>
    <div id="page-not-found">
        <div id="error-message">Error 404 - Page not found.</div>
    </div>
</template>

<script>

export default {
    name: 'PageNotFound'
}
</script>

<style scoped>

#page-not-found {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

#error-message {
    font-family: 'Open Sans', sans-serif;
    font-size: 20px;
    color: #333;
    font-weight: bold;
    margin-top: 60px;
}

</style>
