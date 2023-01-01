<template>
  <div class="container py-4 mt-3">
    <div class="dropdown mb-5 d-flex flex-row-reverse bd-highlight">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Dropdown button
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
      </ul>
    </div>
    <ul class="list-group list-group-horizontal">
    <li id="date" class="list-group-item">日期</li>
    <li id="checkIn" class="list-group-item">上班時間</li>
    <li id="checkOut" class="list-group-item">下班時間</li>
    <li id="absense" class="list-group-item">缺勤紀錄</li>
    <li id="descriptions" class="list-group-item">備註</li>
    </ul>
  </div>
   </template>

<style>
#date {
  width: 150px;
}

#checkIn {
  width: 350px;
}

#checkOut {
  width: 350px;
}

#absense {
  width: 200px;
}

#descriptions {
  width: 200px;
}
</style>
  

