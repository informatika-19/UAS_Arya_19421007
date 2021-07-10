<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div class="left blue"></div>
            </div>
              <div class="col">
                <q-banner inline-actions class="text-blue-grey-14">
              <div class="text-h6">Input Top up & joki game</div>
              <div>Input data </div>
            </q-banner>
           </div>
        </div>
      </div>
    </div>
    <q-card flat>
      <q-card-section class="row">
                <q-form
                @submit="onSubmit()"
            class="q-col-gutter-md q-col-lg-6 col-md-6 col-xs-12"
            >
            <q-input
            filled
            v-model="form.Judul"
            label="Judul"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Mohon isi judul']"
            />
            <q-input
            filled
            v-model="form.harga"
            type="number"
            label="Harga"
            :rules="[ val =>  val > 0 || 'Mohon Isi Harga']"
            />

              <q-select
              filled
              v-model="form.game"
              :options="optionGame"
              label="Plilh Game"
              />

            <q-input
              v-model="form.deskripsi"
              filled
              type="textarea"
              label="Deskripsi"
            />

            <q-file accept=".jpg, image/*" color="teal" filled v-model="image" label="Upload Gambar">
            <template v-slot:prepend>
            <q-icon name="cloud_upload" />
            </template>
        </q-file>

        <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
            </q-form>
      </q-card-section>
    </q-card>
</q-page>

</template>
<script>
export default {
  data () {
    return {
      form: {
        Judul: null,
        harga: 0,
        game: null,
        deskripsi: null
      },
      optionGame: [
        'Counter Strike global ',
        'Valorantr',
        'Genshin impact',
        'Honkai Impact',
        'Ayodance',
        'Mobile legend',
        'LoL wild rift',
        'PUBG',
        'Closers'
      ],
      image: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get(`game/getbyid/${this.$route.params.id}`)
        .then(res => {
          if (res.data.sukses) {
            this.form = res.data.data
          } else {
            this.$router.push({ name: 'dataGame' })
          }
        })
    },
    onSubmit () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify(this.form))
      this.$axios.put(`game/edit/${this.$route.params.id}`, formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.$router.push({ name: 'dataGame' })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  }
}
</script>
<style scoped>
.left{
   width: 3px;
   height: 100%;
   background-color: aqua;
}
</style>
