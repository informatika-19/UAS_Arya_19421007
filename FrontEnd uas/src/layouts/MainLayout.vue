<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-blue-9 text-blue-grey-10">
      <q-toolbar>
    <q-btn dense flat round @click="leftDrawerOpen =! leftDrawerOpen" icon="menu" ></q-btn>

    <q-space></q-space>
    <q-btn flat round>
    <q-avatar><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0g8R5VmgqDqpRCwQfw2Y9V-DM-iXS59R9hQ&usqp=CAU"></q-avatar>
    <div></div>

    <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>Profile</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="logout()">
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-list>
    </q-menu>

    </q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="bg-amber-9"
    >
<q-scroll-area class="fit">
  <q-list bordered separator>
      <q-item class="justify-center text-center q-mb-md q-mt-md">
        <div>
          <q-avatar size="120px"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0g8R5VmgqDqpRCwQfw2Y9V-DM-iXS59R9hQ&usqp=CAU"></q-avatar>
          <div class="text-weight-bold q-mt-md">{{ $q.localStorage.getItem('dataUser').namaLengkap }}</div>
          <div>Aplikasi Penjualan DVD Film</div>

        </div>

          </q-item>
            <q-item clickable active-class="active" v-ripple exact :to="{ name: 'dashboardAdmin' }">
              <q-item-section avatar>
                  <q-icon name= "dashboard" ></q-icon>
              </q-item-section>

            <q-item-section>
                  <q-item-label>Dashboard</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable active-class="active" v-ripple exact :to="{ name: 'inputBarang' }">
              <q-item-section avatar>
                  <q-icon name= "input" ></q-icon>
              </q-item-section>

            <q-item-section>
                  <q-item-label>Input Voucher</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable active-class="active" v-ripple exact :to="{ name: 'dataGame' }">
              <q-item-section avatar>
                  <q-icon name= "input" ></q-icon>
              </q-item-section>

            <q-item-section>
                  <q-item-label>Data transaksi</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable active-class="active" v-ripple exact :to="{ name: 'Datauser' }">
              <q-item-section avatar>
                  <q-icon name= "supervisor_account" ></q-icon>
              </q-item-section>

            <q-item-section>
              <q-item-label>Data User</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
    </q-scroll-area>
    </q-drawer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    logout () {
      this.$q.localStorage.clear()
      this.$router.push({ name: 'loginPage' })
    }
  }
}
</script>
<style scoped>
.active{
  color: black;
  background-color: rgb(214, 29, 29);
  padding-right: 10px;
}
</style>
