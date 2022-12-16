<template>
  <div class="container py-5">
    <div class="card card-body mx-auto d-flex">
        
        <div class="text-center">
          <img src="https://fakeimg.pl/120x130" class="rounded mt-5" alt="...">
        </div>

        <div class="text-center mb-4">
          <h1 class="h3 mb-2 mt-4 font-weight-normal fs-1">Name</h1>
        </div>

        <div class="text-center mb-4">
          <h1 class="h3 mb-3 mt-1 font-weight-normal fs-5">累計加班時數：  5hr</h1>
        </div>

        <div class="d-grid justify-content-center align-self-center mt-5">
          <button class="btn btn-success btn-block mb-3 fs-1 clock" type="submit">
            Clock
          </button>
        </div>

        <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    
    </div>
  </div>
</template>

<style>
.clock {
  width: 200px;
 height: 110px;
}
</style>