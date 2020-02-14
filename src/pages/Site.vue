<template>
  <div class="site">
    <b-navbar fixed-top type="is-primary" wrapper-class="container">
      <template slot="brand">
        <b-navbar-item tag="span">
          <strong style="color: #fff">NU x LINE Mentorship Programme</strong>
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item tag="router-link" :to="{ name: 'landing' }">About</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'schedule' }">Schedule</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'hackathon' }">Hackathon</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'apply' }">How to apply</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'submit' }">
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
        <div style="max-width: 650px; margin: auto; display: flex; flex-direction: row; flex-wrap: nowrap;">
          <div style="flex-grow: 230;"><a href="https://www.mhesi.go.th"><img src="@/assets/supported-mhesi.png" style="width: 100%;" /></a></div>
          <div style="flex-grow: 176;"><a href="https://www.mhesi.go.th"><img src="@/assets/supported-sibb.png" style="width: 100%;" /></a></div>
          <div style="flex-grow: 150;"><a href="https://www.nu.ac.th"><img src="@/assets/supported-nu.png" style="width: 100%;" /></a></div>
          <div style="flex-grow: 200;"><a href="http://www.research.nu.ac.th"><img src="@/assets/supported-dri.png" style="width: 100%;" /></a></div>
          <div style="flex-grow: 210;"><a href="http://scipark.nu.ac.th"><img src="@/assets/supported-sci-park.png" style="width: 100%;" /></a></div>
          <div style="flex-grow: 160;"><a href="https://fb.me/phits.tech"><img src="@/assets/supported-phits-tech.png" style="width: 100%;" /></a></div>
        </div>
      </div>
    </footer>
  </div>
</template>
