<template>
  <div class="site">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="https://i.pinimg.com/736x/79/b0/23/79b023e1fd83ed2fedbbbfd88ca6f7e1.jpg"
            alt="NU x LINE"
          /> NU x LINE Mentorship Programme
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">About</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/schedule' }">Schedule</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/apply' }">How to apply</b-navbar-item>
      </template>
    </b-navbar>
    <router-view />
  </div>
</template>
