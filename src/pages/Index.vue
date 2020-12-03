<template>
  <q-page class="flex flex-center body">
    <div>
      <h1>
        <span color="text-red"> Tasky</span>
        <q-spinner-rings  color="primary" size="2em" />
        <span color="text-primary"> Taky </span>
       </h1>
    </div>
  </q-page>
</template>

<style scoped>
.body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
}

h1 {
  position: relative;
  font-family: sans-serif;
  text-transform: uppercase;
  font-size: 2em;
  letter-spacing: 4px;
  overflow: hidden;
  background: linear-gradient(90deg, #000, #fff, #000);
  background-repeat: no-repeat;
  background-size: 80%;
  animation: animate 3s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(255, 255, 255, 0);
}

@keyframes animate {
  0% {
    background-position: -500%;
  }
  100% {
    background-position: 500%;
  }
}
</style>

<script>
export default {
  name: 'Pre_Loader',
  mounted () {
    const _ = this

    setTimeout(() => {
      _.$router.push({
        name: 'Dashboard'
      })
    }, 5000)
  }
}
</script>
