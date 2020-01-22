<template>
  <div class="site">
    <b-navbar fixed-top type="is-primary" wrapper-class="container">
      <template slot="brand">
        <b-navbar-item tag="span">
          <strong style="color: #fff">NU x LINE Mentorship Programme</strong>
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">About</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/schedule' }">Schedule</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/apply' }">How to apply</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/submit' }">
          <a class="button is-primary is-inverted">
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
          <img src="@/assets/supported-by-logos.png" style="max-width: 600px; width: 100%" />
        </p>
      </div>
    </footer>
  </div>
</template>
