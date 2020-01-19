<template>
  <div class="site">
    <b-navbar fixed-top="true" type="is-success" wrapper-class="container">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <strong>NU x LINE Mentorship Programme</strong>
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">About</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/schedule' }">Schedule</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/apply' }">How to apply</b-navbar-item>
        <b-navbar-item tag="span">
          <a class="button is-success is-inverted">
            <b-icon pack="fas" icon="rocket"></b-icon>
            <strong>Apply Now</strong>
          </a>
        </b-navbar-item>
      </template>
    </b-navbar>
    <router-view />
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>NU x LINE Mentorship Programme</strong> is supported by
        </p>
        <p>
          <img src="@/assets/supported-by-logos.png" style="width: 425px" />
        </p>
      </div>
    </footer>
  </div>
</template>
